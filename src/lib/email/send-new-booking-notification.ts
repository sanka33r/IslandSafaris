'use server';

import { Resend } from 'resend';
import { CONTACT_DETAILS } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_NOTIFICATION_EMAIL = process.env.OWNER_NOTIFICATION_EMAIL || CONTACT_DETAILS.email;

export type NewBookingNotificationPayload = {
    bookingId: string;
    referenceNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    activityName: string;
    date: string;
    time: string;
    groupSize: number;
    totalUsd: number;
    hotelName?: string | null;
    pickupRequired: boolean;
};

function buildNewBookingHtml(payload: NewBookingNotificationPayload): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Placed - Island Safaris</title>
</head>
<body style="margin:0; padding:0; font-family: system-ui, -apple-system, sans-serif; background:#f5f5f5;">
  <div style="max-width:560px; margin:0 auto; padding:24px;">
    <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06); border:1px solid #eee;">
      <div style="background:#1a3d2e; color:#fff; padding:24px; text-align:center;">
        <h1 style="margin:0; font-size:24px;">New Booking Placed</h1>
        <p style="margin:8px 0 0; opacity:0.9; font-size:14px;">A customer just started a booking</p>
      </div>
      <div style="padding:24px;">
        <div style="background:#1a3d2e; color:#fff; padding:16px; border-radius:12px; text-align:center; margin-bottom:24px;">
          <div style="font-size:12px; opacity:0.8; margin-bottom:4px;">Reference number</div>
          <div style="font-size:22px; font-weight:bold; letter-spacing:2px; font-family:monospace;">${payload.referenceNumber}</div>
        </div>

        <h2 style="margin:0 0 12px; font-size:18px; color:#1a3d2e;">Customer details</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333; margin-bottom:20px;">
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Name</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${payload.customerName}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Email</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.customerEmail}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0; text-align:right;">${payload.customerPhone}</td></tr>
        </table>

        <h2 style="margin:0 0 12px; font-size:18px; color:#1a3d2e;">Booking details</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Activity</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right; font-weight:600;">${payload.activityName}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Date</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.date}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Time</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.time}</td></tr>
          <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Group size</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.groupSize} ${payload.groupSize === 1 ? 'person' : 'people'}</td></tr>
          ${payload.pickupRequired && payload.hotelName ? `<tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#666;">Pickup</td><td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${payload.hotelName}</td></tr>` : ''}
          <tr><td style="padding:8px 0; color:#666;">Total (est.)</td><td style="padding:8px 0; text-align:right; font-weight:700;">USD ${Number(payload.totalUsd).toFixed(2)}</td></tr>
        </table>

        <div style="margin-top:20px; padding:14px 16px; background:#fff8e6; border:1px solid #f0dca0; border-radius:10px;">
          <p style="margin:0; font-size:13px; color:#7a5c00;">This booking is not yet paid/confirmed. Check the admin dashboard for its current status.</p>
        </div>

        <p style="margin:20px 0 0; font-size:14px;"><a href="https://www.islandsafarisl.com/admin/bookings" style="color:#1a5c3e; font-weight:600;">Open admin bookings →</a></p>
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
 * Notifies the site owner that a customer has just placed a booking
 * (before payment/confirmation). Call this right after the booking row
 * is inserted.
 */
export async function sendNewBookingNotification(payload: NewBookingNotificationPayload): Promise<{ success: boolean; error?: string }> {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return { success: false, error: 'Email not configured' };
    }

    const fromEmail = process.env.BUSINESS_EMAIL || CONTACT_DETAILS.email;
    const { error: sendError } = await resend.emails.send({
        from: `Island Safaris <${fromEmail}>`,
        to: [OWNER_NOTIFICATION_EMAIL],
        subject: `New booking placed — ${payload.referenceNumber}`,
        html: buildNewBookingHtml(payload),
    });

    if (sendError) {
        console.error('Resend error:', sendError);
        return { success: false, error: sendError.message };
    }
    return { success: true };
}
