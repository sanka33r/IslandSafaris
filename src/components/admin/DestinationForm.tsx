'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Destination, Image } from '@/types/db';
import { updateDestination, createDestination, addDestinationImage, deleteDestinationImage } from '@/lib/actions/admin';
import { cn } from '@/lib/utils';
import { Loader2, Save, Trash2, Plus, Globe, ImageIcon, Clock, Ticket, Car, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DestinationFormProps {
    destination: Destination;
    images: Image[];
}

export default function DestinationForm({ destination, images }: DestinationFormProps) {
    const isNew = destination.id === 'new';
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(destination);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newImageAlt, setNewImageAlt] = useState('');
    const [imageLoading, setImageLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isNew) {
            const result = await createDestination(formData);
            setLoading(false);
            if (result.success && result.data) {
                router.push(`/admin/destinations/${result.data.id}`);
                router.refresh();
            }
        } else {
            const result = await updateDestination(destination.id, formData);
            setLoading(false);
            if (result.success) {
                router.refresh();
            }
        }
    };

    const handleAddImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageUrl) return;

        setImageLoading('new');
        const result = await addDestinationImage(destination.id, {
            secure_url: newImageUrl,
            alt_text: newImageAlt || `${destination.name} photo`,
            sort_order: images.length
        });
        setImageLoading(null);

        if (result.success) {
            setNewImageUrl('');
            setNewImageAlt('');
            router.refresh();
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        setImageLoading(imageId);
        const result = await deleteDestinationImage(imageId);
        setImageLoading(null);

        if (result.success) {
            router.refresh();
        }
    };

    return (
        <div className="space-y-8">
            <Link
                href="/admin/destinations"
                className="inline-flex items-center gap-2 text-safari-600 hover:text-safari-900 font-medium transition-colors"
            >
                <ArrowLeft size={18} />
                Back to Destinations
            </Link>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Core Details Form */}
                <div className="xl:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-safari-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-secondary-100/50 p-4 rounded-2xl text-secondary-600">
                                <Globe size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-safari-900">Destination Details</h2>
                                <p className="text-safari-500 text-sm">Update the park name, description, and settings</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-safari-700 ml-1">Destination Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-safari-700 ml-1">URL Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-sm font-bold text-safari-700 ml-1">Full Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all min-h-[200px]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10 pb-8 border-b border-safari-50">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-safari-900 font-bold border-b border-safari-100 pb-2">
                                    <Ticket size={20} className="text-secondary-600" />
                                    <span>Entrance Pricing</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-safari-500 uppercase tracking-wider ml-1">Ticket Price (Rs.)</label>
                                        <input
                                            type="number"
                                            value={formData.ticket_price}
                                            onChange={(e) => setFormData({ ...formData, ticket_price: parseInt(e.target.value) })}
                                            className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-safari-500 uppercase tracking-wider ml-1">Pricing Type</label>
                                        <select
                                            value={formData.ticket_pricing_type}
                                            onChange={(e) => setFormData({ ...formData, ticket_pricing_type: e.target.value as any })}
                                            className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                        >
                                            <option value="per_person">Per Person</option>
                                            <option value="flat">Flat Fee</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-safari-900 font-bold border-b border-safari-100 pb-2">
                                    <Car size={20} className="text-secondary-600" />
                                    <span>Logistic Fees</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-safari-500 uppercase tracking-wider ml-1">Jeep Price (up to 3 pax)</label>
                                        <input
                                            type="number"
                                            value={formData.vehicle_price_up_to_3}
                                            onChange={(e) => setFormData({ ...formData, vehicle_price_up_to_3: parseInt(e.target.value) })}
                                            className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-safari-500 uppercase tracking-wider ml-1">Duration (Hours)</label>
                                        <input
                                            type="number"
                                            value={formData.standard_duration_hours}
                                            onChange={(e) => setFormData({ ...formData, standard_duration_hours: parseInt(e.target.value) })}
                                            className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.active}
                                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                        className="sr-only"
                                    />
                                    <div className={cn(
                                        "w-14 h-8 rounded-full transition-colors",
                                        formData.active ? "bg-green-500" : "bg-safari-200"
                                    )} />
                                    <div className={cn(
                                        "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform shadow-md",
                                        formData.active ? "translate-x-6" : "translate-x-0"
                                    )} />
                                </div>
                                <span className="font-bold text-safari-900">Destination Active (Visible to public)</span>
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-secondary-900/10 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Image Management Sidebar */}
                <div className="space-y-8">
                    {isNew ? (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-safari-100 text-center">
                            <div className="bg-safari-50 p-6 rounded-2xl mb-6 flex justify-center">
                                <ImageIcon size={48} className="text-safari-200" />
                            </div>
                            <h3 className="text-xl font-bold text-safari-900 mb-2">Gallery Management</h3>
                            <p className="text-safari-500 text-sm leading-relaxed">
                                You can add and manage destination images after saving the initial details.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-safari-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-secondary-100/50 p-3 rounded-xl text-secondary-600">
                                    <ImageIcon size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-safari-900">Gallery</h3>
                            </div>

                            {/* Existing Images */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {images.map((image) => (
                                    <div key={image.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-safari-50 border border-safari-100">
                                        <img
                                            src={image.secure_url}
                                            alt={image.alt_text || ''}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                disabled={imageLoading === image.id}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-all active:scale-90 shadow-xl"
                                            >
                                                {imageLoading === image.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {images.length === 0 && (
                                    <div className="col-span-2 py-8 text-center border-2 border-dashed border-safari-100 rounded-2xl text-safari-400 text-sm">
                                        No images yet
                                    </div>
                                )}
                            </div>

                            {/* Add New Image Form */}
                            <div className="space-y-4 pt-6 border-t border-safari-50">
                                <h4 className="font-bold text-safari-900 text-sm italic">Add New Image URL</h4>
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={newImageUrl}
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                        className="w-full p-3 bg-safari-50 rounded-xl border border-safari-100 text-sm outline-none focus:border-secondary-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Alt text (e.g. Birds eye view)"
                                        value={newImageAlt}
                                        onChange={(e) => setNewImageAlt(e.target.value)}
                                        className="w-full p-3 bg-safari-50 rounded-xl border border-safari-100 text-sm outline-none focus:border-secondary-500"
                                    />
                                    <button
                                        onClick={handleAddImage}
                                        disabled={!newImageUrl || imageLoading === 'new'}
                                        className="w-full flex items-center justify-center gap-2 bg-safari-900 hover:bg-safari-800 text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {imageLoading === 'new' ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                        Add Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
