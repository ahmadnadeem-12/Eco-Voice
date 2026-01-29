import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const INCIDENT_TYPES = [
    "Illegal Dumping",
    "Water Pollution",
    "Air Pollution",
    "Illegal Logging",
    "Wildlife Crime",
    "Land Degradation",
    "Coastal Damage",
    "Other"
];

export default function ReportPage() {
    const [formData, setFormData] = useState({
        reporter_name: "",
        reporter_phone: "",
        description: "",
        location: "",
        incident_type: "Illegal Dumping",
        language: "en"
    });
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string; trustScore?: number } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);

        if (!formData.description || !formData.location) {
            setResult({ success: false, message: "Please fill in description and location." });
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch("http://localhost:8000/api/reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to submit");

            const data = await res.json();
            setResult({
                success: true,
                message: `Report submitted successfully! ID: ${data.id.slice(0, 8)}...`,
                trustScore: data.trust_score
            });

            setFormData({
                reporter_name: "",
                reporter_phone: "",
                description: "",
                location: "",
                incident_type: "Illegal Dumping",
                language: "en"
            });
        } catch {
            setResult({
                success: false,
                message: "Failed to submit. Make sure backend is running on port 8000."
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-8 sm:py-16 bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        Report an Environmental Issue
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Your report will be verified and sent to the right authorities.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 space-y-5">
                    {result && (
                        <div className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 ${result.success
                                ? "bg-eco-100 dark:bg-eco-900/50 text-eco-800 dark:text-eco-300"
                                : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
                            }`}>
                            {result.success && <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                            <div>
                                {result.message}
                                {result.trustScore && (
                                    <p className="mt-1 font-bold">Trust Score: {result.trustScore}%</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Your Name (optional)
                            </span>
                            <input
                                type="text"
                                value={formData.reporter_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, reporter_name: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="Anonymous if empty"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Phone (optional)
                            </span>
                            <input
                                type="tel"
                                value={formData.reporter_phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, reporter_phone: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="For SMS updates"
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Incident Type *
                            </span>
                            <select
                                value={formData.incident_type}
                                onChange={(e) => setFormData(prev => ({ ...prev, incident_type: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500"
                            >
                                {INCIDENT_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Language
                            </span>
                            <select
                                value={formData.language}
                                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500"
                            >
                                <option value="en">English</option>
                                <option value="fil">Filipino</option>
                                <option value="ceb">Cebuano</option>
                            </select>
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Location *
                        </span>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                            placeholder="Barangay, City, Province"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Description *
                        </span>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent resize-none"
                            placeholder="Describe what you observed in detail..."
                            required
                            minLength={10}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-eco-600 hover:bg-eco-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
                    >
                        {submitting ? "Submitting..." : "Submit Report"}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
