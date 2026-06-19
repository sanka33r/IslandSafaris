import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import JsonLd from '@/components/seo/JsonLd';
import { localBusinessSchema } from '@/lib/schema';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd data={localBusinessSchema()} />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-20">
                    {children}
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </>
    );
}
