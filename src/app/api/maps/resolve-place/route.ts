import { NextResponse } from 'next/server';
import { extractPlaceNameFromMapsUrl, isShortGoogleMapsLink } from '@/lib/maps';

/**
 * Resolves a pasted Google Maps link to a place name so the hotel-name field
 * can be auto-filled. Short links (maps.app.goo.gl, goo.gl/maps) redirect to
 * the full URL, which the browser can't follow cross-origin, so we resolve
 * them server-side. Only short Google Maps domains are ever fetched here to
 * avoid this becoming an open URL-fetch proxy.
 */
export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Missing url' }, { status: 400 });
        }

        let resolvedUrl = url;
        if (isShortGoogleMapsLink(url)) {
            const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(5000) });
            resolvedUrl = res.url || url;
        }

        return NextResponse.json({ placeName: extractPlaceNameFromMapsUrl(resolvedUrl) });
    } catch (err) {
        console.error('Maps link resolve error:', err);
        return NextResponse.json({ error: 'Unable to resolve maps link' }, { status: 500 });
    }
}
