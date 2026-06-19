export const PACKAGE_INFO = {
    'cooking-class': {
        name: 'Organic Cooking Experience',
        price: 22,
        duration: '4-5 Hours',
        advance: 5,
        visible: true,
    },
    'village-tour': {
        name: 'Sigiriya Village Tour',
        price: 22,
        duration: '4-5 Hours',
        advance: 5,
        visible: true,
    },
    'bicycle-rent': {
        name: 'Bicycle Rent',
        price: 5,
        duration: 'Flexible',
        advance: 5,
        visible: true,
    },
};

/** Safari: USD per person when group size exceeds 3 (4th and 5th person). */
export const SAFARI_EXTRA_PERSON_USD = 5;

/** Safari: max group size. */
export const SAFARI_MAX_GROUP_SIZE = 5;

/** Safari: USD per extra hour per jeep. */
export const EXTRA_HOUR_PRICE_USD = 16;

/** Format amount in USD (2 decimals). All pricing is in USD. */
export function formatUsd(amount: number): string {
    return Number(amount).toFixed(2);
}

/** Contact details shown in booking confirmation emails and contact page. */
export const CONTACT_DETAILS = {
    phone: '0707682401',
    phoneHref: '+94707682401',
    email: 'islandsafariessrilanka@gmail.com',
    location: 'Habarana, Sri Lanka',
    locationNote: 'Main Safari Hub',
};

export const TIME_SLOTS = [
    { value: '06:00', label: '6:00 AM - Early Morning' },
    { value: '09:00', label: '9:00 AM - Morning' },
    { value: '14:00', label: '2:00 PM - Afternoon' },
    { value: '16:00', label: '4:00 PM - Late Afternoon' },
];
