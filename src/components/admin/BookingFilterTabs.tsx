'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function BookingFilterTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get('status') || 'new';

    const tabs = [
        { id: 'new', label: 'New Bookings' },
        { id: 'confirmed', label: 'Confirmed' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'all', label: 'All History' },
    ];

    const handleTabChange = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status === 'all') {
            params.delete('status');
        } else {
            params.set('status', status);
        }
        params.set('page', '1'); // Reset pagination on filter change
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex p-1 bg-safari-100/50 rounded-2xl w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                        "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        currentStatus === tab.id || (tab.id === 'all' && !searchParams.get('status'))
                            ? "bg-white text-safari-900 shadow-sm"
                            : "text-safari-400 hover:text-safari-600"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
