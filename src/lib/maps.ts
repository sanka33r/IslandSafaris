const PLACE_SEGMENT_RE = /\/maps\/place\/([^/@]+)/i;
const QUERY_PLACE_RE = /[?&]q=([^&]+)/i;
const LATLNG_RE = /^-?\d{1,3}(\.\d+)?,\s*-?\d{1,3}(\.\d+)?$/;
const PLUS_CODE_RE = /^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}/i;

function cleanPlaceName(raw: string): string | null {
    const name = decodeURIComponent(raw).replace(/\+/g, ' ').trim();
    if (!name || LATLNG_RE.test(name) || PLUS_CODE_RE.test(name)) return null;
    return name;
}

/** Extracts a human-readable place name from a Google Maps URL, if present. */
export function extractPlaceNameFromMapsUrl(url: string): string | null {
    try {
        const placeMatch = url.match(PLACE_SEGMENT_RE);
        if (placeMatch) {
            const name = cleanPlaceName(placeMatch[1]);
            if (name) return name;
        }
        const queryMatch = url.match(QUERY_PLACE_RE);
        if (queryMatch) {
            const name = cleanPlaceName(queryMatch[1]);
            if (name) return name;
        }
    } catch {
        return null;
    }
    return null;
}

/** Short links (maps.app.goo.gl, goo.gl/maps) redirect server-side to a full URL before the place name can be parsed. */
export function isShortGoogleMapsLink(url: string): boolean {
    return /^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps)\//i.test(url.trim());
}

export function isGoogleMapsLink(url: string): boolean {
    return /google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(url);
}
