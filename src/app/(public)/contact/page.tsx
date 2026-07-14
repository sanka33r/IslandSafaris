import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, Clock3, ShieldCheck, ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import { CONTACT_DETAILS } from '@/lib/constants';

export const metadata = buildMetadata({
    title: 'Contact Island Safaris Sri Lanka',
    description: 'Talk to our local safari team for quick help with bookings, timing, pickup planning, and custom experiences in Sigiriya.',
    path: '/contact',
});

export default function ContactPage() {
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
        ]),
        faqSchema([
            {
                question: 'How quickly can I get a reply?',
                answer: 'Our team usually responds quickly through phone, WhatsApp, or email for booking and tour support.',
            },
            {
                question: 'Can I customize my safari plan?',
                answer: 'Yes. We can help tailor timings, destination choice, and pickup preferences based on your travel schedule.',
            },
        ]),
    ];

    return (
        <div className="bg-safari-50 min-h-screen py-16">
            {schemas.map((schema, index) => (
                <JsonLd key={`contact-schema-${index}`} data={schema} />
            ))}
            <div className="container mx-auto px-4">
                <BreadcrumbNav
                    className="mb-6"
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Contact' },
                    ]}
                />
                <section className="relative overflow-hidden rounded-3xl bg-safari-900 px-6 py-12 sm:px-10 sm:py-14 mb-8 text-white shadow-xl">
                    <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-secondary-500/25 blur-3xl" />
                    <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />
                    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-secondary-200 mb-5">
                                <MessageCircle size={16} />
                                Local support in Sri Lanka
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Island Safaris</h1>
                            <p className="text-safari-200 text-lg leading-relaxed max-w-3xl">
                                Have questions? Our local team can help with safari timing, pickup planning, payment questions, and custom experiences around Sigiriya.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-secondary-500/20 flex items-center justify-center text-secondary-200">
                                    <Clock3 size={20} />
                                </div>
                                <div>
                                    <p className="font-bold">Fast Booking Help</p>
                                    <p className="text-sm text-safari-200">Usually quick replies by phone or WhatsApp.</p>
                                </div>
                            </div>
                            <Link
                                href="/booking"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary-600 px-5 py-3 font-bold text-white transition-colors hover:bg-secondary-500"
                            >
                                Start Booking
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <a href={`tel:${CONTACT_DETAILS.phoneHref}`} className="group bg-white p-6 rounded-3xl shadow-sm border border-safari-100 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="bg-secondary-100 p-3 rounded-2xl text-secondary-600 w-fit mb-5 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                            <Phone size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-safari-900 mb-2">Phone & WhatsApp</h2>
                        <p className="text-safari-700 font-semibold">{CONTACT_DETAILS.phone}</p>
                        <p className="text-sm text-safari-500 mt-2">Best for urgent booking questions and same-day support.</p>
                    </a>

                    <a href={`mailto:${CONTACT_DETAILS.email}`} className="group bg-white p-6 rounded-3xl shadow-sm border border-safari-100 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="bg-secondary-100 p-3 rounded-2xl text-secondary-600 w-fit mb-5 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                            <Mail size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-safari-900 mb-2">Email</h2>
                        <p className="text-safari-700 font-semibold break-all">{CONTACT_DETAILS.email}</p>
                        <p className="text-sm text-safari-500 mt-2">Send booking details, questions, or payment gateway requests.</p>
                    </a>

                    <a href={CONTACT_DETAILS.mapUrl} target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-3xl shadow-sm border border-safari-100 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="bg-secondary-100 p-3 rounded-2xl text-secondary-600 w-fit mb-5 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-safari-900 mb-2">Location</h2>
                        <p className="text-safari-700 font-semibold">{CONTACT_DETAILS.location}</p>
                        <p className="text-sm text-safari-500 mt-2">{CONTACT_DETAILS.locationNote}</p>
                    </a>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl mx-auto">
                    <div className="bg-white rounded-3xl border border-safari-100 shadow-sm p-6 sm:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-secondary-100 rounded-2xl flex items-center justify-center text-secondary-700 shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-safari-900 mb-2">How We Can Help</h2>
                                <p className="text-safari-600">
                                    Tell us your travel date, hotel or pickup area, group size, and preferred safari time. We will help you choose the best park based on seasonal elephant movement and availability.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-safari-700">
                            <div className="rounded-2xl bg-safari-50 border border-safari-100 p-4">Safari timing and destination guidance</div>
                            <div className="rounded-2xl bg-safari-50 border border-safari-100 p-4">Pickup planning from Sigiriya and nearby areas</div>
                            <div className="rounded-2xl bg-safari-50 border border-safari-100 p-4">Cooking class, village tour, and bicycle rental support</div>
                            <div className="rounded-2xl bg-safari-50 border border-safari-100 p-4">Payment, deposit, and booking confirmation help</div>
                        </div>
                    </div>

                    <div className="bg-secondary-50 rounded-3xl border border-secondary-100 p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-safari-900 mb-3">Ready to Book?</h2>
                        <p className="text-safari-700 mb-6">
                            Secure your safari date online with a small advance payment. The remaining balance is paid at the destination.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link href="/booking" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-600 px-6 py-3 font-bold text-white transition-colors hover:bg-secondary-500">
                                Book a Safari
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href={`https://wa.me/${CONTACT_DETAILS.phoneHref.replace('+', '')}?text=${encodeURIComponent('Hi! I need help planning my Island Safaris booking.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-safari-900 border border-secondary-100 transition-colors hover:bg-safari-50"
                            >
                                Message on WhatsApp
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
