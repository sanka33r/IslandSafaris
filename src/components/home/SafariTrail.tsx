'use client';

import { useEffect, useRef } from 'react';

// Trail geometry (SVG user units). The SVG stretches to the full page-side
// rail, so keep curves gentle — distortion stays invisible.
const VB_W = 64;
const VB_H = 1000;
const TRAIL_D =
    'M 32 30 C 52 120, 12 210, 32 300 C 52 390, 12 480, 32 570 C 52 660, 12 750, 32 840 C 42 890, 36 935, 32 965';

/**
 * A safari-themed scroll companion: a winding track of footprint dots along
 * the left edge that reveals itself as you scroll, with a tiny jeep driving
 * down the trail. All motion is rAF + lerp on transforms — no React renders
 * during scroll — so it stays smooth on mobile.
 */
export default function SafariTrail() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const clipRef = useRef<SVGRectElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const path = pathRef.current;
        const clip = clipRef.current;
        const marker = markerRef.current;
        if (!wrap || !path || !clip || !marker) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const totalLength = path.getTotalLength();
        let target = 0;
        const current = { p: -1 }; // force first paint
        let rafId = 0;
        let running = false;

        const render = () => {
            current.p += (target - current.p) * 0.12;

            const at = Math.max(0, Math.min(1, current.p)) * totalLength;
            const pt = path.getPointAtLength(at);
            const ahead = path.getPointAtLength(Math.min(totalLength, at + 2));
            const behind = path.getPointAtLength(Math.max(0, at - 2));
            const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

            const rect = wrap.getBoundingClientRect();
            const x = (pt.x / VB_W) * rect.width;
            const y = (pt.y / VB_H) * rect.height;

            marker.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle - 90}deg)`;
            clip.setAttribute('height', String(pt.y + 6));
            wrap.style.opacity = current.p > 0.015 ? '1' : '0';

            if (Math.abs(target - current.p) < 0.0008) {
                running = false;
                return;
            }
            rafId = requestAnimationFrame(render);
        };

        const kick = () => {
            if (!running) {
                running = true;
                rafId = requestAnimationFrame(render);
            }
        };

        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            target = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
            kick();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            aria-hidden="true"
            className="fixed left-0 top-0 h-screen w-9 sm:w-12 md:w-16 pointer-events-none z-40 opacity-0 transition-opacity duration-500"
        >
            <svg
                className="h-full w-full"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                fill="none"
            >
                <defs>
                    <clipPath id="safari-trail-clip">
                        <rect ref={clipRef} x="0" y="0" width={VB_W} height="0" />
                    </clipPath>
                </defs>

                {/* Faint full trail — where the journey leads */}
                <g className="text-safari-400/40" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5">
                    <path d={TRAIL_D} transform="translate(-3.5 0)" strokeDasharray="0.5 17" vectorEffect="non-scaling-stroke" />
                    <path d={TRAIL_D} transform="translate(3.5 0)" strokeDasharray="0.5 17" strokeDashoffset="-8.5" vectorEffect="non-scaling-stroke" />
                </g>

                {/* Travelled trail — footprints revealed by scroll */}
                <g
                    className="text-secondary-500"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                    clipPath="url(#safari-trail-clip)"
                >
                    <path d={TRAIL_D} transform="translate(-3.5 0)" strokeDasharray="0.5 17" vectorEffect="non-scaling-stroke" />
                    <path d={TRAIL_D} transform="translate(3.5 0)" strokeDasharray="0.5 17" strokeDashoffset="-8.5" vectorEffect="non-scaling-stroke" />
                </g>

                {/* Hidden reference path for the marker position */}
                <path ref={pathRef} d={TRAIL_D} stroke="none" />
            </svg>

            {/* Jeep marker (top view, heading down the trail) */}
            <div ref={markerRef} className="absolute left-0 top-0 will-change-transform drop-shadow-md">
                <svg width="20" height="28" viewBox="0 0 20 28" className="sm:w-[24px] sm:h-[34px]">
                    {/* Wheels */}
                    <g fill="#2a2a26">
                        <rect x="0" y="3" width="3.5" height="6" rx="1.5" />
                        <rect x="16.5" y="3" width="3.5" height="6" rx="1.5" />
                        <rect x="0" y="19" width="3.5" height="6" rx="1.5" />
                        <rect x="16.5" y="19" width="3.5" height="6" rx="1.5" />
                    </g>
                    {/* Body */}
                    <rect x="2" y="1" width="16" height="26" rx="4" className="fill-secondary-600" />
                    {/* Hood */}
                    <rect x="4" y="3" width="12" height="6" rx="2" className="fill-secondary-500" />
                    {/* Windshield */}
                    <rect x="4.5" y="10" width="11" height="3" rx="1.5" fill="#1e2b1b" opacity="0.75" />
                    {/* Canopy / roof */}
                    <rect x="3.5" y="14.5" width="13" height="11" rx="3" className="fill-safari-800" />
                    <line x1="6" y1="17" x2="14" y2="17" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <line x1="6" y1="20" x2="14" y2="20" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                    <line x1="6" y1="23" x2="14" y2="23" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                </svg>
            </div>
        </div>
    );
}
