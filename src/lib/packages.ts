import { Bike, ChefHat, TreePalm } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';

export const PACKAGE_SLUGS = ['cooking-class', 'village-tour', 'bicycle-rent'] as const;
export type PackageSlug = (typeof PACKAGE_SLUGS)[number];

export interface PackageDefinition {
    slug: PackageSlug;
    icon: typeof ChefHat;
    number: string;
    title: string;
    tagline: string;
    price: number;
    duration: string;
    location: string;
    description: string;
    accent: string;
    accentLight: string;
    accentText: string;
    accentBorder: string;
    image: string;
    images: string[];
}

export interface PackageOverride {
    slug: PackageSlug;
    price: number | null;
    visible: boolean;
}

export interface PackageWithOverrides extends PackageDefinition {
    visible: boolean;
}

export interface BookingPackageInfo {
    name: string;
    price: number;
    duration: string;
    advance: number;
    visible: boolean;
}

export const BASE_PACKAGES: PackageDefinition[] = [
    {
        slug: 'cooking-class',
        icon: ChefHat,
        number: '01',
        title: 'Organic Cooking Experience',
        tagline: 'Farm to Table',
        price: 22,
        duration: '4-5 Hours',
        location: 'Sigiriya',
        description:
            'Step into a peaceful organic garden and learn to cook authentic Sri Lankan dishes using handpicked, homegrown ingredients. A true farm-to-table experience guided by a local host.',
        accent: 'bg-gradient-to-br from-orange-500 to-rose-500',
        accentLight: 'bg-orange-50',
        accentText: 'text-orange-600',
        accentBorder: 'border-orange-200',
        image:
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.43_PM_bxpezn.jpg',
        images: [
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.43_PM_bxpezn.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.44_PM_lc1rkx.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.42_PM_qqz6qf.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.44_PM_1_vfcznz.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045141/WhatsApp_Image_2026-02-15_at_12.06.45_PM_nx8h5a.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045143/WhatsApp_Image_2026-02-15_at_12.06.45_PM_1_icz8ge.jpg',
        ],
    },
    {
        slug: 'village-tour',
        icon: TreePalm,
        number: '02',
        title: 'Sigiriya Village Tour',
        tagline: 'Cultural Immersion',
        price: 22,
        duration: '4-5 Hours',
        location: 'Sigiriya Village',
        description:
            'Drift through the countryside on a bullock cart, glide across a serene lake by catamaran, and walk through lush paddy fields to a village home. A journey into the soul of rural Sri Lanka.',
        accent: 'bg-gradient-to-br from-emerald-500 to-teal-500',
        accentLight: 'bg-emerald-50',
        accentText: 'text-emerald-600',
        accentBorder: 'border-emerald-200',
        image:
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045164/WhatsApp_Image_2026-02-15_at_12.06.47_PM_aknrgc.jpg',
        images: [
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045164/WhatsApp_Image_2026-02-15_at_12.06.47_PM_aknrgc.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045168/WhatsApp_Image_2026-02-15_at_12.06.50_PM_rkm6et.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045167/WhatsApp_Image_2026-02-15_at_12.06.49_PM_qfmjwa.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045165/WhatsApp_Image_2026-02-15_at_12.06.49_PM_1_oox3hc.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045165/WhatsApp_Image_2026-02-15_at_12.06.46_PM_nycn67.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045165/WhatsApp_Image_2026-02-15_at_12.06.48_PM_ro3ulg.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045164/WhatsApp_Image_2026-02-15_at_12.06.48_PM_1_bqpavw.jpg',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045163/WhatsApp_Image_2026-02-15_at_12.06.46_PM_1_fi57kd.jpg',
        ],
    },
    {
        slug: 'bicycle-rent',
        icon: Bike,
        number: '03',
        title: 'Bicycle Rent',
        tagline: 'Explore Freely',
        price: 5,
        duration: 'Flexible',
        location: 'Sigiriya & Beyond',
        description:
            'Set your own pace through quiet village roads, shaded forest trails, and golden paddy fields. The most peaceful and eco-friendly way to discover the countryside.',
        accent: 'bg-gradient-to-br from-blue-500 to-indigo-500',
        accentLight: 'bg-blue-50',
        accentText: 'text-blue-600',
        accentBorder: 'border-blue-200',
        image:
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218312/24ba6f02-8af7-46af-9563-d882218b1916.png',
        images: [
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218312/24ba6f02-8af7-46af-9563-d882218b1916.png',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218303/4e9dba9a-64db-4adc-a862-061ea932ff9c.png',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218301/ab34eb81-53a1-47ae-9124-d9800b6cd715.png',
            'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218295/90b01039-01c4-4abe-b3da-39059639c199.png',
        ],
    },
];

