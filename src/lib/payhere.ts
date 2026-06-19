import crypto from 'crypto';

export const PAYHERE_CURRENCY = 'USD';

function md5Upper(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex').toUpperCase();
}

function getMerchantSecretHash(): string {
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    if (!merchantSecret) {
        throw new Error('Missing PAYHERE_MERCHANT_SECRET');
    }
    return md5Upper(merchantSecret);
}

export function getPayHereMerchantId(): string {
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    if (!merchantId) {
        throw new Error('Missing PAYHERE_MERCHANT_ID');
    }
    return merchantId;
}

export function formatPayHereAmount(amount: number): string {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error('Invalid PayHere amount');
    }
    return amount.toFixed(2);
}

export function createPayHereCheckoutHash(params: {
    merchantId: string;
    orderId: string;
    amount: string;
    currency: string;
}): string {
    return md5Upper(
        `${params.merchantId}${params.orderId}${params.amount}${params.currency}${getMerchantSecretHash()}`
    );
}

export function createPayHereNotificationHash(params: {
    merchantId: string;
    orderId: string;
    amount: string;
    currency: string;
    statusCode: string;
}): string {
    return md5Upper(
        `${params.merchantId}${params.orderId}${params.amount}${params.currency}${params.statusCode}${getMerchantSecretHash()}`
    );
}

export function secureEquals(a: string, b: string): boolean {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    return left.length === right.length && crypto.timingSafeEqual(left, right);
}
