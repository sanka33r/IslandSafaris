import crypto from 'crypto';

const IPAY_CHECKOUT_URLS = {
    sandbox: 'https://sandbox.ipay.lk/ipg/checkout',
    live: 'https://ipay.lk/ipg/checkout',
} as const;

export function getIPayCheckoutUrl(): string {
    return process.env.IPAY_MODE === 'live' ? IPAY_CHECKOUT_URLS.live : IPAY_CHECKOUT_URLS.sandbox;
}

export function getIPayMerchantWebToken(): string {
    const token = process.env.IPAY_MERCHANT_WEB_TOKEN;
    if (!token) {
        throw new Error('Missing IPAY_MERCHANT_WEB_TOKEN');
    }
    return token;
}

function getIPaySecret(): string {
    const secret = process.env.IPAY_SECRET;
    if (!secret) {
        throw new Error('Missing IPAY_SECRET');
    }
    return secret;
}

/**
 * iPay processes amounts in LKR while bookings are priced in USD.
 * The rate comes from getUsdToLkrRate() (live, cached hourly).
 */
export function formatIPayAmount(amountUsd: number, usdToLkrRate: number): string {
    if (!Number.isFinite(usdToLkrRate) || usdToLkrRate <= 0) {
        throw new Error('Invalid USD to LKR rate');
    }
    const amount = amountUsd * usdToLkrRate;
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error('Invalid iPay amount');
    }
    return amount.toFixed(2);
}

function hmacSha256Base64(message: string): string {
    return crypto.createHmac('sha256', getIPaySecret()).update(message).digest('base64');
}

/** Checkout form checksum (only used when "Additional Security" is enabled in the portal). */
export function createIPayCheckoutChecksum(params: {
    merchantWebToken: string;
    orderId: string;
    totalAmount: string;
}): string {
    return hmacSha256Base64(`${params.merchantWebToken}${params.orderId}${params.totalAmount}`);
}

/** Callback notification checksum, per section 5.3 of the integration document. */
export function createIPayCallbackChecksum(params: {
    transactionReference: string;
    orderId: string;
    transactionTimeInMillis: string;
    transactionAmount: string;
    transactionStatus: string;
}): string {
    return hmacSha256Base64(
        `${params.transactionReference}${params.orderId}${params.transactionTimeInMillis}${params.transactionAmount}${params.transactionStatus}`
    );
}

/**
 * iPay order IDs must be alphanumeric, so booking UUIDs are sent without
 * dashes and restored when the callback comes in.
 */
export function toIPayOrderId(bookingId: string): string {
    return bookingId.replace(/-/g, '');
}

export function fromIPayOrderId(orderId: string): string {
    if (/^[0-9a-f]{32}$/i.test(orderId)) {
        return `${orderId.slice(0, 8)}-${orderId.slice(8, 12)}-${orderId.slice(12, 16)}-${orderId.slice(16, 20)}-${orderId.slice(20)}`;
    }
    return orderId;
}

export function secureEquals(a: string, b: string): boolean {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    return left.length === right.length && crypto.timingSafeEqual(left, right);
}
