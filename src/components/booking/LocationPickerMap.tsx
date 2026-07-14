'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
// JS import resolves the node_modules path reliably through Next's bundler,
// unlike a raw CSS @import which Turbopack won't resolve for packages.
import 'leaflet/dist/leaflet.css';

// Leaflet's default marker icon paths are relative to its own package and
// break under Next.js's bundler; point them at the CDN copies instead.
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onPick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

// True only while the Leaflet map's DOM container is still attached. After the
// map is removed (e.g. React Strict Mode's dev double-mount, or modal close),
// its internal _container is undefined and any map op throws "classList of
// undefined" — so we bail out instead.
function isMapAlive(map: L.Map): boolean {
    return Boolean((map as unknown as { _container?: HTMLElement })._container);
}

function FlyTo({ target }: { target: { coords: [number, number]; nonce: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (!target || !isMapAlive(map)) return;
        try {
            // animate:false avoids the pan-animation rAF callback, which can run
            // after the map is torn down and crash on _container.classList.
            map.setView(target.coords, Math.max(map.getZoom(), 14), { animate: false });
        } catch { /* map removed mid-update */ }
    }, [target, map]);
    return null;
}

/**
 * Leaflet measures its container on init; inside a modal that container may not
 * have its final size yet, so it only loads tiles for a stale (smaller) area.
 * Invalidate the size once mounted — and again on any container resize — so the
 * full map fills the box.
 */
function InvalidateSize() {
    const map = useMap();
    useEffect(() => {
        const invalidate = () => {
            if (!isMapAlive(map)) return;
            try { map.invalidateSize(); } catch { /* map removed */ }
        };
        const t = setTimeout(invalidate, 0);
        let observer: ResizeObserver | undefined;
        if (isMapAlive(map)) {
            observer = new ResizeObserver(invalidate);
            observer.observe(map.getContainer());
        }
        return () => {
            clearTimeout(t);
            observer?.disconnect();
        };
    }, [map]);
    return null;
}

export default function LocationPickerMap({
    position,
    onPick,
    flyToTarget,
}: {
    position: [number, number];
    onPick: (lat: number, lng: number) => void;
    flyToTarget: { coords: [number, number]; nonce: number } | null;
}) {
    return (
        <MapContainer center={position} zoom={9} scrollWheelZoom style={{ position: 'absolute', inset: 0, height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={position}
                icon={markerIcon}
                draggable
                eventHandlers={{
                    dragend: (e) => {
                        const { lat, lng } = e.target.getLatLng();
                        onPick(lat, lng);
                    },
                }}
            />
            <ClickHandler onPick={onPick} />
            <FlyTo target={flyToTarget} />
            <InvalidateSize />
        </MapContainer>
    );
}
