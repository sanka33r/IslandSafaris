import Link from 'next/link';
import { ArrowRight, Star, Shield, Leaf } from 'lucide-react';
import { getDestinations } from '@/lib/queries/destinations';

export const revalidate = 3600;

export default async function HomePage() {
  const destinations = await getDestinations();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-safari-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Placeholder for Hero BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-safari-900 to-green-900 opacity-80" />

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 font-display tracking-tight leading-[1.1]">
            Discover the Wild Heart of <br />
            <span className="text-secondary-400">Sri Lanka</span>
          </h1>
          <p className="text-lg md:text-2xl text-safari-100 mb-8 md:mb-10 font-light max-w-2xl mx-auto">
            Exclusive Jeep Safaris in Minneriya, Kaudulla & Hurulu Eco Park.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl active:scale-95"
            >
              Book Your Safari
            </Link>
            <Link
              href="/destinations"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/20"
            >
              View Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="text-secondary-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-safari-900 mb-6 md:mb-8 leading-tight">Authentic Safari Experiences</h2>
          <p className="text-base md:text-lg text-safari-600 leading-relaxed">
            We are a locally owned operator dedicated to responsible wildlife tourism.
            Our experienced guides know the parks intimately, ensuring you have the best chance
            to witness the Great Elephant Gathering and other spectacular wildlife moments.
          </p>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-safari-900 mb-2">Popular Destinations</h2>
              <p className="text-safari-500">Explore our most requested safari tours</p>
            </div>
            <Link href="/destinations" className="flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {destinations.slice(0, 3).map(dest => (
              <Link key={dest.id} href={`/destinations/${dest.slug}`} className="group block relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-safari-200 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-secondary-400 transition-colors">{dest.name}</h3>
                  <p className="text-safari-100 line-clamp-2 text-sm mb-4 opacity-90">{dest.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary-400 group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-safari-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-8 md:p-10 border border-white/10 rounded-[2.5rem] bg-safari-900/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-secondary-600 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-secondary-900/40">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Top Rated Service</h3>
              <p className="text-safari-200 text-sm md:text-base leading-relaxed">Consistently rated 5-stars by travelers for our reliable and friendly service.</p>
            </div>
            <div className="text-center p-8 md:p-10 border border-white/10 rounded-[2.5rem] bg-safari-900/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-secondary-500 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 -rotate-2 shadow-lg shadow-secondary-900/40">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Safety First</h3>
              <p className="text-safari-200 text-sm md:text-base leading-relaxed">Well-maintained 4x4 jeeps and experienced drivers for a safe adventure.</p>
            </div>
            <div className="text-center p-8 md:p-10 border border-white/10 rounded-[2.5rem] bg-safari-900/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-secondary-400 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 rotate-1 shadow-lg shadow-secondary-900/40">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Eco-Conscious</h3>
              <p className="text-safari-200 text-sm md:text-base leading-relaxed">We respect the wildlife and adhere to park rules to preserve nature.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