const baseBySlug = Object.fromEntries(BASE_PACKAGES.map((pkg) => [pkg.slug, pkg])) as Record<PackageSlug, PackageDefinition>;

function mergePackages(overrides: PackageOverride[]): PackageWithOverrides[] {
    const overridesBySlug = Object.fromEntries(overrides.map((item) => [item.slug, item])) as Partial<Record<PackageSlug, PackageOverride>>;
    return BASE_PACKAGES.map((pkg) => {
        const override = overridesBySlug[pkg.slug];
        return {
            ...pkg,
            price: override?.price ?? pkg.price,
            visible: override?.visible ?? true,
        };
    });
}

export async function getPackageOverrides(): Promise<PackageOverride[]> {
    const { data, error } = await supabaseAdmin
        .from('package_overrides')
        .select('slug, price, visible');

    if (error) {
        console.error('Error fetching package overrides:', error);
        return [];
    }

    return (data ?? [])
        .filter((item) => PACKAGE_SLUGS.includes(item.slug as PackageSlug))
        .map((item) => ({
            slug: item.slug as PackageSlug,
            price: item.price == null ? null : Number(item.price),
            visible: item.visible !== false,
        }))
        .filter((item) => item.price == null || Number.isFinite(item.price));
}

export async function getPackagesWithOverrides(): Promise<PackageWithOverrides[]> {
    const overrides = await getPackageOverrides();
    return mergePackages(overrides);
}

export async function getVisiblePackages(): Promise<PackageWithOverrides[]> {
    const merged = await getPackagesWithOverrides();
    return merged.filter((pkg) => pkg.visible);
}

export async function getPackageBySlug(slug: PackageSlug): Promise<PackageWithOverrides | null> {
    const merged = await getPackagesWithOverrides();
    return merged.find((pkg) => pkg.slug === slug) ?? null;
}

export async function getVisiblePackageBySlug(slug: PackageSlug): Promise<PackageWithOverrides | null> {
    const pkg = await getPackageBySlug(slug);
    if (!pkg || !pkg.visible) return null;
    return pkg;
}

export async function getPackagePrice(slug: PackageSlug): Promise<number> {
    const pkg = await getPackageBySlug(slug);
    if (!pkg) return baseBySlug[slug].price;
    return pkg.price;
}

export async function getBookingPackageInfoMap(): Promise<Record<PackageSlug, BookingPackageInfo>> {
    const merged = await getPackagesWithOverrides();
    return Object.fromEntries(
        merged.map((pkg) => [
            pkg.slug,
            {
                name: pkg.title,
                price: pkg.price,
                duration: pkg.duration,
                advance: 5,
                visible: pkg.visible,
            },
        ])
    ) as Record<PackageSlug, BookingPackageInfo>;
}

export async function upsertPackageOverride(input: { slug: PackageSlug; price: number; visible: boolean }) {
    const { error } = await supabaseAdmin
        .from('package_overrides')
        .upsert(
            {
                slug: input.slug,
                price: input.price,
                visible: input.visible,
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'slug' }
        );

    if (error) {
        console.error('Error upserting package override:', error);
        return { success: false, message: error.message };
    }

    return { success: true };
}
