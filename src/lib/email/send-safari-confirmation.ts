'use server';

import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { CONTACT_DETAILS, EXTRA_HOUR_PRICE_USD, SAFARI_EXTRA_PERSON_USD, SAFARI_MAX_GROUP_SIZE } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);

function formatUsd(amount: number): string {
    return Number(amount).toFixed(2);
}

export type SafariConfirmationPayload = {
    bookingId: string;
    customerName: string;
    customerEmail: string;
    destinationName: string;
    date: string;
    time: string;
    groupSize: number;
    totalUsd: number;
    ticketsUsd: number | null;
    referenceNumber: string;
    hotelName?: string | null;
    pickupRequired: boolean;
};

function buildConfirmationHtml(payload: SafariConfirmationPayload): string {
    const timeFormatted = payload.time === '06:00' ? '6:00 AM (Morning)' : payload.time === '14:00' ? '2:00 PM (Evening)' : payload.time;
    const fromEmail = process.env.BUSINESS_EMAIL || CONTACT_DETAILS.email;
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - Island Safaris</title>
</head>
<body style="margin:0; padding:0; font-family: system-ui, -apple-system, sans-serif; background:#f5f5f5;">
  <div style="max-width:560px; margin:0 auto; padding:24px;">
    <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06); border:1px solid #eee;">
      <div style="background:#1a3d2e; color:#fff; padding:24px; text-align:center;">
        <h1 style="margin:0; font-size:24px;">Booking Confirmed!</h1>
        <p style="margin:8px 0 0; opacity:0.9; font-size:14px;">Island Safaris Sri Lanka</p>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 20px; color:#333;">Dear ${payload.customerName},</p>
        <p style="margin:0 0 20px; color:#555; line-height:1.5;">Thank you for your advance payment. Your safari booking is confirmed. Please find your booking details below.</p>

        <div style="background:#1a3d2e; color:#fff; padding:16px; border-radius:12px; text-align:center; margin-bottom:24px;">
          <div style="font-size:12px; opacity:0.8; margin-bottom:4px;">Reference number</div>
          <div style="font-size:22px; font-weight:bold; letter-spacing:2px; font-family:monospace;">${payload.referenceNumber}</div>
          <div style="font-size:12px; opacity:0.8; margin-top:6px;">Please keep this for your records.</div>
        </div>

        <h2 style="margin:0 0 12px; font-size:18px; color:#1a3d2e;">Booking details</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Destination</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${payload.destinationName}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Date</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.date}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Time</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${timeFormatted}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Group size</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.groupSize} ${payload.groupSize === 1 ? 'person' : 'people'}</td></tr>
          ${payload.pickupRequired && payload.hotelName ? `<tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Pickup</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.hotelName}</td></tr>` : ''}
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Remaining balance (pay at destination)</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right; font-weight:700;">USD ${formatUsd(payload.totalUsd)}</td></tr>
          ${payload.ticketsUsd != null && payload.ticketsUsd > 0 ? `<tr><td style="padding:8px 0; color:#666;">Entrance ticket (approx., paid at park gate)</td><td style="padding:8px 0; text-align:right;">USD ${formatUsd(payload.ticketsUsd)}</td></tr>` : ''}
        </table>

        <div style="margin-top:28px; padding-top:20px; border-top:1px solid #eee;">
          <h2 style="margin:0 0 12px; font-size:18px; color:#1a3d2e;">Contact us</h2>
          <p style="margin:0 0 8px; font-size:14px; color:#555;">If you have any questions or need to change your booking, please get in touch:</p>
          <ul style="margin:0; padding:0 0 0 20px; font-size:14px; color:#333; line-height:1.8;">
            <li><strong>Phone / WhatsApp:</strong> ${CONTACT_DETAILS.phone}</li>
            <li><strong>Email:</strong> <a href="mailto:${CONTACT_DETAILS.email}" style="color:#1a5c3e;">${CONTACT_DETAILS.email}</a></li>
            <li><strong>Location:</strong> ${CONTACT_DETAILS.location} — ${CONTACT_DETAILS.locationNote}</li>
          </ul>
          <p style="margin:16px 0 0; font-size:14px;"><a href="https://islandsafaris.com/contact" style="color:#1a5c3e; font-weight:600;">View contact page →</a></p>
        </div>
      </div>
      <div style="padding:16px 24px; background:#f9f9f9; font-size:12px; color:#666; text-align:center;">
        Island Safaris — Safari experiences in Sri Lanka
      </div>
    </div>
  </div>
</body>
</html>
`.trim();
}

/**
 * Sends a safari booking confirmation email to the customer.
 * Call this after payment is captured (e.g. from capture-order API).
 */
export async function sendSafariBookingConfirmation(bookingId: string): Promise<{ success: boolean; error?: string }> {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return { success: false, error: 'Email not configured' };
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

    if (bookingError || !booking) {
        console.error('Failed to fetch booking for email:', bookingError);
        return { success: false, error: 'Booking not found' };
    }

    // Only send for safari bookings (have destination_id, no package_type)
    if (booking.package_type || !booking.destination_id) {
        return { success: true }; // Not a safari booking; skip email without failing
    }

    const { data: destRow } = await supabaseAdmin
        .from('destinations')
        .select('name, vehicle_price_up_to_3, ticket_price, ticket_pricing_type')
        .eq('id', booking.destination_id)
        .single();

    const destinationName = destRow?.name ?? 'Safari';

    const vehicleCount = Math.ceil(booking.group_size / SAFARI_MAX_GROUP_SIZE);
    const extraPersonCount = Math.max(0, booking.group_size - 3);
    const vehicleCost = destRow ? vehicleCount * destRow.vehicle_price_up_to_3 : 0;
    const extraPersonCost = extraPersonCount * SAFARI_EXTRA_PERSON_USD;
    const totalUsd = vehicleCost + (booking.extra_hours || 0) * EXTRA_HOUR_PRICE_USD * vehicleCount + extraPersonCost;
    const ticketsUsd = destRow
        ? destRow.ticket_pricing_type === 'per_person'
            ? destRow.ticket_price * booking.group_size
            : destRow.ticket_price
        : null;

    const referenceNumber = `IS-${bookingId.substring(0, 8).toUpperCase()}`;
    const payload: SafariConfirmationPayload = {
        bookingId,
        customerName: booking.customer_name,
        customerEmail: booking.email,
        destinationName,
        date: booking.date,
        time: booking.time,
        groupSize: booking.group_size,
        totalUsd,
        ticketsUsd: ticketsUsd ?? null,
        referenceNumber,
        hotelName: booking.hotel_name ?? null,
        pickupRequired: booking.pickup_required ?? false,
    };

    const fromEmail = process.env.BUSINESS_EMAIL || CONTACT_DETAILS.email;
    const { error: sendError } = await resend.emails.send({
        from: `Island Safaris <${fromEmail}>`,
        to: [booking.email],
        replyTo: fromEmail,
        subject: `Safari booking confirmed — ${referenceNumber}`,
        html: buildConfirmationHtml(payload),
    });

    if (sendError) {
        console.error('Resend error:', sendError);
        return { success: false, error: sendError.message };
    }
    return { success: true };
}
