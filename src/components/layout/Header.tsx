'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className="fixed w-full z-40 bg-secondary-50/90 backdrop-blur-md shadow-sm border-b border-safari-100">
                <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 relative z-[60]">
                        <span className={cn(
                            "text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300",
                            isOpen ? "text-white" : "text-safari-800"
                        )}>
                            ISLAND<span className="text-secondary-600">SAFARIS</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-secondary-600",
                                    pathname === item.href ? "text-secondary-600 font-semibold" : "text-safari-800"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/booking"
                            className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2.5 rounded-full font-semibold transition-transform hover:scale-105 shadow-md active:scale-95"
                        >
                            Book Now
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 relative z-[60] transition-colors duration-300"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <X size={28} className="text-white" />
                        ) : (
                            <Menu size={28} className="text-safari-800" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Nav - Full Screen (Moved outside to avoid backdrop-blur containing block) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-safari-800 flex flex-col p-8 md:hidden"
                    >
                        <div className="flex-1 flex flex-col justify-center gap-6">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-3xl font-bold transition-colors",
                                            pathname === item.href ? "text-secondary-400" : "text-white/90 hover:text-secondary-300"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/booking"
                                    onClick={() => setIsOpen(false)}
                                    className="block bg-secondary-600 text-white text-center py-4 rounded-full text-xl font-bold shadow-xl active:scale-95 transition-transform"
                                >
                                    Book Your Safari
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Footer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-auto pt-8 border-t border-white/10 text-white/50 text-sm"
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
