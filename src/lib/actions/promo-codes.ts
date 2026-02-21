'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { PromoCode } from '@/types/db';

export async function getAllPromoCodes() {
    const { data, error } = await supabaseAdmin
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching promo codes:', error);
        return [];
    }

    return data as PromoCode[];
}

export async function createPromoCode(data: Omit<PromoCode, 'id' | 'created_at' | 'usage_count'>) {
    const { error } = await supabaseAdmin
        .from('promo_codes')
        .insert({
            ...data,
            usage_count: 0
        });

    if (error) {
        console.error('Error creating promo code:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/promo-codes');
    return { success: true };
}

export async function updatePromoCode(id: string, data: Partial<PromoCode>) {
    const { error } = await supabaseAdmin
        .from('promo_codes')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating promo code:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/promo-codes');
    return { success: true };
}

export async function deletePromoCode(id: string) {
    const { error } = await supabaseAdmin
        .from('promo_codes')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting promo code:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/promo-codes');
    return { success: true };
}

export async function validatePromoCode(code: string, amount: number, scope: string) {
    const { data, error } = await supabaseAdmin
        .from('promo_codes')
        .select('*')
        .eq('code', code)
        .eq('status', 'active')
        .single();

    if (error || !data) {
        return { valid: false, message: 'Invalid promo code' };
    }

    const promo = data as PromoCode;
    const now = new Date();

    if (new Date(promo.start_date) > now || new Date(promo.end_date) < now) {
        return { valid: false, message: 'Promo code is expired' };
    }

    if (promo.usage_limit && promo.usage_count >= promo.usage_limit) {
        return { valid: false, message: 'Promo code usage limit reached' };
    }

    if (amount < promo.min_order_value) {
        return { valid: false, message: `Minimum order value of $${promo.min_order_value} required` };
    }

    // Check scope
    // If scope is 'all', it's valid.
    // If scope is specific (e.g. 'safari'), check if promo.applicable_scope includes 'all' or 'safari'.
    if (!promo.applicable_scope.includes('all') && !promo.applicable_scope.includes(scope)) {
        return { valid: false, message: 'Promo code not applicable for this item' };
    }

    let discountAmount = 0;
    if (promo.type === 'percentage') {
        discountAmount = (amount * promo.value) / 100;
        if (promo.max_discount && discountAmount > promo.max_discount) {
            discountAmount = promo.max_discount;
        }
    } else {
        discountAmount = promo.value;
    }

    // Ensure discount doesn't exceed total amount
    if (discountAmount > amount) {
        discountAmount = amount;
    }

    return {
        valid: true,
        discount: Number(discountAmount.toFixed(2)),
        message: 'Promo code applied!',
        code: promo.code
    };
}
