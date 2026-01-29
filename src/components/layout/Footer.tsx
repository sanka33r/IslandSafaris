import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-safari-800 text-safari-50 pt-16 pb-24 md:pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            ISLAND<span className="text-secondary-400">SAFARIS</span>
                        </h3>
                        <p className="text-safari-200 max-w-sm mx-auto md:mx-0 leading-relaxed text-sm md:text-base">
                            Experience the wild heart of Sri Lanka. Specialized jeep safaris in Minneriya, Kaudulla, and Hurulu Eco Park with expert guides.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Explore</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/destinations" className="text-safari-200 hover:text-secondary-400 transition-colors">Destinations</Link>
                            <Link href="/gallery" className="text-safari-200 hover:text-secondary-400 transition-colors">Gallery</Link>
                            <Link href="/about" className="text-safari-200 hover:text-secondary-400 transition-colors">About Us</Link>
                            <Link href="/contact" className="text-safari-200 hover:text-secondary-400 transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <div className="space-y-3">
                            <a href="tel:+94770000000" className="flex items-center gap-3 text-safari-200 hover:text-secondary-400">
                                <Phone size={18} />
                                <span>+94 77 000 0000</span>
                            </a>
                            <a href="mailto:info@islandsafaris.com" className="flex items-center gap-3 text-safari-200 hover:text-secondary-400">
                                <Mail size={18} />
                                <span>info@islandsafaris.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-safari-200">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span>Habarana, Sri Lanka</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-safari-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-safari-400">
                    <p>© {new Date().getFullYear()} Island Safaris Sri Lanka. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
