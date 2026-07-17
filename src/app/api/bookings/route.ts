import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getPackagePrice } from '@/lib/packages';
import { sendNewBookingNotification } from '@/lib/email/send-new-booking-notification';

function formatPackageName(type: string): string {
    return type.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

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
            promo_code,
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

        const packagePrice = await getPackagePrice(package_type);
        const totalUsd = packagePrice * parseInt(group_size);

        // Validate promo code if provided
        let discountAmount = 0;
        if (promo_code) {
            const { data: promo, error: promoError } = await supabaseAdmin
                .from('promo_codes')
                .select('*')
                .eq('code', promo_code)
                .eq('status', 'active')
                .single();

            if (promoError || !promo) {
                return NextResponse.json(
                    { error: 'Invalid promo code' },
                    { status: 400 }
                );
            }

            // Check expiry
            const now = new Date();
            if (new Date(promo.start_date) > now || new Date(promo.end_date) < now) {
                return NextResponse.json(
                    { error: 'Promo code expired' },
                    { status: 400 }
                );
            }

            // Check usage limit
            if (promo.usage_limit && promo.usage_count >= promo.usage_limit) {
                return NextResponse.json(
                    { error: 'Promo code usage limit reached' },
                    { status: 400 }
                );
            }

            // Check scope
            // scope for packages is in `package_type`
            const scope = package_type;
            if (!promo.applicable_scope.includes('all') && !promo.applicable_scope.includes(scope)) {
                return NextResponse.json(
                    { error: 'Promo code not applicable for this package' },
                    { status: 400 }
                );
            }

            // Increment usage count
            await supabaseAdmin
                .from('promo_codes')
                .update({ usage_count: promo.usage_count + 1 })
                .eq('id', promo.id);

            // ... code ...

            // Calculate discount amount for storage
            if (promo.type === 'percentage') {
                discountAmount = (totalUsd * promo.value) / 100;
                if (promo.max_discount && discountAmount > promo.max_discount) {
                    discountAmount = promo.max_discount;
                }
            } else {
                discountAmount = promo.value;
            }
            if (discountAmount > totalUsd) discountAmount = totalUsd;
        }

        // Insert booking - omit passport_number, pickup_location, promo_code, discount_amount if columns don't exist
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
                status: 'payment_pending',
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

        sendNewBookingNotification({
            bookingId: booking.id,
            referenceNumber: `IS-${booking.id.substring(0, 8).toUpperCase()}`,
            customerName: customer_name,
            customerEmail: email,
            customerPhone: phone,
            activityName: formatPackageName(package_type),
            date,
            time,
            groupSize: parseInt(group_size),
            totalUsd: Math.max(0, totalUsd - discountAmount),
            hotelName: pickup_required ? hotel_name : null,
            pickupRequired: !!pickup_required,
        }).catch((err) => console.error('Failed to send new booking notification:', err));

        // TODO: Send confirmation email to customer

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
