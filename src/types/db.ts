export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Destination {
    id: string
    slug: string
    name: string
    description: string
    summary?: string | null
    sections?: {
        title: string
        body?: string | null
        bullets?: string[] | null
    }[] | null
    seasonal_calendar?: {
        months: string
        note: string
    }[] | null
    tips?: string[] | null
    description_sections?: Json | null
    ticket_price: number
    ticket_pricing_type: 'per_person' | 'flat'
    vehicle_price_up_to_3: number
    standard_duration_hours: number
    active: boolean
    created_at: string
}

export interface Booking {
    id: string
    destination_id?: string | null
    package_type?: 'cooking-class' | 'village-tour' | 'bicycle-rent' | null
    date: string
    time: string
    group_size: number
    pickup_required: boolean
    hotel_name?: string | null
    extra_hours: number
    customer_name: string
    email: string
    phone: string
    passport_number?: string | null
    country?: string | null
    message?: string | null
    special_requests?: string | null
    pickup_location?: string | null
    dropoff_location?: string | null
    promo_code?: string | null
    discount_amount?: number
    advance_payment_amount?: number
    advance_payment_status?: 'pending' | 'paid' | 'refunded'
    status: 'new' | 'confirmed' | 'cancelled'
    created_at: string
}

export interface Review {
    id: string
    destination_id?: string | null
    name: string
    rating: number
    comment: string
    approved: boolean
    created_at: string
}

export interface Image {
    id: string
    destination_id?: string | null
    cloudinary_public_id: string
    secure_url: string
    alt_text?: string | null
    sort_order: number
    created_at: string
}

export interface PromoCode {
    id: string
    code: string
    type: 'fixed' | 'percentage'
    value: number
    min_order_value: number
    max_discount?: number | null
    start_date: string
    end_date: string
    usage_limit?: number | null
    usage_count: number
    status: 'active' | 'inactive'
    applicable_scope: string[]
    created_at: string
}

