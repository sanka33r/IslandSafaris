'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/client';
import { EXTRA_HOUR_PRICE_USD } from '@/lib/constants';

const KEY_EXTRA_HOUR_PRICE_USD = 'extra_hour_price_usd';

/** Get a setting value by key. Returns null if not set. */
export async function getSetting(key: string): Promise<string | null> {
    const { data, error } = await supabaseAdmin
        .from('settings')
        .select('value')
        .eq('key', key)
        .maybeSingle();

    if (error) {
        console.error('getSetting error:', key, error);
        return null;
    }
    return data?.value ?? null;
}

/** Set a setting value. */
export async function setSetting(key: string, value: string): Promise<{ error?: string }> {
    const { error } = await supabaseAdmin
        .from('settings')
        .upsert({ key, value }, { onConflict: 'key' });

    if (error) {
        console.error('setSetting error:', key, error);
        return { error: error.message };
    }
    return {};
}

/** Extra hour charge in USD (per hour per jeep). Uses DB setting or constant fallback. */
export async function getExtraHourPriceUsd(): Promise<number> {
    const raw = await getSetting(KEY_EXTRA_HOUR_PRICE_USD);
    if (raw === null || raw === '') return EXTRA_HOUR_PRICE_USD;
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) && n >= 0 ? n : EXTRA_HOUR_PRICE_USD;
}

/** Update extra hour charge. Used by admin settings form. */
export async function updateExtraHourPriceUsd(value: number): Promise<{ error?: string }> {
    if (!Number.isFinite(value) || value < 0) {
        return { error: 'Invalid amount' };
    }
    const result = await setSetting(KEY_EXTRA_HOUR_PRICE_USD, String(value));
    if (!result.error) {
        revalidatePath('/booking');
        revalidatePath('/admin/settings');
        revalidatePath('/admin/bookings');
        revalidatePath('/admin/calendar');
    }
    return result;
}
