import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';

import { supabaseAdmin } from './supabase';

const SESSION_COOKIE_NAME = 'island_safaris_admin';
// In a real app, use a real JWT or signed token. 
// For this constraint "Simple... No Supabase Auth... Server-side session cookie", 
// we use a secret value validation pattern.
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-do-not-use-in-prod';

export async function verifyPassword(username: string, password: string): Promise<boolean> {
    const { data: admin, error } = await supabaseAdmin
        .from('admins')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !admin) {
        console.error('Auth check failed:', error?.message || 'User not found');
        return false;
    }

    return compare(password, admin.password_hash);
}

export async function createSession() {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, SESSION_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    return session?.value === SESSION_SECRET;
}
