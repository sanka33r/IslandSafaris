import { z } from 'zod';

export const bookingSchema = z.object({
    destination_id: z.string().uuid({ message: "Please select a valid destination" }),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    group_size: z.coerce.number().min(1, "At least 1 person is required").max(20, "For groups > 20, please contact us directly"),
    pickup_required: z.boolean().default(false),
    hotel_name: z.string().optional(),

    // Conditionally require hotel_name if pickup is required - handled in superRefine or UI
    // Zod doesn't easily do conditional fields without superRefine

    extra_hours: z.coerce.number().min(0).default(0),

    customer_name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    country_code: z.string().default('+94'),
    phone: z.string().min(10, "Valid phone number is required"),
    passport_number: z.string().optional(),
    pickup_location: z.string().optional(),
    promo_code: z.string().optional(),
    message: z.string().optional(),
}).refine((data) => {
    if (data.pickup_required && !data.hotel_name) return false;
    return true;
}, {
    message: "Hotel name is required for pickup",
    path: ["hotel_name"],
});

export type BookingFormData = z.infer<typeof bookingSchema>;
