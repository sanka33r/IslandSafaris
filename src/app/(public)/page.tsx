import Link from 'next/link';
import { ArrowRight, Star, Shield, Leaf, MapPin, Clock, Camera, ChevronRight } from 'lucide-react';
import { getDestinationsWithImages } from '@/lib/queries/destinations';
import { getApprovedReviews } from '@/lib/queries/reviews';
import HeroSection from '@/components/home/HeroSection';
import ReviewList from '@/components/reviews/ReviewList';

export const revalidate = 3600;

export default async function HomePage() {
  const [destinations, reviews] = await Promise.all([
    getDestinationsWithImages(),
    getApprovedReviews(), // all approved reviews for home
  ]);

  return (
    <>
      <HeroSection />

      {/* About Section - The Rhythm of the Wild */}
      <section className="py-12 md:py-16 bg-secondary-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Stack - The Rhythm of the Wild (Cloudinary) */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                    <img
                      src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045462/IMG_6163.JPG_tewuwz.jpg"
                      alt="Safari wildlife - The Rhythm of the Wild"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                    <img
                      src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045450/IMG_6181_xxilcs.avif"
                      alt="Elephant corridor - The Rhythm of the Wild"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                    <img
                      src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045443/IMG_6164_klnyzg.webp"
                      alt="Safari experience - The Rhythm of the Wild"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                    <img
                      src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045344/IMG_6203.JPG_nh8v7m.jpg"
                      alt="Wildlife in the wild - The Rhythm of the Wild"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-safari-100">
                <div className="text-sm font-semibold text-safari-900">Elephant Corridor</div>
                <div className="text-xs text-safari-500">Minneriya • Kaudulla • Hurulu</div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-3 bg-secondary-100 px-4 py-2 rounded-full">
                The Migration Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4 leading-tight">
                The Rhythm of the Wild
              </h2>
              <p className="text-lg text-safari-600 leading-relaxed mb-4">
                Welcome to the heart of the Cultural Triangle, where the ancient pulse of nature dictates the journey.
                Unlike ordinary safari operators, we specialize in the <strong>Minneriya-Kaudulla-Hurulu Corridor</strong>—a
                vast, interconnected wilderness where hundreds of Asian elephants roam freely.
              </p>
              <div className="rounded-3xl bg-white border border-safari-100 p-5 md:p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-safari-900 mb-2">Why Book With Us?</h3>
                <p className="text-safari-600 leading-relaxed mb-4">
                  Nature doesn&apos;t stay in one place, and neither do we. The Great Elephant Gathering is a seasonal masterpiece,
                  and we ensure you&apos;re always in the front row. Our expert guides track the migration daily to bring you
                  exactly where the magic is happening.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all"
                >
                  Learn More About Us <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div>
              <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                Destinations
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-3">Our Safari Parks</h2>
              <p className="text-safari-500 text-lg">Discover the iconic parks of the elephant migration corridor</p>
            </div>
            <Link href="/destinations" className="flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all text-lg">
              View All Parks <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {destinations.slice(0, 3).map((dest, index) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group block rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-safari-100 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] bg-safari-200 overflow-hidden">
                  {dest.images[0] ? (
                    <img
                      src={dest.images[0].secure_url}
                      alt={dest.images[0].alt_text || dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-safari-400 to-safari-600 flex items-center justify-center">
                      <Camera className="text-white/30" size={64} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Peak Season Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-safari-800 text-xs font-bold px-3 py-1.5 rounded-full">
                      <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                      {index === 0 ? 'Aug-Sep' : index === 1 ? 'Oct-Nov' : 'Dec-Jan'}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold text-safari-500 uppercase tracking-wide mb-3">
                    <MapPin size={14} className="text-secondary-600" />
                    <span>National Park</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-safari-900 mb-3 group-hover:text-secondary-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-safari-600 line-clamp-2 text-sm md:text-base mb-5">
                    {dest.summary || dest.description}
                  </p>
                  <div className="flex items-center justify-between text-sm font-semibold text-safari-500 pt-4 border-t border-safari-100">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={16} />
                      {dest.standard_duration_hours} Hours
                    </span>
                    <span className="inline-flex items-center gap-2 text-secondary-600 group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Timeline */}
      <section className="py-20 md:py-28 bg-safari-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary-400 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-900/50 px-4 py-2 rounded-full border border-secondary-700/50">
              The Great Migration
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Follow the Elephants</h2>
            <p className="text-safari-300 text-lg max-w-2xl mx-auto">
              The herds move with the seasons. We know exactly where they&apos;ll be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-700/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                Peak Season
              </div>
              <div className="text-green-400 text-5xl font-bold mb-2">Jul - Sep</div>
              <h3 className="text-2xl font-bold text-white mb-3">Minneriya</h3>
              <p className="text-safari-300 leading-relaxed">
                The legendary gathering peaks here. Up to 300 elephants congregate around the ancient tank as water sources dry up elsewhere.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border border-yellow-700/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 bg-yellow-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                Transition
              </div>
              <div className="text-yellow-400 text-5xl font-bold mb-2">Oct - Nov</div>
              <h3 className="text-2xl font-bold text-white mb-3">Kaudulla</h3>
              <p className="text-safari-300 leading-relaxed">
                As rains fill the tanks, herds migrate north. Kaudulla offers intimate encounters with fewer crowds.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                Winter Haven
              </div>
              <div className="text-blue-400 text-5xl font-bold mb-2">Dec - Jan</div>
              <h3 className="text-2xl font-bold text-white mb-3">Hurulu Eco Park</h3>
              <p className="text-safari-300 leading-relaxed">
                The final leg of the migration. Dense forests create dramatic close encounters in golden morning light.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Sneak Peek */}
      <section className="py-20 md:py-28 bg-[#faf8f4] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-secondary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <span className="text-secondary-600 text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
                Beyond the Safari
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-safari-900">
                Experience The Culture
              </h2>
            </div>
            <Link
              href="/packages"
              className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-500 font-semibold transition-colors"
            >
              View All Experiences
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Organic Cooking',
                tagline: 'Farm to Table',
                price: '22',
                image: 'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.43_PM_bxpezn.jpg',
                href: '/packages/cooking-class',
              },
              {
                title: 'Village Tour',
                tagline: 'Cultural Immersion',
                price: '22',
                image: 'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045164/WhatsApp_Image_2026-02-15_at_12.06.47_PM_aknrgc.jpg',
                href: '/packages/village-tour',
              },
              {
                title: 'Bicycle Rent',
                tagline: 'Explore Freely',
                price: '5',
                image: 'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218312/24ba6f02-8af7-46af-9563-d882218b1916.png',
                href: '/packages/bicycle-rent',
              },
            ].map((pkg) => (
              <Link
                key={pkg.title}
                href={pkg.href}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white/50 text-xs tracking-wider uppercase block mb-1">
                    {pkg.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary-300 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      From <span className="text-lg font-bold text-white">${pkg.price}</span>/person
                    </span>
                    <div className="w-9 h-9 rounded-full border border-white/30 group-hover:border-secondary-400 group-hover:bg-secondary-600 flex items-center justify-center transition-all duration-400">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-secondary-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4">The Island Safaris Difference</h2>
            <p className="text-safari-600 text-lg max-w-2xl mx-auto">
              We&apos;re not just tour operators—we&apos;re passionate naturalists dedicated to authentic wildlife experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 md:p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-safari-100 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary-500/20 group-hover:scale-110 transition-transform">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-safari-900 mb-4">Top Rated Service</h3>
              <p className="text-safari-600 leading-relaxed">
                Consistently rated 5-stars by travelers from around the world for our reliable, friendly, and knowledgeable service.
              </p>
            </div>

            <div className="group p-8 md:p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-safari-100 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-safari-500 to-safari-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-safari-500/20 group-hover:scale-110 transition-transform">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-safari-900 mb-4">Safety First</h3>
              <p className="text-safari-600 leading-relaxed">
                Well-maintained 4x4 jeeps and experienced drivers ensure your safety while navigating the wild terrain.
              </p>
            </div>

            <div className="group p-8 md:p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-safari-100 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                <Leaf size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-safari-900 mb-4">Eco-Conscious</h3>
              <p className="text-safari-600 leading-relaxed">
                We respect the wildlife and strictly adhere to park rules. It&apos;s their home—we&apos;re just the guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
              Traveler Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4">What Our Guests Say</h2>
            <p className="text-safari-600 text-lg max-w-2xl mx-auto">
              Real experiences from visitors who explored the elephant corridor with us.
            </p>
          </div>
          <ReviewList reviews={reviews.slice(0, 6)} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-safari-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-safari-900 via-safari-800 to-safari-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-safari-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Book your safari today and witness nature&apos;s greatest spectacle—the Great Elephant Gathering of Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-secondary-900/50 active:scale-95 inline-flex items-center justify-center gap-3"
            >
              Book Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/20 hover:border-white/40"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
