import { buildMetadata } from '@/lib/seo';
import PolicyPageShell from '@/components/legal/PolicyPageShell';

export const metadata = buildMetadata({
    title: 'Terms & Conditions',
    description: 'Business terms and conditions for Island Safaris Sri Lanka bookings, payments, cancellations, and third-party experiences.',
    path: '/terms-and-conditions',
});

export default function TermsAndConditionsPage() {
    return (
        <PolicyPageShell
            title="Terms & Conditions"
            description="Business terms for Island Safaris Sri Lanka bookings, payments, cancellations, guest responsibilities, and third-party providers."
        >
            <header>
                <p>
                    These Terms & Conditions apply to bookings made with Island Safaris Sri Lanka through our website, phone, WhatsApp, email, or any other communication channel.
                </p>
            </header>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">1. Services</h2>
                        <p>
                            Island Safaris Sri Lanka provides booking coordination for safari experiences in Sigiriya, Sri Lanka, and related local activities including cooking classes, Ayurvedic spa treatments, bicycle rentals, village experiences, and other attractions.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">2. Booking Confirmation</h2>
                        <p>
                            A booking is considered confirmed only after we receive the required advance booking deposit and issue a booking confirmation. Guests are responsible for ensuring that all booking details are accurate before payment.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">3. Payments</h2>
                        <p>
                            Island Safaris Sri Lanka collects an advance booking deposit online. The remaining balance is generally paid directly to the safari operator or activity provider upon arrival or before participation, as stated in the booking confirmation.
                        </p>
                        <p>
                            Online payments may be processed through third-party payment providers such as PayPal or PayHere. Payment approval is subject to the terms and security checks of the relevant payment provider.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">4. Cancellations & Refunds</h2>
                        <p>
                            Advance booking deposits are strictly non-refundable once a booking is confirmed. Please review our Return & Refund Policy for full cancellation and refund terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">5. Guest Responsibilities</h2>
                        <p>
                            Guests must arrive on time, provide accurate contact and pickup information, follow safety instructions, respect wildlife and local communities, and comply with all applicable park, operator, and government rules.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">6. Third-Party Providers</h2>
                        <p>
                            Safari vehicles, guides, activity operators, and related service providers may be independent third parties. Island Safaris Sri Lanka acts as a booking coordinator and is not responsible for circumstances outside our reasonable control.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">7. Changes to Experiences</h2>
                        <p>
                            Safari routes, park selection, timings, wildlife sightings, and activity schedules may change due to weather, animal movement, safety concerns, government restrictions, or operational requirements.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">8. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, Island Safaris Sri Lanka is not liable for indirect losses, missed travel arrangements, personal expenses, injuries, delays, cancellations, or events caused by third-party providers, weather, wildlife, government action, or other circumstances beyond our control.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">9. Contact Information</h2>
                        <p>
                            Island Safaris Sri Lanka<br />
                            Email: <a className="text-secondary-700 font-semibold" href="mailto:islandsafariessrilanka@gmail.com">islandsafariessrilanka@gmail.com</a><br />
                            Phone: <a className="text-secondary-700 font-semibold" href="tel:+94707682401">0707682401</a>
                        </p>
                    </section>
        </PolicyPageShell>
    );
}
