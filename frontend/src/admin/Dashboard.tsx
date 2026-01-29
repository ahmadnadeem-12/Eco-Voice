import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiCall, Stats, Report, Contact } from './auth';
import {
    FileText,
    MessageSquare,
    CheckCircle,
    Clock,
    AlertTriangle,
    TrendingUp,
    MapPin,
    RefreshCw,
    Globe,
    Settings,
    Users,
    Eye,
    ArrowRight
} from 'lucide-react';

// Stat Card Component
function StatCard({
    icon: Icon,
    label,
    value,
    color,
    change,
    link
}: {
    icon: any;
    label: string;
    value: number | string;
    color: 'eco' | 'blue' | 'amber' | 'red';
    change?: string;
    link?: string;
}) {
    const colors = {
        eco: 'bg-eco-500/20 text-eco-400 ring-eco-500/30',
        blue: 'bg-blue-500/20 text-blue-400 ring-blue-500/30',
        amber: 'bg-amber-500/20 text-amber-400 ring-amber-500/30',
        red: 'bg-red-500/20 text-red-400 ring-red-500/30',
    };

    const content = (
        <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700/50 hover:border-slate-600 transition-all h-full">
            <div className="flex items-start justify-between gap-2">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ring-1 ${colors[color]}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {change && (
                    <div className="flex items-center gap-1 text-xs text-eco-400 bg-eco-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        {change}
                    </div>
                )}
            </div>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-white">{value}</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{label}</p>
        </div>
    );

    if (link) {
        return <Link to={link} className="block">{content}</Link>;
    }
    return content;
}

// Recent Report Row
function ReportRow({ report }: { report: Report }) {
    const statusColors: Record<string, string> = {
        pending_verification: 'bg-amber-500/20 text-amber-400',
        verified: 'bg-eco-500/20 text-eco-400',
        in_progress: 'bg-blue-500/20 text-blue-400',
        resolved: 'bg-slate-500/20 text-slate-400',
        rejected: 'bg-red-500/20 text-red-400',
    };

    return (
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all">
            <div className={`p-2 rounded-lg shrink-0 ${statusColors[report.status] || 'bg-slate-600 text-slate-300'}`}>
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm sm:text-base truncate">{report.incident_type}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{report.location}</span>
                </div>
            </div>
            <div className="text-right shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[report.status]}`}>
                    {report.status.split('_')[0]}
                </span>
                <p className="text-xs text-slate-500 mt-1">
                    {report.trust_score}%
                </p>
            </div>
        </div>
    );
}

// Contact Row
function ContactRow({ contact }: { contact: Contact }) {
    return (
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{contact.name}</p>
                <p className="text-xs text-slate-400 truncate">{contact.email}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${contact.status === 'read'
                    ? 'bg-eco-500/20 text-eco-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                {contact.status}
            </span>
        </div>
    );
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError('');

            const [statsData, reportsData, contactsData] = await Promise.all([
                apiCall<Stats>('/api/stats'),
                apiCall<Report[]>('/api/reports'),
                apiCall<Contact[]>('/api/contacts')
            ]);

            setStats(statsData);
            setRecentReports(reportsData.slice(0, 5));
            setRecentContacts(contactsData.slice(0, 3));
        } catch (err) {
            console.error('Failed to load data:', err);
            setError('Failed to load data. Make sure the backend is running on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    const populateDemo = async () => {
        try {
            await apiCall('/api/demo/populate', { method: 'POST' });
            loadData();
        } catch (err) {
            console.error('Failed to populate demo data:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-12 w-12 border-4 border-eco-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400 text-sm mt-1">Welcome back! Here's your system overview.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={loadData}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button
                        onClick={populateDemo}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-eco-600 hover:bg-eco-700 text-white font-medium rounded-xl transition-all text-sm"
                    >
                        + Demo Data
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                    <p className="mt-1 text-xs text-red-500">
                        Run: python -m uvicorn app.main:app --reload
                    </p>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard
                    icon={FileText}
                    label="Total Reports"
                    value={stats?.total_reports || 0}
                    color="eco"
                    link="/admin/reports"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Verified"
                    value={stats?.verified_reports || 0}
                    color="blue"
                />
                <StatCard
                    icon={Clock}
                    label="Pending"
                    value={stats?.pending_reports || 0}
                    color="amber"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Contacts"
                    value={stats?.total_contacts || 0}
                    color="eco"
                    link="/admin/contacts"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Recent Reports */}
                <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base sm:text-lg font-semibold text-white">Recent Reports</h2>
                        <Link
                            to="/admin/reports"
                            className="text-xs sm:text-sm text-eco-400 hover:text-eco-300 transition-colors flex items-center gap-1"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {recentReports.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                            <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No reports yet</p>
                            <button
                                onClick={populateDemo}
                                className="mt-2 text-xs sm:text-sm text-eco-400 hover:text-eco-300"
                            >
                                Add demo data
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-3">
                            {recentReports.map((report) => (
                                <ReportRow key={report.id} report={report} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Contacts */}
                <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base sm:text-lg font-semibold text-white">Recent Contacts</h2>
                        <Link
                            to="/admin/contacts"
                            className="text-xs sm:text-sm text-eco-400 hover:text-eco-300 transition-colors flex items-center gap-1"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {recentContacts.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                            <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No contacts yet</p>
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-3">
                            {recentContacts.map((contact) => (
                                <ContactRow key={contact.id} contact={contact} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Incident Types Chart */}
            <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700/50">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Incident Types Breakdown</h2>

                {Object.keys(stats?.incident_types || {}).length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                        <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No incident data yet</p>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {Object.entries(stats?.incident_types || {}).map(([type, count]) => {
                            const total = Object.values(stats?.incident_types || {}).reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

                            return (
                                <div key={type} className="bg-slate-700/30 rounded-xl p-3 sm:p-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-white font-medium truncate">{type}</span>
                                        <span className="text-eco-400 font-bold shrink-0 ml-2">{count}</span>
                                    </div>
                                    <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-eco-500 rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{percentage}% of total</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700/50">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <Link
                        to="/admin/reports"
                        className="p-3 sm:p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group text-center"
                    >
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-eco-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium text-sm">Reports</p>
                    </Link>
                    <Link
                        to="/admin/contacts"
                        className="p-3 sm:p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group text-center"
                    >
                        <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium text-sm">Contacts</p>
                    </Link>
                    <Link
                        to="/admin/content"
                        className="p-3 sm:p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group text-center"
                    >
                        <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium text-sm">Content</p>
                    </Link>
                    <Link
                        to="/admin/settings"
                        className="p-3 sm:p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group text-center"
                    >
                        <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium text-sm">Settings</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
