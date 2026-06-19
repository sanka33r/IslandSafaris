import PackageOverridesForm from '@/components/admin/PackageOverridesForm';
import { getPackagesWithOverrides } from '@/lib/packages';

export default async function AdminPackagesPage() {
    const packages = await getPackagesWithOverrides();
    const serializablePackages = packages.map(({ icon: _icon, ...pkg }) => pkg);

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-safari-900">Packages</h1>
                <p className="text-safari-600 text-sm sm:text-base mt-0.5">
                    Manage package price and visibility on public pages.
                </p>
            </div>

            <PackageOverridesForm packages={serializablePackages} />
        </div>
    );
}
