'use client';

import { useState, useEffect } from 'react';
import { getAllPromoCodes, deletePromoCode } from '@/lib/actions/promo-codes';
import { PromoCode } from '@/types/db';
import { Plus, Search, Tag, Trash2, Edit2, CheckCircle, XCircle, Clock } from 'lucide-react';
import PromoCodeForm from '@/components/admin/PromoCodeForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoCodesPage() {
    const [codes, setCodes] = useState<PromoCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCode, setEditingCode] = useState<PromoCode | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCodes = async () => {
        const data = await getAllPromoCodes();
        setCodes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCodes();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this promo code?')) {
            await deletePromoCode(id);
            fetchCodes();
        }
    };

    const handleEdit = (code: PromoCode) => {
        setEditingCode(code);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setEditingCode(undefined);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        fetchCodes();
    };

    const filteredCodes = codes.filter(code =>
        code.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string, endDate: string) => {
        if (status === 'inactive') return 'bg-gray-100 text-gray-500 border-gray-200';
        if (new Date(endDate) < new Date()) return 'bg-red-50 text-red-600 border-red-200';
        return 'bg-green-50 text-green-600 border-green-200';
    };

    const getStatusText = (status: string, endDate: string) => {
        if (status === 'inactive') return 'Inactive';
        if (new Date(endDate) < new Date()) return 'Expired';
        return 'Active';
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-safari-900">Promo Codes</h1>
                    <p className="text-safari-500 text-sm sm:text-base mt-0.5">Manage discount codes and coupons</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg shadow-secondary-900/20 transition-all hover:-translate-y-0.5 sm:hover:-translate-y-1 shrink-0"
                >
                    <Plus size={20} />
                    Create New Code
                </button>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-safari-100 shadow-xl overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-safari-100 bg-safari-50/50">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-safari-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search promo codes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base rounded-xl border border-safari-200 focus:border-secondary-500 outline-none"
                        />
                    </div>
                </div>

                {/* Mobile card view */}
                <div className="md:hidden p-4 space-y-4">
                    {loading ? (
                        <p className="p-6 text-center text-safari-500 text-sm">Loading promo codes...</p>
                    ) : filteredCodes.length === 0 ? (
                        <p className="p-6 text-center text-safari-500 text-sm">No promo codes found. Create one to get started!</p>
                    ) : (
                        filteredCodes.map((code) => (
                            <div key={code.id} className="rounded-xl border border-safari-100 p-4 space-y-3 bg-safari-50/30">
                                <div className="flex items-start justify-between gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-bold border ${getStatusColor(code.status, code.end_date)}`}>
                                        {getStatusText(code.status, code.end_date) === 'Active' ? <CheckCircle size={12} /> :
                                            getStatusText(code.status, code.end_date) === 'Expired' ? <Clock size={12} /> : <XCircle size={12} />}
                                        {getStatusText(code.status, code.end_date)}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => handleEdit(code)} className="p-2 text-safari-400 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg" aria-label="Edit"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(code.id)} className="p-2 text-safari-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-safari-900 bg-safari-100 inline-block px-2 py-1 rounded text-sm">{code.code}</div>
                                <div className="text-sm text-safari-600">
                                    <span className="font-bold text-secondary-700">{code.type === 'percentage' ? `${code.value}%` : `$${code.value}`}</span>
                                    {code.type === 'percentage' && code.max_discount && <span className="text-safari-500 ml-1">Max ${code.max_discount}</span>}
                                </div>
                                <div className="text-sm text-safari-600">
                                    Usage: <span className="font-bold">{code.usage_count}</span> / {code.usage_limit || '∞'}
                                </div>
                                <div className="text-xs text-safari-500">
                                    {new Date(code.start_date).toLocaleDateString()} – {new Date(code.end_date).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left min-w-[640px]">
                        <thead className="bg-safari-50 text-safari-700 text-base font-bold uppercase tracking-wider">
                            <tr>
                                <th className="p-4 rounded-tl-xl text-center">Status</th>
                                <th className="p-4">Code</th>
                                <th className="p-4">Discount</th>
                                <th className="p-4">Usage</th>
                                <th className="p-4">Scope</th>
                                <th className="p-4">Validity</th>
                                <th className="p-4 text-right rounded-tr-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-safari-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-safari-500">
                                        Loading promo codes...
                                    </td>
                                </tr>
                            ) : filteredCodes.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-safari-500">
                                        No promo codes found. Create one to get started!
                                    </td>
                                </tr>
                            ) : (
                                filteredCodes.map((code) => (
                                    <tr key={code.id} className="hover:bg-safari-50/50 transition-colors">
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-base font-bold border ${getStatusColor(code.status, code.end_date)}`}>
                                                {getStatusText(code.status, code.end_date) === 'Active' ? <CheckCircle size={12} /> :
                                                    getStatusText(code.status, code.end_date) === 'Expired' ? <Clock size={12} /> : <XCircle size={12} />}
                                                {getStatusText(code.status, code.end_date)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-mono font-bold text-safari-900 bg-safari-100 inline-block px-2 py-1 rounded text-base">
                                                {code.code}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-secondary-700">
                                                {code.type === 'percentage' ? `${code.value}%` : `$${code.value}`}
                                            </span>
                                            {code.type === 'percentage' && code.max_discount && (
                                                <div className="text-base text-safari-500">Max ${code.max_discount}</div>
                                            )}
                                        </td>
                                        <td className="p-4 text-base text-safari-600">
                                            <span className="font-bold">{code.usage_count}</span>
                                            <span className="text-safari-400"> / </span>
                                            <span>{code.usage_limit || '∞'}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {code.applicable_scope.slice(0, 2).map(s => (
                                                    <span key={s} className="text-sm uppercase font-bold bg-safari-100 text-safari-600 px-1.5 py-0.5 rounded">
                                                        {s}
                                                    </span>
                                                ))}
                                                {code.applicable_scope.length > 2 && (
                                                    <span className="text-sm uppercase font-bold bg-safari-100 text-safari-600 px-1.5 py-0.5 rounded">
                                                        +{code.applicable_scope.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-base text-safari-600">
                                            <div>{new Date(code.start_date).toLocaleDateString()}</div>
                                            <div className="text-safari-400">to</div>
                                            <div className={new Date(code.end_date) < new Date() ? 'text-red-500 font-bold' : ''}>
                                                {new Date(code.end_date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(code)}
                                                    className="p-2 text-safari-400 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(code.id)}
                                                    className="p-2 text-safari-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsFormOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto z-10 rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl"
                        >
                            <PromoCodeForm
                                initialData={editingCode}
                                onClose={() => setIsFormOpen(false)}
                                onSuccess={handleFormSuccess}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
