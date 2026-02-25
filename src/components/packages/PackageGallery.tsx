'use client';

import { useState } from 'react';

interface PackageGalleryProps {
    images: string[];
    title?: string;
    altPrefix?: string;
}

export default function PackageGallery({ images, title = 'Gallery', altPrefix = 'Experience' }: PackageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (!images?.length) return null;

    return (
        <>
            <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="max-w-2xl mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-px w-8 sm:w-10 bg-secondary-400" />
                        <span className="text-secondary-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">
                            Photos
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 leading-snug">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {images.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setSelectedIndex(i)}
                            className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 group"
                        >
                            <img
                                src={src}
                                alt={`${altPrefix} photo ${i + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading={i < 6 ? 'eager' : 'lazy'}
                            />
                        </button>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                    onClick={() => setSelectedIndex(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none z-10"
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
                        }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 text-2xl z-10"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <img
                        src={images[selectedIndex]}
                        alt={`${altPrefix} photo ${selectedIndex + 1}`}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1));
                        }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 text-2xl z-10"
                        aria-label="Next image"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}
