'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
    phoneNumber?: string; // e.g. 94707682401
    message?: string;
    className?: string;
}

const DEFAULT_BOTTOM_MOBILE = 112; // bottom-28
const DEFAULT_BOTTOM_DESKTOP = 32; // bottom-8
const FOOTER_GAP = 16;

function getDefaultBottom() {
    if (typeof window === 'undefined') return DEFAULT_BOTTOM_MOBILE;
    return window.matchMedia('(min-width: 768px)').matches
        ? DEFAULT_BOTTOM_DESKTOP
        : DEFAULT_BOTTOM_MOBILE;
}

export default function WhatsAppButton({
    phoneNumber = '94707682401',
    message = 'Hi! I am interested in booking a safari.',
}: WhatsAppButtonProps) {
    const [bottomOffset, setBottomOffset] = useState(DEFAULT_BOTTOM_MOBILE);

    useEffect(() => {
        const updateBottomOffset = () => {
            const footerBottom = document.getElementById('footer-bottom-bar');
            const defaultBottom = getDefaultBottom();

            if (!footerBottom) {
                setBottomOffset(defaultBottom);
                return;
            }

            const rect = footerBottom.getBoundingClientRect();
            const barEnteringViewport = window.innerHeight - rect.top;

            if (barEnteringViewport <= 0) {
                setBottomOffset(defaultBottom);
                return;
            }

            const footer = footerBottom.closest('footer');
            const footerPaddingBottom = footer
                ? Number.parseFloat(getComputedStyle(footer).paddingBottom) || 0
                : 0;

            const clearance = Math.min(rect.height + footerPaddingBottom, barEnteringViewport) + FOOTER_GAP;
            setBottomOffset(Math.max(defaultBottom, clearance));
        };

        updateBottomOffset();
        window.addEventListener('scroll', updateBottomOffset, { passive: true });
        window.addEventListener('resize', updateBottomOffset);

        return () => {
            window.removeEventListener('scroll', updateBottomOffset);
            window.removeEventListener('resize', updateBottomOffset);
        };
    }, []);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ bottom: bottomOffset }}
            className="fixed right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-[bottom] duration-200 ring-4 ring-[#25D366]/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Book safari on WhatsApp"
        >
            <span className="absolute -top-2 -right-1 h-3 w-3 rounded-full bg-white animate-ping" />
            <MessageCircle size={28} fill="currentColor" />
            <span className="font-semibold hidden sm:inline">Book on WhatsApp</span>
        </motion.a>
    );
}
