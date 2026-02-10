import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-safari-900 text-safari-50 pt-16 pb-24 md:pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                ISLAND<span className="text-secondary-400">SAFARIS</span>
                            </span>
                        </Link>
                        <p className="text-safari-300 leading-relaxed">
                            Experience the wild heart of Sri Lanka. Specialized jeep safaris in the 
                            legendary Minneriya-Kaudulla-Hurulu corridor.
                        </p>
                        <div className="flex gap-4">
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white/10 hover:bg-secondary-600 rounded-xl flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white/10 hover:bg-secondary-600 rounded-xl flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Explore</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/" className="text-safari-300 hover:text-secondary-400 transition-colors">
                                Home
                            </Link>
                            <Link href="/destinations" className="text-safari-300 hover:text-secondary-400 transition-colors">
                                Destinations
                            </Link>
                            <Link href="/gallery" className="text-safari-300 hover:text-secondary-400 transition-colors">
                                Gallery
                            </Link>
                            <Link href="/about" className="text-safari-300 hover:text-secondary-400 transition-colors">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-safari-300 hover:text-secondary-400 transition-colors">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Destinations */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Destinations</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/destinations/minneriya-national-park" className="text-safari-300 hover:text-secondary-400 transition-colors inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                Minneriya National Park
                            </Link>
                            <Link href="/destinations/kaudulla-national-park" className="text-safari-300 hover:text-secondary-400 transition-colors inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                                Kaudulla National Park
                            </Link>
                            <Link href="/destinations/hurulu-eco-park" className="text-safari-300 hover:text-secondary-400 transition-colors inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                Hurulu Eco Park
                            </Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Contact Us</h4>
                        <div className="space-y-4">
                            <a href="tel:+94770000000" className="flex items-center gap-4 text-safari-300 hover:text-secondary-400 transition-colors group">
                                <div className="w-10 h-10 bg-white/10 group-hover:bg-secondary-600 rounded-xl flex items-center justify-center transition-colors">
                                    <Phone size={18} />
                                </div>
                                <span>+94 77 000 0000</span>
                            </a>
                            <a href="mailto:info@islandsafaris.com" className="flex items-center gap-4 text-safari-300 hover:text-secondary-400 transition-colors group">
                                <div className="w-10 h-10 bg-white/10 group-hover:bg-secondary-600 rounded-xl flex items-center justify-center transition-colors">
                                    <Mail size={18} />
                                </div>
                                <span>info@islandsafaris.com</span>
                            </a>
                            <div className="flex items-start gap-4 text-safari-300">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <span>Habarana, Sri Lanka<br />Cultural Triangle</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-safari-400">
                    <p>© {new Date().getFullYear()} Island Safaris Sri Lanka. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
