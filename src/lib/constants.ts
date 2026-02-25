export const PACKAGE_INFO = {
    'cooking-class': {
        name: 'Organic Cooking Experience',
        price: 22,
        duration: '4-5 Hours',
        advance: 5,
    },
    'village-tour': {
        name: 'Sigiriya Village Tour',
        price: 22,
        duration: '4-5 Hours',
        advance: 5,
    },
    'bicycle-rent': {
        name: 'Bicycle Rent',
        price: 5,
        duration: 'Flexible',
        advance: 5,
    },
};

/** LKR to USD - used to display safari jeep/ticket prices in USD. Update as needed. */
export const LKR_TO_USD_RATE = 310;

/** Convert LKR amount to USD display string (2 decimals). */
export function lkrToUsd(lkr: number): string {
    return (lkr / LKR_TO_USD_RATE).toFixed(2);
}

export const TIME_SLOTS = [
    { value: '06:00', label: '6:00 AM - Early Morning' },
    { value: '09:00', label: '9:00 AM - Morning' },
    { value: '14:00', label: '2:00 PM - Afternoon' },
    { value: '16:00', label: '4:00 PM - Late Afternoon' },
];
