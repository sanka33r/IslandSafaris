import Link from 'next/link';
import { FileText, Mail, Phone, ShieldCheck } from 'lucide-react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import { CONTACT_DETAILS } from '@/lib/constants';

interface PolicyPageShellProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function PolicyPageShell({ title, description, children }: PolicyPageShellProps) {
    return (
        <div className="bg-safari-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <BreadcrumbNav
                    className="mb-6"
                    items={[
                        { label: 'Home', href: '/' },
                        { label: title },
                    ]}
                />

                <section className="relative overflow-hidden rounded-3xl bg-safari-900 px-6 py-12 sm:px-10 sm:py-14 mb-8 text-white shadow-xl">
                    <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-secondary-500/25 blur-3xl" />
                    <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />
                    <div className="relative max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-secondary-200 mb-5">
                            <ShieldCheck size={16} />
                            Island Safaris Sri Lanka
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                        <p className="text-safari-200 text-lg leading-relaxed">{description}</p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-6xl mx-auto">
                    <article className="bg-white rounded-3xl border border-safari-100 shadow-sm p-6 sm:p-10 space-y-8 text-safari-700 leading-relaxed">
                        {children}
                    </article>

                    <aside className="space-y-4">
                        <div className="bg-white rounded-3xl border border-safari-100 shadow-sm p-6">
                            <div className="w-12 h-12 bg-secondary-100 rounded-2xl flex items-center justify-center text-secondary-700 mb-4">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-safari-900 mb-2">Payment Review Pages</h2>
                            <p className="text-sm text-safari-600 mb-4">
                                These pages explain booking deposits, customer privacy, and business terms for online payments.
                            </p>
                            <div className="flex flex-col gap-2 text-sm font-semibold">
                                <Link href="/return-refund-policy" className="text-secondary-700 hover:text-secondary-800">Return & Refund Policy</Link>
                                <Link href="/privacy-policy" className="text-secondary-700 hover:text-secondary-800">Privacy Policy</Link>
                                <Link href="/terms-and-conditions" className="text-secondary-700 hover:text-secondary-800">Terms & Conditions</Link>
                            </div>
                        </div>

                        <div className="bg-secondary-50 rounded-3xl border border-secondary-100 p-6">
                            <h2 className="text-xl font-bold text-safari-900 mb-4">Need Help?</h2>
                            <div className="space-y-3 text-sm">
                                <a href={`tel:${CONTACT_DETAILS.phoneHref}`} className="flex items-center gap-3 text-safari-700 hover:text-secondary-700">
                                    <Phone size={16} className="text-secondary-600" />
                                    {CONTACT_DETAILS.phone}
                                </a>
                                <a href={`mailto:${CONTACT_DETAILS.email}`} className="flex items-center gap-3 text-safari-700 hover:text-secondary-700 break-all">
                                    <Mail size={16} className="text-secondary-600 shrink-0" />
                                    {CONTACT_DETAILS.email}
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
