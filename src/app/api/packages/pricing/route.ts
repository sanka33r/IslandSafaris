import { NextResponse } from 'next/server';
import { getBookingPackageInfoMap } from '@/lib/packages';

export async function GET() {
    const packageInfo = await getBookingPackageInfoMap();
    return NextResponse.json({ packageInfo });
}
