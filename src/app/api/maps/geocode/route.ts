import { NextResponse } from 'next/server';

/**
 * Proxies a place search to OpenStreetMap's Nominatim API, biased to Sri Lanka.
 * Server-side so we can set a proper User-Agent, per Nominatim's usage policy
 * (https://operations.osmfoundation.org/policies/nominatim/) — direct
 * client-side calls without one get rate-limited or blocked.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();
    if (!q) {
        return NextResponse.json({ results: [] });
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=lk&limit=5`;
        const res = await fetch(url, {
            headers: { 'User-Agent': 'IslandSafaris/1.0 (booking pickup location picker)' },
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) {
            return NextResponse.json({ results: [] });
        }
        const data = await res.json();
        const results = (Array.isArray(data) ? data : []).map((r: { display_name: string; lat: string; lon: string }) => ({
            displayName: r.display_name,
            lat: parseFloat(r.lat),
            lon: parseFloat(r.lon),
        }));
        return NextResponse.json({ results });
    } catch (err) {
        console.error('Geocode search error:', err);
        return NextResponse.json({ results: [] });
    }
}
