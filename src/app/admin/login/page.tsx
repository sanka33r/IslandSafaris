'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/admin/bookings');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.message || 'Invalid credentials');
            }
        } catch {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-safari-900 px-6">
            <div className="w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-secondary-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 shadow-lg shadow-secondary-900/40">
                        <Lock size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-safari-300 text-center">Enter your credentials to access the safari management dashboard.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-safari-100 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 bg-safari-800/50 rounded-2xl border border-white/10 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none text-white transition-all"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-safari-100 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-safari-800/50 rounded-2xl border border-white/10 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none text-white transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-secondary-900/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
