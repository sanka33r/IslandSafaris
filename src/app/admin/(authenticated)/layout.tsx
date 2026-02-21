import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-safari-50 relative">
            <AdminSidebar />
            <main className="md:ml-64 min-h-screen">
                <div className="p-4 md:p-8 pt-6 md:pt-10 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
