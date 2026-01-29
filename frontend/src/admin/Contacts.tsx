import React, { useEffect, useState } from 'react';
import { apiCall, Contact } from './auth';
import {
    MessageSquare,
    Search,
    RefreshCw,
    Mail,
    Building2,
    Calendar,
    Eye,
    X,
    Trash2
} from 'lucide-react';

function getStatusBadge(status: string) {
    if (status === 'read') {
        return 'bg-eco-500/20 text-eco-400 ring-eco-500/30';
    }
    return 'bg-amber-500/20 text-amber-400 ring-amber-500/30';
}

export default function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await apiCall<Contact[]>('/api/contacts');
            setContacts(data);
        } catch (err) {
            console.error('Failed to load contacts:', err);
            setError('Failed to load contacts. Make sure the backend is running on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.organization?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Contacts</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {contacts.length} messages received
                    </p>
                </div>
                <button
                    onClick={loadContacts}
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

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-eco-500 text-sm"
                />
            </div>

            {/* Contacts Grid */}
            {filteredContacts.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-500 opacity-50" />
                    <p className="text-slate-400">No contacts found</p>
                    {contacts.length === 0 && (
                        <p className="text-xs text-slate-500 mt-2">Submit a contact form on the website to see messages here</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredContacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer"
                            onClick={() => setSelectedContact(contact)}
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 bg-eco-500/20 rounded-xl flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-5 h-5 text-eco-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                                        <p className="text-xs text-slate-400 truncate">{contact.email}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ring-1 shrink-0 ${getStatusBadge(contact.status)}`}>
                                    {contact.status}
                                </span>
                            </div>

                            {contact.organization && (
                                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                    <Building2 className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{contact.organization}</span>
                                </div>
                            )}

                            <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                                {contact.message}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(contact.created_at).toLocaleDateString()}
                                </div>
                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Contact Detail Modal */}
            {selectedContact && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setSelectedContact(null)}
                    />
                    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-slate-800 border-l border-slate-700 z-50 overflow-y-auto">
                        <div className="p-4 sm:p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg sm:text-xl font-bold text-white">Contact Details</h2>
                                <button
                                    onClick={() => setSelectedContact(null)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-eco-500/20 rounded-2xl flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-eco-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg sm:text-xl font-bold text-white truncate">{selectedContact.name}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ring-1 ${getStatusBadge(selectedContact.status)}`}>
                                            {selectedContact.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-1">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                        <a href={`mailto:${selectedContact.email}`} className="text-eco-400 hover:text-eco-300 break-all">
                                            {selectedContact.email}
                                        </a>
                                    </div>
                                </div>

                                {selectedContact.organization && (
                                    <div className="p-4 bg-slate-700/50 rounded-xl">
                                        <p className="text-xs text-slate-400 mb-1">Organization</p>
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="text-white">{selectedContact.organization}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-2">Message</p>
                                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                                        {selectedContact.message}
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-700/50 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-2">Received</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span className="text-white text-sm">
                                            {new Date(selectedContact.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-eco-600 hover:bg-eco-700 text-white font-medium rounded-xl transition-all text-sm"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
