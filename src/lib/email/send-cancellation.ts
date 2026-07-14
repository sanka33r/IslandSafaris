'use server';

import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { CONTACT_DETAILS } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);

function formatPackageName(type: string): string {
    return type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export type CancellationPayload = {
    customerName: string;
    activityName: string;
    date: string;
    time: string;
    groupSize: number;
    referenceNumber: string;
    reason: string;
};

function buildCancellationHtml(payload: CancellationPayload): string {
    const fromEmail = process.env.BUSINESS_EMAIL || CONTACT_DETAILS.email;
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Cancelled - Island Safaris</title>
</head>
<body style="margin:0; padding:0; font-family: system-ui, -apple-system, sans-serif; background:#f5f5f5;">
  <div style="max-width:560px; margin:0 auto; padding:24px;">
    <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06); border:1px solid #eee;">
      <div style="background:#7a1f1f; color:#fff; padding:24px; text-align:center;">
        <h1 style="margin:0; font-size:24px;">Booking Cancelled</h1>
        <p style="margin:8px 0 0; opacity:0.9; font-size:14px;">Island Safaris Sri Lanka</p>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 20px; color:#333;">Dear ${payload.customerName},</p>
        <p style="margin:0 0 20px; color:#555; line-height:1.5;">We're sorry to let you know that your booking below has been cancelled by our team.</p>

        <div style="background:#7a1f1f; color:#fff; padding:16px; border-radius:12px; text-align:center; margin-bottom:24px;">
          <div style="font-size:12px; opacity:0.8; margin-bottom:4px;">Reference number</div>
          <div style="font-size:22px; font-weight:bold; letter-spacing:2px; font-family:monospace;">${payload.referenceNumber}</div>
        </div>

        <h2 style="margin:0 0 12px; font-size:18px; color:#1a3d2e;">Booking details</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Activity</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${payload.activityName}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Date</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.date}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Time</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.time}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Group size</td><td style="padding:8px 0; text-align:right;">${payload.groupSize} ${payload.groupSize === 1 ? 'person' : 'people'}</td></tr>
        </table>

        <div style="margin-top:20px; padding:14px 16px; background:#fdf0f0; border:1px solid #f0c0c0; border-radius:10px;">
          <p style="margin:0; font-size:13px; font-weight:600; color:#7a1f1f;">Reason for cancellation</p>
          <p style="margin:6px 0 0; font-size:14px; color:#5a2020; line-height:1.5;">${payload.reason}</p>
        </div>

        <div style="margin-top:28px; padding-top:20px; border-top:1px solid #eee;">
          <h2 style="margin:0 0 12px; font-size:18px; color:#1a3d2e;">Questions?</h2>
          <p style="margin:0 0 8px; font-size:14px; color:#555;">If you have any questions about this cancellation, or would like to rebook, please get in touch:</p>
          <ul style="margin:0; padding:0 0 0 20px; font-size:14px; color:#333; line-height:1.8;">
            <li><strong>Phone / WhatsApp:</strong> ${CONTACT_DETAILS.phone}</li>
            <li><strong>Email:</strong> <a href="mailto:${CONTACT_DETAILS.email}" style="color:#1a5c3e;">${CONTACT_DETAILS.email}</a></li>
            <li><strong>Location:</strong> ${CONTACT_DETAILS.location} — ${CONTACT_DETAILS.locationNote}</li>
          </ul>
          <p style="margin:16px 0 0; font-size:14px;"><a href="https://www.islandsafarisl.com/contact" style="color:#1a5c3e; font-weight:600;">View contact page →</a></p>
        </div>
      </div>
      <div style="padding:16px 24px; background:#f9f9f9; font-size:12px; color:#666; text-align:center;">
        Island Safaris — Safari experiences in Sri Lanka
        <p style="margin:8px 0 0;">This is an automated email, please do not reply directly to this message.</p>
      </div>
    </div>
  </div>
</body>
</html>
`.trim();
}

/**
 * Sends a booking cancellation email to the customer, including the reason
 * provided by the admin. Call this whenever a booking's status is set to 'cancelled'.
 */
export async function sendBookingCancellationEmail(bookingId: string, reason: string): Promise<{ success: boolean; error?: string }> {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return { success: false, error: 'Email not configured' };
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
        .from('bookings')
        .select('*, destinations(name)')
        .eq('id', bookingId)
        .single();

    if (bookingError || !booking) {
        console.error('Failed to fetch booking for cancellation email:', bookingError);
        return { success: false, error: 'Booking not found' };
    }

    if (!booking.email) {
        return { success: false, error: 'No customer email on file' };
    }

    const activityName = booking.package_type
        ? formatPackageName(booking.package_type)
        : booking.destinations?.name || 'Safari';

    const referenceNumber = `IS-${bookingId.substring(0, 8).toUpperCase()}`;
    const fromEmail = process.env.BUSINESS_EMAIL || CONTACT_DETAILS.email;

    const payload: CancellationPayload = {
        customerName: booking.customer_name,
        activityName,
        date: booking.date,
        time: booking.time,
        groupSize: booking.group_size,
        referenceNumber,
        reason: reason.trim() || 'Not specified',
    };

    const { error: sendError } = await resend.emails.send({
        from: `Island Safaris <${fromEmail}>`,
        to: [booking.email],
        replyTo: fromEmail,
        subject: `Booking cancelled — ${referenceNumber}`,
        html: buildCancellationHtml(payload),
    });

    if (sendError) {
        console.error('Resend error:', sendError);
        return { success: false, error: sendError.message };
    }
    return { success: true };
}
