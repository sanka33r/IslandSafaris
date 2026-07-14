import { NextResponse } from 'next/server';

/**
 * Proxies a reverse-geocode lookup to OpenStreetMap's Nominatim API so a
 * clicked/dragged map pin can be turned into a readable address. Server-side
 * so we can set a proper User-Agent, per Nominatim's usage policy.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    if (!lat || !lon) {
        return NextResponse.json({ displayName: null });
    }

    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
        const res = await fetch(url, {
            headers: { 'User-Agent': 'IslandSafaris/1.0 (booking pickup location picker)' },
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) {
            return NextResponse.json({ displayName: null });
        }
        const data = await res.json();
        return NextResponse.json({ displayName: data?.display_name ?? null });
    } catch (err) {
        console.error('Reverse geocode error:', err);
        return NextResponse.json({ displayName: null });
    }
}
