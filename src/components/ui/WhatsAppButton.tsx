'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
    phoneNumber?: string; // e.g. 94770000000
    message?: string;
    className?: string;
}

export default function WhatsAppButton({
    phoneNumber = '94770000000', // Default fallback
    message = 'Hi! I am interested in booking a safari.'
}: WhatsAppButtonProps) {

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 md:bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <MessageCircle size={28} fill="currentColor" />
            <span className="font-semibold hidden sm:inline">Chat with us</span>
        </motion.a>
    );
}
