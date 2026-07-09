'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/providers/LocaleProvider';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { messages } = useLocale();
    const navItems = [
        { name: messages.nav.home, href: '/' },
        { name: messages.nav.destinations, href: '/destinations' },
        { name: messages.nav.packages, href: '/packages' },
        { name: messages.nav.gallery, href: '/gallery' },
        { name: messages.nav.about, href: '/about' },
        { name: messages.nav.contact, href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed w-full z-50 transition-all duration-500 border-b border-white/5',
                    scrolled
                        ? 'bg-safari-950/90 backdrop-blur-xl shadow-lg py-3'
                        : 'bg-safari-950/70 backdrop-blur-md py-5'
                )}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group relative z-[60]">
                            <Image
                                src="/logo-mark.svg"
                                alt="Island Safaris logo"
                                width={40}
                                height={40}
                                className="w-10 h-10 transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                            <span className="text-xl font-bold tracking-tight text-secondary-100 transition-colors">
                                ISLAND
                                <span className="text-secondary-400 ml-0.5">SAFARIS</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner shadow-black/20">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                                            pathname === item.href
                                                ? 'bg-secondary-600 text-white shadow-lg shadow-secondary-900/40'
                                                : 'text-secondary-100/70 hover:text-white hover:bg-white/5'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href="/booking"
                                className="group flex items-center gap-2 pl-6 pr-2 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 text-white"
                            >
                                <span className="text-secondary-100 group-hover:text-white transition-colors">{messages.nav.bookNow}</span>
                                <div className="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center group-hover:bg-secondary-500 transition-colors shadow-lg shadow-secondary-900/50">
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden relative z-[60] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 text-secondary-100"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <X size={22} className="text-white" />
                            ) : (
                                <Menu size={22} className="text-secondary-100" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav - Full Screen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-safari-950/98 backdrop-blur-xl flex flex-col md:hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-6 z-[70] w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-secondary-100 hover:bg-white/10 transition-all"
                            aria-label="Close Menu"
                        >
                            <X size={22} />
                        </button>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex-1 flex flex-col justify-center px-8 relative">
                            <div className="space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.1 + index * 0.06,
                                            duration: 0.4,
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                'block py-2 text-4xl font-bold transition-all duration-300 tracking-tight',
                                                pathname === item.href
                                                    ? 'text-secondary-400'
                                                    : 'text-white/40 hover:text-white hover:translate-x-2'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12"
                            >
                                <Link
                                    href="/booking"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-4 bg-secondary-600 text-white py-4 px-10 rounded-full text-lg font-bold shadow-xl shadow-secondary-900/50 hover:bg-secondary-500 active:scale-95 transition-all w-full justify-center group"
                                >
                                    {messages.nav.bookSafari}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="px-8 pb-10 text-white/20 text-xs font-medium tracking-widest uppercase"
                        >
                            <p className="mb-1">© 2026Island Safaris</p>
                            <p>Wild Heart of Sri Lanka</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
