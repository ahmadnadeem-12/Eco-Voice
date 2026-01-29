import React, { useState } from 'react';
import { useAuth } from './auth';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    Save,
    CheckCircle,
    AlertCircle,
    Shield,
    Mail
} from 'lucide-react';

export default function Settings() {
    const { adminUser } = useAuth();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
            return;
        }

        // Check current password
        const storedPassword = localStorage.getItem('ecovoice_admin_password') || 'admin123';
        if (currentPassword !== storedPassword) {
            setMessage({ type: 'error', text: 'Current password is incorrect' });
            return;
        }

        try {
            setSaving(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Save new password to localStorage (in production, this would be an API call)
            localStorage.setItem('ecovoice_admin_password', newPassword);

            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch {
            setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your admin account settings</p>
            </div>

            {/* Admin Profile Card */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-eco-400" />
                    Admin Profile
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-eco-500/20 rounded-2xl flex items-center justify-center">
                            <User className="w-8 h-8 text-eco-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{adminUser?.name || 'Admin'}</h3>
                            <p className="text-slate-400">{adminUser?.email || 'admin@ecovoice.org'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-slate-700/50 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">Role</p>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-eco-400" />
                                <span className="text-white font-medium">Administrator</span>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-700/50 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">Email</p>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="text-white">{adminUser?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-eco-400" />
                    Change Password
                </h2>

                {message && (
                    <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${message.type === 'success'
                            ? 'bg-eco-500/10 border border-eco-500/30 text-eco-400'
                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 shrink-0" />
                        )}
                        <p className="text-sm">{message.text}</p>
                    </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(!showPasswords)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                            >
                                {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="Enter new password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-eco-600 hover:bg-eco-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
                    >
                        {saving ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Update Password
                            </>
                        )}
                    </button>
                </form>

                {/* Password Info */}
                <div className="mt-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <p className="text-xs text-slate-400">
                        <span className="font-medium text-slate-300">Note:</span> Default password is "admin123".
                        After changing, use your new password to login.
                    </p>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/20">
                <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
                <p className="text-sm text-slate-400 mb-4">
                    Reset all settings to default. This will reset your password to "admin123" and clear all preferences.
                </p>
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to reset all settings?')) {
                            localStorage.removeItem('ecovoice_admin_password');
                            setMessage({ type: 'success', text: 'Settings reset to default. Password is now "admin123".' });
                        }
                    }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-xl transition-all text-sm"
                >
                    Reset to Default
                </button>
            </div>
        </div>
    );
}
