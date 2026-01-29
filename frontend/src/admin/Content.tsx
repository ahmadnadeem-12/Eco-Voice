import React, { useState } from 'react';
import {
    Globe,
    Save,
    Edit3,
    X,
    Check,
    RefreshCw,
    Sparkles,
    HelpCircle,
    Users,
    Map,
    MessageSquare,
    Image as ImageIcon
} from 'lucide-react';

// Site content stored in localStorage for demo
const DEFAULT_CONTENT = {
    hero: {
        tagline: "AI-Powered Environmental Reporting",
        title: "EcoVoice",
        subtitle: "Voice. Photos. Real Action. No Barriers.",
        description: "AI-powered environmental reporting for underserved communities. Report violations through voice or photos in your local language."
    },
    stats: [
        { label: "Reports Submitted", value: "1,234" },
        { label: "Communities Served", value: "50+" },
        { label: "Languages Supported", value: "3" },
        { label: "AI Accuracy", value: "95%" }
    ],
    faqs: [
        { question: "How does EcoVoice verify reports?", answer: "EcoVoice uses AI to analyze voice transcriptions, photos, and GPS data to generate a Trust Score for each report." },
        { question: "What languages are supported?", answer: "Currently we support English, Filipino, and Cebuano. More languages coming soon!" },
        { question: "Who receives the reports?", answer: "Reports are automatically routed to relevant LGU offices, DENR, and partner NGOs based on location and incident type." },
        { question: "Is EcoVoice free to use?", answer: "Yes! EcoVoice is completely free for community members to submit reports." }
    ],
    partners: [
        "DENR",
        "Local Government Units",
        "Environmental NGOs",
        "Community Organizations"
    ]
};

function ContentSection({
    title,
    icon: Icon,
    children
}: {
    title: string;
    icon: any;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-eco-500/20 rounded-lg">
                    <Icon className="w-5 h-5 text-eco-400" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
            </div>
            <div className="p-5">
                {children}
            </div>
        </div>
    );
}

