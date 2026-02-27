import { getExtraHourPriceUsd } from '@/lib/settings';
import SettingsForm from '@/components/admin/SettingsForm';
import { Settings } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
    const extraHourPriceUsd = await getExtraHourPriceUsd();

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-safari-900 flex items-center gap-2 flex-wrap">
                    <Settings className="text-safari-500 shrink-0" size={28} />
                    <span>Settings</span>
                </h1>
                <p className="text-safari-600 text-sm sm:text-base mt-1">
                    Configure site-wide charges and options.
                </p>
            </div>

            <SettingsForm initialExtraHourPriceUsd={extraHourPriceUsd} />
        </div>
    );
}
