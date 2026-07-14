import { CONTACT_DETAILS } from '@/lib/constants';

// Brand palette from tailwind.config.js
const SAFARI_900: [number, number, number] = [30, 43, 27];
const SECONDARY_600: [number, number, number] = [162, 91, 39];
const SECONDARY_300: [number, number, number] = [249, 186, 55];
const SAFARI_100: [number, number, number] = [225, 230, 207];
const CREAM_50: [number, number, number] = [254, 242, 208];
const GRAY_600: [number, number, number] = [90, 90, 90];

export type ReceiptData = {
    referenceNumber: string;
    customerName: string;
    email: string;
    phone?: string;
    itemName: string;
    date: string;
    time?: string | null;
    groupSize?: number | null;
    hotelName?: string | null;
    pickupRequired: boolean;
    entranceNote?: string | null;
    advancePaidUsd: number;
    remainingUsd?: number | null;
    ticketsUsd?: number | null;
};

function money(amount: number): string {
    return `USD ${amount.toFixed(2)}`;
}

export async function downloadBookingReceipt(data: ReceiptData): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 16;
    let y = 0;

    // Header band
    doc.setFillColor(...SAFARI_900);
    doc.rect(0, 0, pageWidth, 34, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('ISLAND', marginX, 15);
    doc.setTextColor(...SECONDARY_300);
    doc.text('SAFARIS', marginX + 22, 15);
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Booking Receipt', marginX, 22);
    doc.setFontSize(8.5);
    doc.text(CONTACT_DETAILS.location, marginX, 28);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Reference', pageWidth - marginX, 15, { align: 'right' });
    doc.setFontSize(13);
    doc.text(data.referenceNumber, pageWidth - marginX, 22, { align: 'right' });

    y = 46;
    doc.setTextColor(20, 20, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Guest details', marginX, y);
    y += 6;
    doc.setDrawColor(225, 225, 225);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 7;

    const guestRows: [string, string][] = [
        ['Name', data.customerName],
        ['Email', data.email],
        ...(data.phone ? [['Phone', data.phone] as [string, string]] : []),
    ];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    for (const [label, value] of guestRows) {
        doc.setTextColor(...GRAY_600);
        doc.text(label, marginX, y);
        doc.setTextColor(20, 20, 20);
        doc.text(value, marginX + 40, y);
        y += 6.5;
    }

    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text('Booking details', marginX, y);
    y += 6;
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 7;

    const bookingRows: [string, string][] = [
        ['Experience', data.itemName],
        ['Date', data.date],
        ...(data.time ? [['Time', data.time] as [string, string]] : []),
        ...(data.groupSize ? [['Group size', `${data.groupSize} ${data.groupSize === 1 ? 'person' : 'people'}`] as [string, string]] : []),
        ['Pickup', data.pickupRequired && data.hotelName ? data.hotelName : 'Not requested'],
    ];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    for (const [label, value] of bookingRows) {
        doc.setTextColor(...GRAY_600);
        doc.text(label, marginX, y);
        doc.setTextColor(20, 20, 20);
        doc.text(value, marginX + 40, y);
        y += 6.5;
    }

    if (data.entranceNote) {
        y += 3;
        const boxHeight = data.time ? 18 : 12;
        doc.setFillColor(...CREAM_50);
        doc.setDrawColor(...SECONDARY_600);
        doc.roundedRect(marginX, y, pageWidth - marginX * 2, boxHeight, 2, 2, 'FD');
        doc.setTextColor(...SECONDARY_600);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.text(data.entranceNote, marginX + 4, y + 7);
        if (data.time) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text(`Please be at the entrance gate by ${data.time}.`, marginX + 4, y + 13);
        }
        y += boxHeight + 8;
    } else {
        y += 6;
    }

    doc.setFillColor(...SAFARI_100);
    const paymentBoxHeight = 8 + (data.ticketsUsd ? 6 : 0) + (data.remainingUsd != null ? 6 : 0);
    doc.roundedRect(marginX, y, pageWidth - marginX * 2, paymentBoxHeight, 2, 2, 'F');
    let py = y + 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...SAFARI_900);
    doc.text('Advance paid', marginX + 4, py);
    doc.text(money(data.advancePaidUsd), pageWidth - marginX - 4, py, { align: 'right' });
    if (data.remainingUsd != null) {
        py += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('Remaining balance (pay at destination)', marginX + 4, py);
        doc.text(money(data.remainingUsd), pageWidth - marginX - 4, py, { align: 'right' });
    }
    if (data.ticketsUsd) {
        py += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('Entrance ticket (approx., paid at park gate)', marginX + 4, py);
        doc.text(money(data.ticketsUsd), pageWidth - marginX - 4, py, { align: 'right' });
    }
    y += paymentBoxHeight + 14;

    doc.setDrawColor(225, 225, 225);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text('Need help?', marginX, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY_600);
    doc.text(`Phone / WhatsApp: ${CONTACT_DETAILS.phone}`, marginX, y);
    y += 5.5;
    doc.text(`Email: ${CONTACT_DETAILS.email}`, marginX, y);
    y += 5.5;
    doc.text(`${CONTACT_DETAILS.location}, ${CONTACT_DETAILS.locationNote}`, marginX, y);

    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('Island Safaris Sri Lanka — this receipt confirms your advance payment only.', marginX, 287);

    doc.save(`island-safaris-receipt-${data.referenceNumber}.pdf`);
}
