'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/providers/LocaleProvider';
import { optimizeCloudinaryUrl } from '@/lib/images';

const HERO_IMAGE = 'https://res.cloudinary.com/dxau42ovy/image/upload/v1770663701/IMG_6199.JPG_mxebtr.jpg';

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const fogRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const terrainRef = useRef<HTMLDivElement>(null);
    const compassRef = useRef<HTMLDivElement>(null);
    const { messages } = useLocale();

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const desktop = window.matchMedia('(min-width: 768px) and (hover: hover)');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduceMotion.matches) return;

        // Parallax targets (raw input) and current (smoothed) values.
        // Smoothing happens in the rAF loop via lerp, and transforms are
        // written straight to the DOM so scroll/mouse never re-renders React.
        const target = { x: 0, y: 0, scroll: 0 };
        const current = { x: 0, y: 0, scroll: 0 };
        let rafId = 0;
        let running = false;

        const render = () => {
            current.x += (target.x - current.x) * 0.08;
            current.y += (target.y - current.y) * 0.08;
            current.scroll += (target.scroll - current.scroll) * 0.14;

            if (bgRef.current) {
                bgRef.current.style.transform = `translate3d(${current.x * -15}px, ${current.y * -15 + current.scroll * 0.4}px, 0) scale(1.15)`;
            }
            if (fogRef.current) {
                fogRef.current.style.transform = `translate3d(${current.x * -8}px, ${current.scroll * 0.2}px, 0)`;
            }
            if (contentRef.current) {
                contentRef.current.style.transform = `translate3d(${current.x * 12}px, ${current.y * 8 - current.scroll * 0.1}px, 0)`;
            }
            if (terrainRef.current) {
                terrainRef.current.style.transform = `translate3d(${current.x * 20}px, 0, 0)`;
            }
            if (compassRef.current) {
                compassRef.current.style.transform = `rotate(${current.scroll * 0.05 + current.x * 20}deg)`;
            }

            const settled =
                Math.abs(target.x - current.x) < 0.0005 &&
                Math.abs(target.y - current.y) < 0.0005 &&
                Math.abs(target.scroll - current.scroll) < 0.1;

            if (settled) {
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

        const handleScroll = () => {
            if (!desktop.matches) return;
            // Hero parallax only matters while the hero is on screen
            target.scroll = Math.min(window.scrollY, window.innerHeight * 1.5);
            kick();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!desktop.matches) return;
            const rect = hero.getBoundingClientRect();
            target.x = (e.clientX - rect.left) / rect.width - 0.5;
            target.y = (e.clientY - rect.top) / rect.height - 0.5;
            kick();
        };

        const handleMouseLeave = () => {
            target.x = 0;
            target.y = 0;
            kick();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        hero.addEventListener('mouseleave', handleMouseLeave);
        handleScroll();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            hero.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-[calc(100svh-5rem)] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-safari-900 pt-14 md:pt-0 pb-8 md:pb-0 px-4 sm:px-6"
            style={{ backgroundColor: '#1e2b1b' }}
        >
            {/* ── Deep Background Layer (moves slowest) ── */}
            {/* Mobile gets a portrait, subject-aware Cloudinary crop instead of a
                brutal center-slice of the wide desktop photo. Desktop keeps the
                1.15 overscan so the parallax never exposes edges. */}
            <div ref={bgRef} className="absolute inset-0 md:scale-[1.15] md:will-change-transform">
                <picture>
                    <source
                        media="(max-width: 767px)"
                        srcSet={optimizeCloudinaryUrl(HERO_IMAGE, { width: 900, height: 1600, quality: 72 })}
                    />
                    <img
                        src={optimizeCloudinaryUrl(HERO_IMAGE, { width: 1920, quality: 75 })}
                        alt="Sri Lanka safari wilderness landscape with elephants"
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </picture>
            </div>

            {/* ── Color Overlays for depth ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-safari-950/60 via-safari-900/40 to-safari-950/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-safari-950/50 via-transparent to-safari-950/50" />

            {/* ── Atmospheric Fog Layer ── */}
            <div ref={fogRef} className="absolute inset-0 pointer-events-none will-change-transform">
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-safari-950/90 via-safari-900/20 to-transparent" />
                {/* Horizontal mist bands — desktop only (static bands look muddy on mobile) */}
                <div className="hidden md:block absolute bottom-[20%] left-0 right-0 h-24 bg-white/[0.03] blur-2xl hero-mist-drift" />
                <div className="hidden md:block absolute bottom-[35%] left-0 right-0 h-16 bg-white/[0.02] blur-3xl hero-mist-drift-slow" />
            </div>

            {/* ── Floating Particles (fireflies/dust motes) ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(14)].map((_, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{
                            left: `${8 + (i * 5.2) % 85}%`,
                            top: `${12 + (i * 7.3) % 70}%`,
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${4 + (i % 5) * 1.5}s`,
                            opacity: 0.3 + (i % 4) * 0.15,
                        }}
                    />
                ))}
            </div>

            {/* ── Birds — desktop only ── */}
            <div className="absolute top-10 left-0 w-full h-[60vh] pointer-events-none z-10 opacity-30 hidden md:block">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <g className="bird-fly text-safari-950">
                        <path d="M10,50 Q25,30 40,50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        <path d="M35,65 Q50,45 65,65" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                    <g className="bird-fly text-safari-950" style={{ animationDelay: '15s', animationDuration: '45s' }}>
                        <path d="M0,90 Q15,70 30,90" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </g>
                </svg>
            </div>

            {/* ── Decorative Safari Compass ── */}
            <div
                ref={compassRef}
                className="absolute bottom-8 left-8 w-28 h-28 opacity-10 pointer-events-none hidden md:block will-change-transform"
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" className="text-secondary-400" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" className="text-secondary-400" />
                    <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.5" className="text-white" />
                    <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-white" />
                    <polygon points="50,8 46,28 54,28" fill="currentColor" className="text-secondary-400" />
                    <polygon points="50,92 46,72 54,72" fill="currentColor" className="text-white/50" />
                    <text x="50" y="7" textAnchor="middle" fontSize="5" fill="currentColor" className="text-secondary-300">N</text>
                    <text x="50" y="99" textAnchor="middle" fontSize="5" fill="currentColor" className="text-white/40">S</text>
                    <text x="97" y="52" textAnchor="middle" fontSize="5" fill="currentColor" className="text-white/40">E</text>
                    <text x="4" y="52" textAnchor="middle" fontSize="5" fill="currentColor" className="text-white/40">W</text>
                </svg>
            </div>

            {/* ── Main Content ── */}
            <div
                ref={contentRef}
                className="relative z-40 text-center px-2 sm:px-4 max-w-5xl mx-auto text-white will-change-transform"
            >
                {/* Tag */}
                <div className="hero-enter inline-flex items-center gap-2 bg-secondary-600/20 backdrop-blur-md border border-secondary-400/30 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 mb-5 sm:mb-6 md:mb-8 max-w-[95vw] sm:max-w-none">
                    <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-secondary-400" />
                    </span>
                    <span className="text-secondary-200 text-xs sm:text-sm font-medium tracking-wide text-center">
                        {messages.hero.tag}
                    </span>
                </div>

                {/* Heading with staggered entrance */}
                <h1 className="hero-enter hero-enter-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.08] sm:leading-[1.05]">
                    <span className="block">{messages.hero.titleTop}</span>
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-500 hero-text-shimmer">
                            {messages.hero.titleHighlight}
                        </span>
                        {/* Animated underline accent */}
                        <span className="hero-underline absolute bottom-0 md:-bottom-2 left-0 w-full h-[2px] md:h-[3px] bg-gradient-to-r from-secondary-400 via-secondary-500 to-transparent rounded-full" />
                    </span>
                    <span className="block">{messages.hero.titleBottom}</span>
                </h1>

                {/* Description */}
                <p className="hero-enter hero-enter-2 text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
                    {messages.hero.descriptionTop}
                    {' '}
                    {messages.hero.descriptionBottom}
                </p>

                {/* CTA buttons */}
                <div className="hero-enter hero-enter-3 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
                    <Link
                        href="/booking"
                        className="group relative bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 text-white font-bold py-3.5 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-secondary-900/50 active:scale-95 inline-flex items-center justify-center gap-2 sm:gap-3 overflow-hidden min-h-[44px] sm:min-h-0"
                    >
                        <span className="relative z-10 text-sm sm:text-base">{messages.hero.ctaBook}</span>
                        <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform shrink-0 sm:w-5 sm:h-5" />
                        {/* Button shine effect */}
                        <div className="absolute inset-0 hero-btn-shine" />
                    </Link>
                    <Link
                        href="/destinations"
                        className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0 text-sm sm:text-base"
                    >
                        {messages.hero.ctaExplore}
                        <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                </div>

                {/* Stats strip */}
                <div className="hero-enter hero-enter-4 mt-10 sm:mt-12 md:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
                    {[
                        { value: '300+', label: messages.hero.statElephants },
                        { value: '3', label: messages.hero.statParks },
                        { value: '5★', label: messages.hero.statRated },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center min-w-[4rem] sm:min-w-0">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-400">{stat.value}</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-white/50 uppercase tracking-widest mt-0.5 sm:mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Bottom Terrain Silhouette ── */}
            <div ref={terrainRef} className="absolute bottom-0 left-0 right-0 pointer-events-none z-30 will-change-transform">
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="w-full h-12 sm:h-16 md:h-24"
                    fill="none"
                >
                    <path
                        d="M0,120 L0,80 Q120,30 240,60 Q360,90 480,50 Q600,10 720,40 Q840,70 960,35 Q1080,0 1200,45 Q1320,90 1440,55 L1440,120 Z"
                        className="fill-secondary-50"
                    />
                    <path
                        d="M0,120 L0,95 Q180,55 360,75 Q540,95 720,65 Q900,35 1080,70 Q1260,105 1440,80 L1440,120 Z"
                        className="fill-secondary-50/60"
                    />
                </svg>
            </div>
        </section>
    );
}
