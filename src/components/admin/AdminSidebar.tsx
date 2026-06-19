'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BarChart3, MessageSquare, MapPin, LogOut, Shield, Menu, X, CalendarDays, Tag, Settings, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Trigger re-render check for sidebar items

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: BarChart3 },
        { name: 'Bookings', href: '/admin/bookings', icon: LayoutDashboard },
        { name: 'Package Bookings', href: '/admin/package-bookings', icon: LayoutDashboard },
        { name: 'Calendar', href: '/admin/calendar', icon: CalendarDays },
        { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
        { name: 'Packages', href: '/admin/packages', icon: Compass },
        { name: 'Promo Codes', href: '/admin/promo-codes', icon: Tag },
        { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const currentNavItem = [...navItems]
        .sort((a, b) => b.href.length - a.href.length)
        .find(item =>
            item.href === '/admin' ? (pathname === '/admin' || pathname === '/admin/') : pathname.startsWith(item.href)
        ) || { name: 'Admin', icon: Shield };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-safari-900 border-r border-safari-800/10 shadow-2xl">
            <div className="p-6 flex items-center justify-between font-bold text-xl text-white border-b border-safari-800/50">
                <div className="flex items-center gap-2">
                    <Shield className="text-secondary-500" />
                    <span className="tracking-tight">Admin <span className="text-secondary-400">Panel</span></span>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden text-safari-400 hover:text-white bg-safari-800 p-2 rounded-xl transition-all"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto mt-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === '/admin'
                        ? (pathname === '/admin' || pathname === '/admin/')
                        : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group",
                                isActive
                                    ? "bg-secondary-600 text-white shadow-lg shadow-secondary-900/20 font-bold translate-x-1"
                                    : "text-safari-300 hover:bg-safari-800 hover:text-white"
                            )}
                        >
                            <Icon size={20} className={cn(isActive ? "text-white" : "text-safari-400 group-hover:text-secondary-400 transition-colors")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-safari-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3.5 w-full text-left font-semibold hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all text-safari-400 group"
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-safari-900 text-safari-100 flex-shrink-0 hidden md:flex flex-col h-screen fixed left-0 top-0 bottom-0 z-50">
                <SidebarContent />
            </aside>

            {/* Mobile Header - Forced to be a top bar */}
            <div className="md:hidden w-full h-16" /> {/* Spacer */}
            <header className="md:hidden fixed top-0 left-0 right-0 w-full bg-safari-900 h-16 px-4 z-40 flex items-center justify-between border-b border-safari-800 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary-600/10 p-2 rounded-lg">
                        <currentNavItem.icon className="text-secondary-500" size={20} />
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">
                        {currentNavItem.name}
                    </span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-white bg-safari-800 p-2 rounded-xl active:scale-90 transition-all shadow-inner"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="absolute inset-y-0 left-0 w-[280px] shadow-2xl"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
