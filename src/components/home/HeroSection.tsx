'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setMousePos({ x, y });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const parallaxBg = scrollY * 0.4;
    const parallaxMid = scrollY * 0.2;
    const parallaxFg = scrollY * 0.1;

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-safari-900"
            style={{ perspective: '1200px', backgroundColor: '#fef2d0' }}
        >
            {/* ── Deep Background Layer (moves slowest) ── */}
            <div
                className="absolute inset-0 scale-110"
                style={{
                    transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15 + parallaxBg}px, -100px) scale(1.15)`,
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
            >
                <img
                    src="https://res.cloudinary.com/dxau42ovy/image/upload/v1770663701/IMG_6199.JPG_mxebtr.jpg"
                    alt="Sri Lankan safari wilderness"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* ── Color Overlays for depth ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-safari-950/60 via-safari-900/40 to-safari-950/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-safari-950/50 via-transparent to-safari-950/50" />

            {/* ── Atmospheric Fog Layer ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    transform: `translate3d(${mousePos.x * -8}px, ${parallaxMid}px, 0)`,
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
            >
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-safari-950/90 via-safari-900/20 to-transparent" />
                {/* Horizontal mist bands */}
                <div className="absolute bottom-[20%] left-0 right-0 h-24 bg-white/[0.03] blur-2xl hero-mist-drift" />
                <div className="absolute bottom-[35%] left-0 right-0 h-16 bg-white/[0.02] blur-3xl hero-mist-drift-slow" />
            </div>

            {/* ── Floating Particles (fireflies/dust motes) ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(18)].map((_, i) => (
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

            {/* ── Birds ── */}
            <div className="absolute top-10 left-0 w-full h-[60vh] pointer-events-none z-10 opacity-30">
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
                className="absolute bottom-8 left-8 w-20 h-20 md:w-28 md:h-28 opacity-10 pointer-events-none hidden md:block"
                style={{
                    transform: `rotate(${scrollY * 0.05 + mousePos.x * 20}deg)`,
                    transition: 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
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

            {/* ── Main Content with 3D depth ── */}
            <div
                className="relative z-20 text-center px-6 max-w-5xl mx-auto text-white"
                style={{
                    transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8 - parallaxFg}px, 50px)`,
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
            >
                {/* Tag */}
                <div
                    className={`inline-flex items-center gap-2 bg-secondary-600/20 backdrop-blur-md border border-secondary-400/30 rounded-full px-5 py-2.5 mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
                        }`}
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-400" />
                    </span>
                    <span className="text-secondary-200 text-sm font-medium tracking-wide">
                        The Great Elephant Gathering Awaits
                    </span>
                </div>

                {/* Heading with staggered entrance */}
                <h1
                    className={`text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 md:mb-8 tracking-tight leading-[1.05] transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="block">Discover the</span>
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-500 hero-text-shimmer">
                            Wild Heart
                        </span>
                        {/* Animated underline accent */}
                        <span
                            className={`absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-secondary-400 via-secondary-500 to-transparent rounded-full transition-all duration-1000 delay-700 ${loaded ? 'w-full' : 'w-0'
                                }`}
                        />
                    </span>
                    <span className="block">
                        of Sri Lanka
                    </span>
                </h1>

                {/* Description */}
                <p
                    className={`text-lg md:text-xl text-white/70 mb-10 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    Exclusive jeep safaris through the legendary Minneriya-Kaudulla-Hurulu corridor.
                    Where hundreds of Asian elephants roam free.
                </p>

                {/* CTA buttons */}
                <div
                    className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-[600ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <Link
                        href="/booking"
                        className="group relative bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-secondary-900/50 active:scale-95 inline-flex items-center justify-center gap-3 overflow-hidden"
                    >
                        <span className="relative z-10">Book Your Safari</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        {/* Button shine effect */}
                        <div className="absolute inset-0 hero-btn-shine" />
                    </Link>
                    <Link
                        href="/destinations"
                        className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 inline-flex items-center justify-center gap-2"
                    >
                        Explore Destinations
                        <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                </div>

                {/* Stats strip */}
                <div
                    className={`mt-14 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                >
                    {[
                        { value: '300+', label: 'Elephants' },
                        { value: '3', label: 'National Parks' },
                        { value: '5★', label: 'Rated' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-secondary-400">{stat.value}</div>
                            <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Bottom Terrain Silhouette (foreground parallax) ── */}
            <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none z-30"
                style={{
                    transform: `translate3d(${mousePos.x * 20}px, ${-parallaxFg * 0.3}px, 80px)`,
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
            >
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="w-full h-16 md:h-24"
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
