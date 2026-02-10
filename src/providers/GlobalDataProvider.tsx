'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DestinationWithImages, getDestinationsWithImages } from '@/lib/queries/destinations';

interface GlobalDataContextType {
    destinations: DestinationWithImages[];
    isLoading: boolean;
    error: string | null;
}

const GlobalDataContext = createContext<GlobalDataContextType>({
    destinations: [],
    isLoading: true,
    error: null,
});

export const useGlobalData = () => useContext(GlobalDataContext);

export default function GlobalDataProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [destinations, setDestinations] = useState<DestinationWithImages[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const data = await getDestinationsWithImages();
                if (isMounted) {
                    setDestinations(data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Failed to fetch global data:', err);
                if (isMounted) {
                    setError('Failed to load data');
                    setIsLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <GlobalDataContext.Provider value={{ destinations, isLoading, error }}>
            {children}
        </GlobalDataContext.Provider>
    );
}
