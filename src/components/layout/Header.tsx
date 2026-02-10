'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Compass, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Packages', href: '/packages' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed w-full z-40 transition-all duration-500',
                    scrolled
                        ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border-b border-safari-100/50'
                        : 'bg-[#faf8f4]/90 backdrop-blur-md border-b border-safari-100/30'
                )}
            >
                <div className="container mx-auto px-6">
                    <div className="h-16 md:h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 relative z-[60] group">
                            <div
                                className={cn(
                                    'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500',
                                    scrolled
                                        ? 'bg-secondary-600 shadow-md'
                                        : isOpen
                                            ? 'bg-secondary-600'
                                            : 'bg-secondary-600/10 border border-secondary-200'
                                )}
                            >
                                <Compass
                                    size={18}
                                    className="text-white group-hover:rotate-45 transition-transform duration-500"
                                />
                            </div>
                            <span
                                className={cn(
                                    'text-lg md:text-xl font-bold tracking-tight transition-colors duration-500',
                                    scrolled
                                        ? 'text-safari-900'
                                        : isOpen
                                            ? 'text-white'
                                            : 'text-safari-900'
                                )}
                            >
                                ISLAND
                                <span
                                    className={cn(
                                        'transition-colors duration-500',
                                        scrolled ? 'text-secondary-600' : 'text-secondary-600'
                                    )}
                                >
                                    SAFARIS
                                </span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center">
                            <div
                                className={cn(
                                    'flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500',
                                    scrolled
                                        ? 'bg-safari-50 border border-safari-100'
                                        : 'bg-safari-100/50 border border-safari-200/50'
                                )}
                            >
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                                            pathname === item.href
                                                ? scrolled
                                                    ? 'bg-white text-secondary-600 shadow-sm'
                                                    : 'bg-white text-secondary-600 shadow-sm'
                                                : scrolled
                                                    ? 'text-safari-600 hover:text-safari-900 hover:bg-white/60'
                                                    : 'text-safari-600 hover:text-safari-900 hover:bg-white/60'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href="/booking"
                                className={cn(
                                    'ml-4 group flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95',
                                    scrolled
                                        ? 'bg-safari-900 hover:bg-safari-800 text-white shadow-lg'
                                        : 'bg-safari-900 hover:bg-safari-800 text-white shadow-lg'
                                )}
                            >
                                Book Now
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                />
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className={cn(
                                'md:hidden relative z-[60] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                                isOpen
                                    ? 'bg-white/10'
                                    : scrolled
                                        ? 'bg-safari-50 border border-safari-100'
                                        : 'bg-safari-100/50 border border-safari-200/50'
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <X size={22} className="text-white" />
                            ) : (
                                <Menu
                                    size={22}
                                    className={cn(
                                        'transition-colors',
                                        scrolled ? 'text-safari-800' : 'text-safari-800'
                                    )}
                                />
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
                        className="fixed inset-0 z-50 bg-safari-900/95 backdrop-blur-xl flex flex-col md:hidden"
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-600/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl" />

                        <div className="flex-1 flex flex-col justify-center px-8 relative">
                            <div className="space-y-2">
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
                                                'block py-3 text-3xl font-bold transition-all duration-300',
                                                pathname === item.href
                                                    ? 'text-secondary-400'
                                                    : 'text-white/60 hover:text-white hover:translate-x-2'
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
                                className="mt-10"
                            >
                                <Link
                                    href="/booking"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-3 bg-secondary-600 text-white py-4 px-8 rounded-full text-lg font-bold shadow-xl hover:bg-secondary-500 active:scale-95 transition-all"
                                >
                                    Book Your Safari
                                    <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="px-8 pb-8 text-white/30 text-xs"
                        >
                            <p>© 2024 Island Safaris Sri Lanka</p>
                            <p>Authentic Wildlife Experiences</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
