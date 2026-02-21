'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

export default function BookingSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const currentSearch = searchParams.get('search') || '';
        if (debouncedQuery === currentSearch) return;

        const params = new URLSearchParams(searchParams);
        if (debouncedQuery) {
            params.set('search', debouncedQuery);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    }, [debouncedQuery, pathname, router, searchParams]);

    const clearSearch = () => {
        setQuery('');
    };

    return (
        <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-safari-400" size={18} />
            <input
                type="text"
                placeholder="Search name, email, or ref..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-white border border-safari-100 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all shadow-sm"
            />
            {query && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-safari-300 hover:text-safari-500 p-1"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
