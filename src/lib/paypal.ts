'use server';

/**
 * PayPal REST API helpers (Orders v2).
 * Uses PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET from env.
 * Sandbox: https://api-m.sandbox.paypal.com
 * Live:    https://api-m.paypal.com
 */

const PAYPAL_API_BASE =
    process.env.PAYPAL_MODE === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';

async function getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`,
        },
        body: 'grant_type=client_credentials',
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`PayPal auth failed: ${res.status} ${err}`);
    }

    const data = (await res.json()) as { access_token: string };
    return data.access_token;
}

export interface CreateOrderParams {
    amountUsd: string;
    bookingId: string;
    description?: string;
}

export async function createPayPalOrder(params: CreateOrderParams): Promise<{ orderId: string }> {
    const token = await getAccessToken();
    const value = Number.parseFloat(params.amountUsd);
    if (Number.isNaN(value) || value <= 0) {
        throw new Error('Invalid amount');
    }
    const valueStr = value.toFixed(2);

    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    reference_id: params.bookingId,
                    description: params.description ?? `Advance payment - Booking ${params.bookingId.slice(0, 8)}`,
                    amount: {
                        currency_code: 'USD',
                        value: valueStr,
                    },
                },
            ],
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`PayPal create order failed: ${res.status} ${err}`);
    }

    const data = (await res.json()) as { id: string };
    return { orderId: data.id };
}

export async function capturePayPalOrder(orderId: string): Promise<{ success: boolean; captureId?: string }> {
    const token = await getAccessToken();

    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: '{}',
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`PayPal capture failed: ${res.status} ${err}`);
    }

    const data = (await res.json()) as { status: string; purchase_units?: { payments?: { captures?: { id: string }[] } }[] };
    const captureId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id;
    return { success: data.status === 'COMPLETED', captureId };
}