function EditableField({
    label,
    value,
    onSave,
    multiline = false
}: {
    label: string;
    value: string;
    onSave: (value: string) => void;
    multiline?: boolean;
}) {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(editValue);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setEditing(false);
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {label}
            </label>
            {editing ? (
                <div className="space-y-2">
                    {multiline ? (
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-eco-500 resize-none"
                        />
                    ) : (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                        />
                    )}
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-3 py-2 bg-eco-600 hover:bg-eco-700 text-white text-xs font-medium rounded-lg transition-all"
                        >
                            <Check className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium rounded-lg transition-all"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-start gap-3 group">
                    <p className="flex-1 text-white text-sm bg-slate-700/30 px-4 py-3 rounded-xl">
                        {value || <span className="text-slate-500 italic">Not set</span>}
                    </p>
                    <button
                        onClick={() => setEditing(true)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Content() {
    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('ecovoice_site_content');
        return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const updateContent = (section: string, key: string, value: any) => {
        setContent((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
        setContent((prev: any) => ({
            ...prev,
            faqs: prev.faqs.map((faq: any, i: number) =>
                i === index ? { ...faq, [field]: value } : faq
            )
        }));
    };

    const addFaq = () => {
        setContent((prev: any) => ({
            ...prev,
            faqs: [...prev.faqs, { question: "New Question", answer: "Answer here..." }]
        }));
    };

    const removeFaq = (index: number) => {
        setContent((prev: any) => ({
            ...prev,
            faqs: prev.faqs.filter((_: any, i: number) => i !== index)
        }));
    };

    const saveAllContent = async () => {
        try {
            setSaving(true);
            localStorage.setItem('ecovoice_site_content', JSON.stringify(content));
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API
            setMessage({ type: 'success', text: 'Content saved successfully!' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to save content.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const resetToDefault = () => {
        if (confirm('Reset all content to default? This cannot be undone.')) {
            setContent(DEFAULT_CONTENT);
            localStorage.removeItem('ecovoice_site_content');
            setMessage({ type: 'success', text: 'Content reset to default.' });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Site Content</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage website content and settings</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={resetToDefault}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                    <button
                        onClick={saveAllContent}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-eco-600 hover:bg-eco-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all text-sm"
                    >
                        {saving ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span>Save All</span>
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success'
                        ? 'bg-eco-500/10 border border-eco-500/30 text-eco-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Hero Section */}
            <ContentSection title="Hero Section" icon={Sparkles}>
                <div className="space-y-4">
                    <EditableField
                        label="Tagline"
                        value={content.hero.tagline}
                        onSave={(value) => updateContent('hero', 'tagline', value)}
                    />
                    <EditableField
                        label="Title"
                        value={content.hero.title}
                        onSave={(value) => updateContent('hero', 'title', value)}
                    />
                    <EditableField
                        label="Subtitle"
                        value={content.hero.subtitle}
                        onSave={(value) => updateContent('hero', 'subtitle', value)}
                    />
                    <EditableField
                        label="Description"
                        value={content.hero.description}
                        onSave={(value) => updateContent('hero', 'description', value)}
                        multiline
                    />
                </div>
            </ContentSection>

            {/* Stats Section */}
            <ContentSection title="Statistics" icon={Map}>
                <div className="grid gap-4 sm:grid-cols-2">
                    {content.stats.map((stat: any, index: number) => (
                        <div key={index} className="bg-slate-700/30 rounded-xl p-4 space-y-3">
                            <input
                                type="text"
                                value={stat.value}
                                onChange={(e) => {
                                    const newStats = [...content.stats];
                                    newStats[index] = { ...stat, value: e.target.value };
                                    setContent((prev: any) => ({ ...prev, stats: newStats }));
                                }}
                                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-eco-500"
                            />
                            <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => {
                                    const newStats = [...content.stats];
                                    newStats[index] = { ...stat, label: e.target.value };
                                    setContent((prev: any) => ({ ...prev, stats: newStats }));
                                }}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-eco-500"
                            />
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* FAQs Section */}
            <ContentSection title="FAQs" icon={HelpCircle}>
                <div className="space-y-4">
                    {content.faqs.map((faq: any, index: number) => (
                        <div key={index} className="bg-slate-700/30 rounded-xl p-4 space-y-3 relative group">
                            <button
                                onClick={() => removeFaq(index)}
                                className="absolute top-3 right-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Question</label>
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Answer</label>
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-eco-500 resize-none"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addFaq}
                        className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                    >
                        <HelpCircle className="w-5 h-5" />
                        Add New FAQ
                    </button>
                </div>
            </ContentSection>

            {/* Partners */}
            <ContentSection title="Partners" icon={Users}>
                <div className="space-y-3">
                    {content.partners.map((partner: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 group">
                            <input
                                type="text"
                                value={partner}
                                onChange={(e) => {
                                    const newPartners = [...content.partners];
                                    newPartners[index] = e.target.value;
                                    setContent((prev: any) => ({ ...prev, partners: newPartners }));
                                }}
                                className="flex-1 px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-eco-500"
                            />
                            <button
                                onClick={() => {
                                    const newPartners = content.partners.filter((_: any, i: number) => i !== index);
                                    setContent((prev: any) => ({ ...prev, partners: newPartners }));
                                }}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            setContent((prev: any) => ({ ...prev, partners: [...prev.partners, "New Partner"] }));
                        }}
                        className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                    >
                        <Users className="w-5 h-5" />
                        Add Partner
                    </button>
                </div>
            </ContentSection>

            {/* Quick Info */}
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                <p className="text-xs text-slate-400">
                    <strong className="text-slate-300">Note:</strong> Changes are saved to browser storage for this demo.
                    In production, these would be stored in a database and reflected on the live website.
                </p>
            </div>
        </div>
    );
}
