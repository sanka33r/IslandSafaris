'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { downloadBookingReceipt, ReceiptData } from '@/lib/receipt';
import { cn } from '@/lib/utils';

export default function DownloadReceiptButton({ receipt, className }: { receipt: ReceiptData; className?: string }) {
    const [downloading, setDownloading] = useState(false);

    const handleClick = async () => {
        setDownloading(true);
        try {
            await downloadBookingReceipt(receipt);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={downloading}
            className={cn(
                'flex-1 flex items-center justify-center gap-2 border-2 border-safari-900 text-safari-900 font-bold py-4 px-6 rounded-full transition-all hover:bg-safari-50 disabled:opacity-60',
                className
            )}
        >
            {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            Download Receipt
        </button>
    );
}
