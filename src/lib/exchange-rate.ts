const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';

/** Sanity bounds so a broken API response can never produce an absurd charge. */
const MIN_PLAUSIBLE_LKR_RATE = 100;
const MAX_PLAUSIBLE_LKR_RATE = 1000;

const CACHE_TTL_MS = 60 * 60 * 1000;
let cachedRate: { value: number; fetchedAt: number } | null = null;

/**
 * Live USD -> LKR rate, cached in memory for an hour (Next's fetch cache is
 * disabled inside POST route handlers, so `revalidate` alone does nothing here).
 * Falls back to the IPAY_USD_TO_LKR_RATE env var when the API is unavailable.
 */
export async function getUsdToLkrRate(): Promise<number> {
    if (cachedRate && Date.now() - cachedRate.fetchedAt < CACHE_TTL_MS) {
        return cachedRate.value;
    }
    try {
        const res = await fetch(RATE_API_URL, { signal: AbortSignal.timeout(5000) });
        if (res.ok) {
            const data = await res.json();
            const rate = Number(data?.rates?.LKR);
            if (Number.isFinite(rate) && rate >= MIN_PLAUSIBLE_LKR_RATE && rate <= MAX_PLAUSIBLE_LKR_RATE) {
                cachedRate = { value: rate, fetchedAt: Date.now() };
                return rate;
            }
            console.error('Exchange rate API returned an implausible LKR rate:', data?.rates?.LKR);
        }
    } catch (err) {
        console.error('Exchange rate fetch failed:', err);
    }

    const fallback = Number(process.env.IPAY_USD_TO_LKR_RATE);
    if (Number.isFinite(fallback) && fallback > 0) {
        return fallback;
    }
    throw new Error('Unable to determine USD to LKR rate (API down and no IPAY_USD_TO_LKR_RATE fallback set)');
}
