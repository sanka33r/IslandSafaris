'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { X, Search, Loader2, MapPin, Check } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { isGoogleMapsLink } from '@/lib/maps';

const LocationPickerMap = dynamic(() => import('./LocationPickerMap'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-safari-50 text-safari-400 text-sm">
            Loading map…
        </div>
    ),
});

const SRI_LANKA_CENTER: [number, number] = [7.8731, 80.7718];

type SearchResult = { displayName: string; lat: number; lon: number };

export default function LocationPickerModal({
    title = 'Pick a location',
    initialLabel,
    onSelect,
    onClose,
}: {
    title?: string;
    initialLabel?: string;
    onSelect: (value: string) => void;
    onClose: () => void;
}) {
    const [position, setPosition] = useState<[number, number]>(SRI_LANKA_CENTER);
    const [flyToTarget, setFlyToTarget] = useState<{ coords: [number, number]; nonce: number } | null>(null);
    const [label, setLabel] = useState<string>(initialLabel && !isGoogleMapsLink(initialLabel) ? initialLabel : '');
    const [resolvingLabel, setResolvingLabel] = useState(false);
    const [hasPicked, setHasPicked] = useState(false);
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 400);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);
    const [mounted, setMounted] = useState(false);
    // Skip re-searching a query string we set programmatically (on selection).
    const skipSearchRef = useRef<string | null>(null);

    // Portal target only exists on the client; wait until mounted to render.
    useEffect(() => { setMounted(true); }, []);

    // Lock body scroll while the picker is open.
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }
        if (skipSearchRef.current === debouncedQuery) {
            skipSearchRef.current = null;
            return;
        }
        let cancelled = false;
        setSearching(true);
        fetch(`/api/maps/geocode?q=${encodeURIComponent(debouncedQuery)}`)
            .then((r) => r.json())
            .then((data) => { if (!cancelled) setResults(data.results || []); })
            .catch(() => { if (!cancelled) setResults([]); })
            .finally(() => { if (!cancelled) setSearching(false); });
        return () => { cancelled = true; };
    }, [debouncedQuery]);

    const reverseGeocode = useCallback(async (lat: number, lng: number) => {
        setResolvingLabel(true);
        try {
            const res = await fetch(`/api/maps/reverse-geocode?lat=${lat}&lon=${lng}`);
            const data = await res.json();
            setLabel(data.displayName || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        } catch {
            setLabel(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        } finally {
            setResolvingLabel(false);
        }
    }, []);

    const handlePick = useCallback((lat: number, lng: number) => {
        setPosition([lat, lng]);
        setHasPicked(true);
        reverseGeocode(lat, lng);
    }, [reverseGeocode]);

    const handleSelectResult = (r: SearchResult) => {
        setPosition([r.lat, r.lon]);
        setFlyToTarget({ coords: [r.lat, r.lon], nonce: Date.now() });
        setHasPicked(true);
        setLabel(r.displayName);
        setResults([]);
        skipSearchRef.current = r.displayName;
        setQuery(r.displayName);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && results.length > 0) {
            e.preventDefault();
            handleSelectResult(results[0]);
        }
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude]);
            setFlyToTarget({ coords: [latitude, longitude], nonce: Date.now() });
            setHasPicked(true);
            reverseGeocode(latitude, longitude);
        });
    };

    const handleConfirm = () => {
        if (!hasPicked) return;
        onSelect(label || `${position[0].toFixed(5)}, ${position[1].toFixed(5)}`);
        onClose();
    };

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-safari-100 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-safari-100">
                    <h3 className="text-base font-bold text-safari-900">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-safari-100 text-safari-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-4 sm:px-5 pt-3 pb-2 relative z-[1000]">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-safari-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Search for a place in Sri Lanka…"
                            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-safari-200 text-sm text-safari-900 placeholder:text-safari-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500"
                        />
                        {searching && <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-safari-400 animate-spin" />}
                    </div>
                    {results.length > 0 && (
                        <ul className="absolute left-4 right-4 sm:left-5 sm:right-5 mt-1 bg-white border border-safari-200 rounded-xl shadow-lg max-h-48 overflow-y-auto z-[1000]">
                            {results.map((r, i) => (
                                <li key={i}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectResult(r)}
                                        className="w-full text-left px-3 py-2 text-sm text-safari-800 hover:bg-safari-50 transition-colors"
                                    >
                                        {r.displayName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="h-[280px] sm:h-[360px] relative isolate z-0">
                    <LocationPickerMap position={position} onPick={handlePick} flyToTarget={flyToTarget} />
                </div>

                <div className="px-4 sm:px-5 py-3 border-t border-safari-100 space-y-3">
                    <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-secondary-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-safari-700 min-h-[1.25rem]">
                            {!hasPicked
                                ? 'Tap the map, drag the pin, or search above to set a location.'
                                : resolvingLabel
                                    ? 'Looking up address…'
                                    : (label || `${position[0].toFixed(5)}, ${position[1].toFixed(5)}`)}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={handleUseCurrentLocation}
                            className="text-xs font-semibold text-secondary-600 hover:text-secondary-700 bg-secondary-50 hover:bg-secondary-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Use my current location
                        </button>
                        <div className="flex-1" />
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-safari-200 text-safari-600 hover:bg-safari-50 font-bold text-sm transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={!hasPicked || resolvingLabel}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white font-bold text-sm transition-all disabled:opacity-50"
                        >
                            <Check size={16} />
                            Use this location
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
