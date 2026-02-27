import { getExtraHourPriceUsd } from '@/lib/settings';
import SettingsForm from '@/components/admin/SettingsForm';
import { Settings } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
    const extraHourPriceUsd = await getExtraHourPriceUsd();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-safari-900 flex items-center gap-2">
                    <Settings className="text-safari-500" size={32} />
                    Settings
                </h1>
                <p className="text-safari-600 text-base mt-1">
                    Configure site-wide charges and options.
                </p>
            </div>

            <SettingsForm initialExtraHourPriceUsd={extraHourPriceUsd} />
        </div>
    );
}
