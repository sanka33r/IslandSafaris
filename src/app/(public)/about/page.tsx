import { Shield, Users, Leaf, Heart } from 'lucide-react';

export const metadata = {
    title: 'About Us | Island Safaris Sri Lanka',
    description: 'Learn about our passion for wildlife and commitment to responsible tourism in Sri Lanka.',
};

export default function AboutPage() {
    const features = [
        { icon: Shield, title: 'Safety First', desc: 'Expert drivers and well-maintained safari jeeps ensure your safety.' },
        { icon: Users, title: 'Expert Guides', desc: 'Our local guides know the parks inside out and track wildlife effectively.' },
        { icon: Leaf, title: 'Eco Friendly', desc: 'We respect nature and adhere to strict park rules to protect wildlife.' },
        { icon: Heart, title: 'Passionate Team', desc: 'We love what we do and want to share the beauty of Sri Lanka with you.' },
    ];

    return (
        <div className="bg-white">
            <div className="relative py-20 bg-safari-900 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-safari-200 text-lg max-w-2xl mx-auto px-4">
                    Your trusted partner for authentic wildlife experiences in Minneriya, Kaudulla, and Hurulu Eco Park.
                </p>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-safari-900 mb-6">Our Story</h2>
                        <p className="text-safari-600 leading-relaxed mb-4">
                            Island Safaris was born from a deep love for Sri Lanka&apos;s wild heart. Based in Habarana,
                            we specialize in private jeep safaris to the region&apos;s most famous national parks.
                        </p>
                        <p className="text-safari-600 leading-relaxed">
                            We believe that a safari is more than just seeing animals; it&apos;s about understanding the ecosystem,
                            respecting the habitats, and creating memories that last a lifetime. Our team of experienced drivers
                            not only navigate the terrain expertely but also serve as knowledgeable guides.
                        </p>
                    </div>
                    <div className="bg-safari-100 rounded-3xl h-80 flex items-center justify-center">
                        {/* Placeholder for About Image */}
                        <span className="text-safari-400 font-semibold">[About Us Image]</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-safari-50 border border-safari-100 text-center">
                            <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <f.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-safari-900 mb-2">{f.title}</h3>
                            <p className="text-safari-600 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
