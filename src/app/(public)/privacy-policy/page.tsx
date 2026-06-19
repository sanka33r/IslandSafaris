import { buildMetadata } from '@/lib/seo';
import PolicyPageShell from '@/components/legal/PolicyPageShell';

export const metadata = buildMetadata({
    title: 'Privacy Policy',
    description: 'Privacy policy for Island Safaris Sri Lanka booking, payment, and customer communication services.',
    path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
    return (
        <PolicyPageShell
            title="Privacy Policy"
            description="How Island Safaris Sri Lanka collects, uses, protects, and shares booking and payment-related customer information."
        >
            <header>
                <p>
                    Island Safaris Sri Lanka respects your privacy. This Privacy Policy explains how we collect, use, and protect information submitted through our website, booking forms, payment flows, and customer support channels.
                </p>
            </header>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Information We Collect</h2>
                        <p>
                            We may collect your name, email address, phone number, travel date, pickup details, passport number if provided, booking preferences, special requests, payment status, and messages you send to us.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">How We Use Information</h2>
                        <p>
                            We use your information to process bookings, coordinate safari vehicles and activity providers, send booking confirmations, provide customer support, manage payments, prevent fraud, and improve our services.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Payments</h2>
                        <p>
                            Online payments are processed by third-party payment gateways such as PayPal and PayHere. We do not store your full card number, CVV, or sensitive payment credentials on our website.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Sharing Information</h2>
                        <p>
                            We may share necessary booking details with safari operators, guides, transport providers, activity providers, payment processors, email service providers, or legal authorities where required. We do not sell your personal information.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Data Security</h2>
                        <p>
                            We take reasonable steps to protect your information from unauthorized access, misuse, loss, or disclosure. However, no internet-based service can be guaranteed to be completely secure.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Cookies & Analytics</h2>
                        <p>
                            Our website may use cookies or similar technologies to support site functionality, improve user experience, and understand website performance.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, contact us at <a className="text-secondary-700 font-semibold" href="mailto:islandsafariessrilanka@gmail.com">islandsafariessrilanka@gmail.com</a> or <a className="text-secondary-700 font-semibold" href="tel:+94707682401">0707682401</a>.
                        </p>
                    </section>
        </PolicyPageShell>
    );
}
