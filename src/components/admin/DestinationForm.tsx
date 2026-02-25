'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Destination, Image } from '@/types/db';
import { updateDestination, createDestination, addDestinationImage, deleteDestinationImage, setDestinationImageAsHero } from '@/lib/actions/admin';
import { cn } from '@/lib/utils';
import { Loader2, Save, Trash2, Plus, Globe, ImageIcon, Clock, Ticket, Car, ArrowLeft, Star, Upload } from 'lucide-react';
import Link from 'next/link';

interface DestinationFormProps {
    destination: Destination;
    images: Image[];
}

interface DescriptionSectionsFormState {
    introTitle: string;
    introContent: string;
    experienceTitle: string;
    experienceContent: string;
    bestTimeMorning: string;
    bestTimeAfternoon: string;
    migrationCycle: string[];
    whyChooseHurulu: string[];
}

export default function DestinationForm({ destination, images }: DestinationFormProps) {
    const isNew = destination.id === 'new';
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(destination);
    const [descriptionSections, setDescriptionSections] = useState<DescriptionSectionsFormState>(() => {
        const raw = destination.description_sections;
        const obj = raw && typeof raw === 'object' ? (raw as Record<string, any>) : {};
        const intro = obj.intro ?? {};
        const experience = obj.experience ?? {};
        const bestTimes = obj.best_times ?? {};
        return {
            introTitle: typeof intro.title === 'string' ? intro.title : '',
            introContent: typeof intro.content === 'string' ? intro.content : '',
            experienceTitle: typeof experience.title === 'string' ? experience.title : '',
            experienceContent: typeof experience.content === 'string' ? experience.content : '',
            bestTimeMorning: typeof bestTimes.morning === 'string' ? bestTimes.morning : '',
            bestTimeAfternoon: typeof bestTimes.afternoon === 'string' ? bestTimes.afternoon : '',
            migrationCycle: Array.isArray(obj.migration_cycle) ? obj.migration_cycle.map(String) : [''],
            whyChooseHurulu: Array.isArray(obj.why_choose_hurulu) ? obj.why_choose_hurulu.map(String) : ['']
        };
    });
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newImageAlt, setNewImageAlt] = useState('');
    const [imageLoading, setImageLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const trimmedMigration = descriptionSections.migrationCycle
            .map(item => item.trim())
            .filter(Boolean);
        const trimmedWhyChoose = descriptionSections.whyChooseHurulu
            .map(item => item.trim())
            .filter(Boolean);

        const builtSections: Record<string, any> = {};
        if (descriptionSections.introTitle || descriptionSections.introContent) {
            builtSections.intro = {
                title: descriptionSections.introTitle || undefined,
                content: descriptionSections.introContent || undefined
            };
        }
        if (descriptionSections.bestTimeMorning || descriptionSections.bestTimeAfternoon) {
            builtSections.best_times = {
                morning: descriptionSections.bestTimeMorning || undefined,
                afternoon: descriptionSections.bestTimeAfternoon || undefined
            };
        }
        if (descriptionSections.experienceTitle || descriptionSections.experienceContent) {
            builtSections.experience = {
                title: descriptionSections.experienceTitle || undefined,
                content: descriptionSections.experienceContent || undefined
            };
        }
        if (trimmedMigration.length > 0) {
            builtSections.migration_cycle = trimmedMigration;
        }
        if (trimmedWhyChoose.length > 0) {
            builtSections.why_choose_hurulu = trimmedWhyChoose;
        }

        const payload = {
            ...formData,
            description_sections: Object.keys(builtSections).length > 0 ? builtSections : null
        };

        if (isNew) {
            const result = await createDestination(payload);
            setLoading(false);
            if (result.success && result.data) {
                router.push(`/admin/destinations/${result.data.id}`);
                router.refresh();
            }
        } else {
            const result = await updateDestination(destination.id, payload);
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

    const handleSetAsHero = async (imageId: string) => {
        setImageLoading(imageId);
        const result = await setDestinationImageAsHero(imageId);
        setImageLoading(null);
        if (result.success) router.refresh();
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
                                <p className="text-safari-500 text-base">Update the park name, description, and settings</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="block text-base font-bold text-safari-700 ml-1">Destination Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-base font-bold text-safari-700 ml-1">URL Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-base font-bold text-safari-700 ml-1">Full Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all min-h-[200px]"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <label className="block text-base font-bold text-safari-700 ml-1">Structured Sections</label>

                                <div className="rounded-2xl border border-safari-100 bg-white p-5 space-y-4">
                                    <h4 className="font-bold text-safari-900">Intro</h4>
                                    <input
                                        type="text"
                                        value={descriptionSections.introTitle}
                                        onChange={(e) => setDescriptionSections({ ...descriptionSections, introTitle: e.target.value })}
                                        placeholder="Section title"
                                        className="w-full p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                    />
                                    <textarea
                                        value={descriptionSections.introContent}
                                        onChange={(e) => setDescriptionSections({ ...descriptionSections, introContent: e.target.value })}
                                        placeholder="Section content"
                                        className="w-full p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all min-h-[140px]"
                                    />
                                </div>

                                <div className="rounded-2xl border border-safari-100 bg-white p-5 space-y-4">
                                    <h4 className="font-bold text-safari-900">Best Times</h4>
                                    <input
                                        type="text"
                                        value={descriptionSections.bestTimeMorning}
                                        onChange={(e) => setDescriptionSections({ ...descriptionSections, bestTimeMorning: e.target.value })}
                                        placeholder="Morning"
                                        className="w-full p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                    />
                                    <input
                                        type="text"
                                        value={descriptionSections.bestTimeAfternoon}
                                        onChange={(e) => setDescriptionSections({ ...descriptionSections, bestTimeAfternoon: e.target.value })}
                                        placeholder="Afternoon"
                                        className="w-full p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="rounded-2xl border border-safari-100 bg-white p-5 space-y-4">
                                    <h4 className="font-bold text-safari-900">Experience</h4>
                                    <input
                                        type="text"
                                        value={descriptionSections.experienceTitle}
                                        onChange={(e) => setDescriptionSections({ ...descriptionSections, experienceTitle: e.target.value })}
                                        placeholder="Section title"
                                        className="w-full p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                    />
                                    <textarea
                                        value={descriptionSections.experienceContent}
                                        onChange={(e) => setDescriptionSections({ ...descriptionSections, experienceContent: e.target.value })}
                                        placeholder="Section content"
                                        className="w-full p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all min-h-[140px]"
                                    />
                                </div>

                                <div className="rounded-2xl border border-safari-100 bg-white p-5 space-y-4">
                                    <h4 className="font-bold text-safari-900">Migration Cycle</h4>
                                    {descriptionSections.migrationCycle.map((item, idx) => (
                                        <div key={`migration-${idx}`} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const updated = [...descriptionSections.migrationCycle];
                                                    updated[idx] = e.target.value;
                                                    setDescriptionSections({ ...descriptionSections, migrationCycle: updated });
                                                }}
                                                className="flex-1 p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = descriptionSections.migrationCycle.filter((_, i) => i !== idx);
                                                    setDescriptionSections({
                                                        ...descriptionSections,
                                                        migrationCycle: updated.length > 0 ? updated : ['']
                                                    });
                                                }}
                                                className="px-3 rounded-2xl border border-safari-100 text-safari-500 hover:text-safari-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDescriptionSections({
                                                ...descriptionSections,
                                                migrationCycle: [...descriptionSections.migrationCycle, '']
                                            })
                                        }
                                        className="inline-flex items-center gap-2 text-secondary-600 font-semibold text-base"
                                    >
                                        <Plus size={14} />
                                        Add item
                                    </button>
                                </div>

                                <div className="rounded-2xl border border-safari-100 bg-white p-5 space-y-4">
                                    <h4 className="font-bold text-safari-900">Why Choose Hurulu</h4>
                                    {descriptionSections.whyChooseHurulu.map((item, idx) => (
                                        <div key={`why-${idx}`} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const updated = [...descriptionSections.whyChooseHurulu];
                                                    updated[idx] = e.target.value;
                                                    setDescriptionSections({ ...descriptionSections, whyChooseHurulu: updated });
                                                }}
                                                className="flex-1 p-3 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = descriptionSections.whyChooseHurulu.filter((_, i) => i !== idx);
                                                    setDescriptionSections({
                                                        ...descriptionSections,
                                                        whyChooseHurulu: updated.length > 0 ? updated : ['']
                                                    });
                                                }}
                                                className="px-3 rounded-2xl border border-safari-100 text-safari-500 hover:text-safari-900"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDescriptionSections({
                                                ...descriptionSections,
                                                whyChooseHurulu: [...descriptionSections.whyChooseHurulu, '']
                                            })
                                        }
                                        className="inline-flex items-center gap-2 text-secondary-600 font-semibold text-base"
                                    >
                                        <Plus size={14} />
                                        Add item
                                    </button>
                                </div>
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
                                        <label className="block text-base font-bold text-safari-500 uppercase tracking-wider ml-1">Ticket Price (Rs.)</label>
                                        <input
                                            type="number"
                                            value={formData.ticket_price}
                                            onChange={(e) => setFormData({ ...formData, ticket_price: parseInt(e.target.value) })}
                                            className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-base font-bold text-safari-500 uppercase tracking-wider ml-1">Pricing Type</label>
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
                                        <label className="block text-base font-bold text-safari-500 uppercase tracking-wider ml-1">Jeep Price (up to 3 pax)</label>
                                        <input
                                            type="number"
                                            value={formData.vehicle_price_up_to_3}
                                            onChange={(e) => setFormData({ ...formData, vehicle_price_up_to_3: parseInt(e.target.value) })}
                                            className="w-full p-4 bg-safari-50/50 rounded-2xl border border-safari-100 focus:border-secondary-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-base font-bold text-safari-500 uppercase tracking-wider ml-1">Duration (Hours)</label>
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
                            <p className="text-safari-500 text-base leading-relaxed">
                                You can add and manage destination images after saving the initial details.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-safari-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-secondary-100/50 p-3 rounded-xl text-secondary-600">
                                    <ImageIcon size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-safari-900">Photo gallery</h3>
                            </div>
                            <p className="text-safari-500 text-sm mb-6">First image is the backdrop on the destination page. Delete or add photos below; use &quot;Set as hero&quot; to change the backdrop.</p>

                            {/* Existing Images */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {images.map((image, index) => (
                                    <div key={image.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-safari-50 border border-safari-100">
                                        <img
                                            src={image.secure_url}
                                            alt={image.alt_text || ''}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        />
                                        {index === 0 && (
                                            <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-600 text-white text-xs font-bold shadow">
                                                <Star size={12} />
                                                Hero
                                            </span>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                            {index !== 0 && (
                                                <button
                                                    onClick={() => handleSetAsHero(image.id)}
                                                    disabled={imageLoading === image.id}
                                                    className="w-full flex items-center justify-center gap-1.5 bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-3 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
                                                >
                                                    {imageLoading === image.id ? <Loader2 size={14} className="animate-spin" /> : <Star size={14} />}
                                                    Set as hero
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                disabled={imageLoading === image.id}
                                                className="w-full flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                {imageLoading === image.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {images.length === 0 && (
                                    <div className="col-span-2 py-8 text-center border-2 border-dashed border-safari-100 rounded-2xl text-safari-400 text-base">
                                        No photos yet. Add one below.
                                    </div>
                                )}
                            </div>

                            {/* Add New Photo */}
                            <div className="space-y-4 pt-6 border-t border-safari-100">
                                <h4 className="font-bold text-safari-900 text-base flex items-center gap-2">
                                    <Upload size={18} />
                                    Upload new photo
                                </h4>
                                <p className="text-safari-500 text-sm">Paste an image URL (e.g. from Cloudinary or your CDN). The image will be added to the gallery.</p>
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        placeholder="https://res.cloudinary.com/... or any image URL"
                                        value={newImageUrl}
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                        className="w-full p-3 bg-safari-50 rounded-xl border border-safari-100 text-base outline-none focus:border-secondary-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Alt text (optional, e.g. Elephant at waterhole)"
                                        value={newImageAlt}
                                        onChange={(e) => setNewImageAlt(e.target.value)}
                                        className="w-full p-3 bg-safari-50 rounded-xl border border-safari-100 text-base outline-none focus:border-secondary-500"
                                    />
                                    <button
                                        onClick={handleAddImage}
                                        disabled={!newImageUrl || imageLoading === 'new'}
                                        className="w-full flex items-center justify-center gap-2 bg-safari-900 hover:bg-safari-800 text-white py-3 rounded-xl font-bold text-base transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {imageLoading === 'new' ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                        Add photo
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
