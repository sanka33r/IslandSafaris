import { NextResponse } from 'next/server';
import { verifyPassword, createSession } from '@/lib/auth';
export async function POST(request: Request) {

    const body = await request.json();
    const { username, password } = body;

    const isValid = await verifyPassword(username, password);

    if (!isValid) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    await createSession();

    return NextResponse.json({ success: true });
}
