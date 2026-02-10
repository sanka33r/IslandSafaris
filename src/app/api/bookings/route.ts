import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const {
            package_type,
            date,
            time,
            group_size,
            customer_name,
            email,
            phone,
            country,
            pickup_required,
            hotel_name,
            special_requests,
            advance_payment_amount,
        } = body;

        if (!package_type || !date || !time || !group_size || !customer_name || !email || !phone || !country) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate package type
        if (!['cooking-class', 'village-tour', 'bicycle-rent'].includes(package_type)) {
            return NextResponse.json(
                { error: 'Invalid package type' },
                { status: 400 }
            );
        }

        // Validate group size
        if (group_size < 1 || group_size > 20) {
            return NextResponse.json(
                { error: 'Group size must be between 1 and 20' },
                { status: 400 }
            );
        }

        // Validate pickup requirements
        if (pickup_required && !hotel_name) {
            return NextResponse.json(
                { error: 'Hotel name is required when pickup is requested' },
                { status: 400 }
            );
        }

        // Insert booking
        const { data: booking, error } = await supabaseAdmin
            .from('bookings')
            .insert({
                package_type,
                date,
                time,
                group_size: parseInt(group_size),
                customer_name,
                email,
                phone,
                country,
                pickup_required: !!pickup_required,
                hotel_name: pickup_required ? hotel_name : null,
                special_requests: special_requests || null,
                advance_payment_amount: advance_payment_amount || 5,
                advance_payment_status: 'pending',
                status: 'new',
                extra_hours: 0,
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to create booking', details: error.message },
                { status: 500 }
            );
        }

        // TODO: Send confirmation email to customer
        // TODO: Send notification email to admin

        return NextResponse.json({
            success: true,
            id: booking.id,
            message: 'Booking created successfully',
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
