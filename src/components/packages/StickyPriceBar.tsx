import Link from 'next/link';
import { ArrowRight, DollarSign } from 'lucide-react';

interface StickyPriceBarProps {
    packageName: string;
    price: string;
    advancePrice: string;
    bookHref: string;
}

export default function StickyPriceBar({ packageName, price, advancePrice, bookHref }: StickyPriceBarProps) {
    return (
        <section className="sticky top-0 z-50 container mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 md:-mt-10 relative mb-10 sm:mb-16">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-safari-100 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 w-full md:w-auto">
                    <div className="text-center md:text-left">
                        <div className="text-xs text-safari-500 uppercase tracking-wider mb-0.5">Package</div>
                        <div className="text-base sm:text-lg font-bold text-safari-900">{packageName}</div>
                    </div>
                    <div className="hidden sm:block w-px h-10 sm:h-12 bg-safari-100" />
                    <div className="text-center md:text-left">
                        <div className="text-xs text-safari-500 uppercase tracking-wider mb-1">Price</div>
                        <div className="text-2xl sm:text-3xl font-bold text-secondary-600">
                            {price} <span className="text-safari-400 text-sm sm:text-base font-normal">/ person</span>
                        </div>
                    </div>
                    <div className="hidden sm:block w-px h-10 sm:h-12 bg-safari-100" />
                    <div className="text-center md:text-left">
                        <div className="text-xs text-safari-500 uppercase tracking-wider mb-1">Advance Booking</div>
                        <div className="text-base sm:text-lg font-bold text-safari-800 flex items-center justify-center md:justify-start gap-1">
                            <DollarSign size={16} className="text-secondary-600" /> {advancePrice}
                        </div>
                    </div>
                </div>
                <Link
                    href={bookHref}
                    className="bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap inline-flex items-center gap-2 w-full md:w-auto justify-center text-sm sm:text-base"
                >
                    Book Now <ArrowRight size={18} />
                </Link>
            </div>
        </section>
    );
}
