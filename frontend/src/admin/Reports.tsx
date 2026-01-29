import React, { useEffect, useState } from 'react';
import { apiCall, Report } from './auth';
import {
    FileText,
    Search,
    MapPin,
    Eye,
    RefreshCw,
    X,
    Trash2,
    Filter,
    ChevronDown
} from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'pending_verification', label: 'Pending', color: 'amber' },
    { value: 'verified', label: 'Verified', color: 'eco' },
    { value: 'in_progress', label: 'In Progress', color: 'blue' },
    { value: 'resolved', label: 'Resolved', color: 'slate' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
];

const INCIDENT_TYPES = [
    'Illegal Dumping',
    'Water Pollution',
    'Air Pollution',
    'Illegal Logging',
    'Wildlife Crime',
    'Land Degradation',
    'Coastal Damage',
    'Other'
];

function getStatusBadge(status: string) {
    const statusConfig: Record<string, string> = {
        pending_verification: 'bg-amber-500/20 text-amber-400 ring-amber-500/30',
        verified: 'bg-eco-500/20 text-eco-400 ring-eco-500/30',
        in_progress: 'bg-blue-500/20 text-blue-400 ring-blue-500/30',
        resolved: 'bg-slate-500/20 text-slate-400 ring-slate-500/30',
        rejected: 'bg-red-500/20 text-red-400 ring-red-500/30',
    };
    return statusConfig[status] || 'bg-slate-600 text-slate-300';
}

function getTrustScoreColor(score: number) {
    if (score >= 80) return 'text-eco-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
}

export default function Reports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [updating, setUpdating] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await apiCall<Report[]>('/api/reports');
            setReports(data);
        } catch (err) {
            console.error('Failed to load reports:', err);
            setError('Failed to load reports. Make sure the backend is running on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (reportId: string, newStatus: string) => {
        try {
            setUpdating(true);
            await apiCall(`/api/reports/${reportId}/status?status=${newStatus}`, {
                method: 'PATCH'
            });
            await loadReports();
            if (selectedReport?.id === reportId) {
                setSelectedReport(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setUpdating(false);
        }
    };

    // Filter reports
    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.reporter_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || report.status === statusFilter;
        const matchesType = !typeFilter || report.incident_type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-12 w-12 border-4 border-eco-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Reports</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {reports.length} total reports
                    </p>
                </div>
                <button
                    onClick={loadReports}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all text-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Search & Filters */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm ${showFilters || statusFilter || typeFilter
                                ? 'bg-eco-600 border-eco-500 text-white'
                                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                    >
                        <Filter className="w-5 h-5" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>

                {/* Filter dropdowns */}
                {showFilters && (
                    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                        >
                            <option value="">All Status</option>
                            {STATUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                        >
                            <option value="">All Types</option>
                            {INCIDENT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => { setStatusFilter(''); setTypeFilter(''); }}
                            className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>

            {/* Reports List - Mobile Cards / Desktop Table */}
            {filteredReports.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-500 opacity-50" />
                    <p className="text-slate-400">No reports found</p>
                </div>
            ) : (
                <>
                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-3">
                        {filteredReports.map((report) => (
                            <div
                                key={report.id}
                                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-3"
                                onClick={() => setSelectedReport(report)}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-eco-500/20 rounded-lg shrink-0">
                                            <FileText className="w-5 h-5 text-eco-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-medium truncate">{report.incident_type}</p>
                                            <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                                <MapPin className="w-3 h-3 shrink-0" />
                                                <span className="truncate">{report.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${getStatusBadge(report.status)}`}>
                                        {report.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">{report.reporter_name}</span>
                                    <span className={`font-bold ${getTrustScoreColor(report.trust_score)}`}>
                                        {report.trust_score}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="text-left text-sm font-semibold text-slate-400 px-6 py-4">Type</th>
                                        <th className="text-left text-sm font-semibold text-slate-400 px-6 py-4">Location</th>
                                        <th className="text-left text-sm font-semibold text-slate-400 px-6 py-4">Reporter</th>
                                        <th className="text-left text-sm font-semibold text-slate-400 px-6 py-4">Score</th>
                                        <th className="text-left text-sm font-semibold text-slate-400 px-6 py-4">Status</th>
                                        <th className="text-left text-sm font-semibold text-slate-400 px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.map((report) => (
                                        <tr
                                            key={report.id}
                                            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-eco-500/20 rounded-lg shrink-0">
                                                        <FileText className="w-4 h-4 text-eco-400" />
                                                    </div>
                                                    <span className="text-white font-medium">{report.incident_type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                                                    <span className="truncate max-w-[200px]">{report.location}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300">{report.reporter_name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`font-bold ${getTrustScoreColor(report.trust_score)}`}>
                                                    {report.trust_score}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs px-3 py-1 rounded-full ring-1 ${getStatusBadge(report.status)}`}>
                                                    {report.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedReport(report)}
                                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Report Detail Modal */}
            {selectedReport && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setSelectedReport(null)}
                    />
                    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-slate-800 border-l border-slate-700 z-50 overflow-y-auto">
                        <div className="p-4 sm:p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg sm:text-xl font-bold text-white">Report Details</h2>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Report Info */}
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className={`text-xs px-3 py-1 rounded-full ring-1 w-fit ${getStatusBadge(selectedReport.status)}`}>
                                        {selectedReport.status.replace('_', ' ')}
                                    </span>
                                    <span className={`text-lg font-bold ${getTrustScoreColor(selectedReport.trust_score)}`}>
                                        Trust: {selectedReport.trust_score}%
                                    </span>
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-1">Incident Type</p>
                                    <p className="text-white font-semibold">{selectedReport.incident_type}</p>
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-1">Location</p>
                                    <p className="text-white">{selectedReport.location}</p>
                                    {selectedReport.latitude && selectedReport.longitude && (
                                        <p className="text-xs text-slate-500 mt-1">
                                            GPS: {selectedReport.latitude}, {selectedReport.longitude}
                                        </p>
                                    )}
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-1">Description</p>
                                    <p className="text-white text-sm leading-relaxed">{selectedReport.description}</p>
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-1">Reporter</p>
                                    <p className="text-white">{selectedReport.reporter_name}</p>
                                    <p className="text-xs text-slate-500 mt-1">Language: {selectedReport.language}</p>
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-2">Submitted</p>
                                    <p className="text-white text-sm">
                                        {new Date(selectedReport.created_at).toLocaleString()}
                                    </p>
                                </div>

                                {/* Update Status */}
                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-3">Update Status</p>
                                    <div className="flex flex-wrap gap-2">
                                        {STATUS_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                disabled={updating || selectedReport.status === opt.value}
                                                onClick={() => updateStatus(selectedReport.id, opt.value)}
                                                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${selectedReport.status === opt.value
                                                        ? 'bg-eco-600 text-white'
                                                        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
