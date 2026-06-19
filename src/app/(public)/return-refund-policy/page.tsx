import { buildMetadata } from '@/lib/seo';
import PolicyPageShell from '@/components/legal/PolicyPageShell';

export const metadata = buildMetadata({
    title: 'Return & Refund Policy',
    description: 'Return and refund policy for Island Safaris Sri Lanka bookings and advance booking deposits.',
    path: '/return-refund-policy',
});

export default function ReturnRefundPolicyPage() {
    return (
        <PolicyPageShell
            title="Return & Refund Policy"
            description="Clear booking deposit, cancellation, amendment, and refund terms for Island Safaris Sri Lanka experiences."
        >
            <header>
                <p>
                    Thank you for choosing Island Safaris Sri Lanka. We provide booking services for safari experiences in Sigiriya, Sri Lanka, as well as related activities including cooking classes, Ayurvedic spa treatments, bicycle rentals, village experiences, and other local attractions.
                </p>
            </header>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">1. Booking Deposit</h2>
                        <p>
                            To confirm and secure a reservation, guests are required to pay an advance booking deposit at the time of booking.
                        </p>
                        <p>
                            This deposit is used immediately to reserve safari vehicles, guides, operators, activity providers, and time slots specifically for your booking. As a result, the deposit is strictly non-refundable under all circumstances once a booking has been confirmed.
                        </p>
                        <p>
                            By making a booking with Island Safaris Sri Lanka, you expressly acknowledge and agree that the advance booking deposit will not be refunded for any reason, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Illness, injury, or medical emergencies;</li>
                            <li>Flight delays, cancellations, or missed connections;</li>
                            <li>Visa issues or travel restrictions;</li>
                            <li>Changes to travel plans;</li>
                            <li>Personal emergencies;</li>
                            <li>Adverse weather conditions affecting your travel plans;</li>
                            <li>Failure to attend the booked activity;</li>
                            <li>Late arrival or early departure; or</li>
                            <li>Any other circumstance beyond your control or our control.</li>
                        </ul>
                        <p>
                            We strongly recommend that guests obtain comprehensive travel insurance to cover unforeseen events that may affect their travel plans.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">2. Balance Payment</h2>
                        <p>
                            Island Safaris Sri Lanka only collects an advance booking deposit. The remaining balance is generally paid directly to the safari operator or activity provider upon arrival or before participation in the booked experience, as stated in the booking confirmation.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">3. Guest Cancellations</h2>
                        <p>
                            If a guest cancels a confirmed booking, the advance booking deposit will be retained in full and will not be refunded, credited, or transferred to another booking unless otherwise agreed in writing by Island Safaris Sri Lanka.
                        </p>
                        <p>
                            Any unpaid balance due for the booking will generally not be charged if the cancellation occurs 7 days before arrival.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">4. Booking Amendments</h2>
                        <p>
                            Requests to change dates, times, or participant details are subject to availability and approval by the relevant service provider.
                        </p>
                        <p>
                            Island Safaris Sri Lanka is under no obligation to approve requested changes, and additional charges may apply.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">5. Operator Cancellations</h2>
                        <p>
                            If a safari or activity is cancelled by the operator due to safety concerns, government restrictions, severe weather, equipment failure, or other operational reasons, we will attempt to offer an alternative date, time, comparable experience, or refund based on the situation and date. Advance booking deposits remain non-refundable unless otherwise agreed in writing by Island Safaris Sri Lanka.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">6. Third-Party Providers</h2>
                        <p>
                            Island Safaris Sri Lanka acts as a booking platform and coordinator for independent safari operators and activity providers. Certain experiences may be subject to additional terms and conditions imposed by the respective provider.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">7. Contact Information</h2>
                        <p>
                            Island Safaris Sri Lanka<br />
                            Email: <a className="text-secondary-700 font-semibold" href="mailto:islandsafariessrilanka@gmail.com">islandsafariessrilanka@gmail.com</a><br />
                            Phone: <a className="text-secondary-700 font-semibold" href="tel:+94707682401">0707682401</a>
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-safari-900">Acknowledgement</h2>
                        <p>
                            By making a booking through Island Safaris Sri Lanka, you confirm that you have read, understood, and agreed to this Return & Refund Policy and acknowledge that all advance booking deposits are strictly non-refundable under any circumstances.
                        </p>
                    </section>
        </PolicyPageShell>
    );
}
