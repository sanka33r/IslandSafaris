import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-safari-50 relative">
            <AdminSidebar />
            <main className="md:ml-64 min-h-screen pt-16 md:pt-0">
                <div className="p-4 sm:p-6 md:p-8 pt-4 md:pt-10 max-w-[1600px] mx-auto w-full min-w-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
