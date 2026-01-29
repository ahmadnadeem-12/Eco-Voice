import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        message: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);

        if (!formData.name || !formData.email || !formData.message) {
            setResult({ success: false, message: "Please fill in all required fields." });
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch("http://localhost:8000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to submit");

            setResult({ success: true, message: "Message sent successfully! We'll get back to you soon." });
            setFormData({ name: "", email: "", organization: "", message: "" });
        } catch {
            setResult({ success: false, message: "Failed to send. Make sure backend is running." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-8 sm:py-16 bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        Contact Us
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-eco-100 dark:bg-eco-900/50 rounded-xl shrink-0">
                                        <Mail className="w-5 h-5 text-eco-600 dark:text-eco-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                                        <a href="mailto:hello@ecovoice.ph" className="text-eco-600 dark:text-eco-400">
                                            hello@ecovoice.ph
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-eco-100 dark:bg-eco-900/50 rounded-xl shrink-0">
                                        <Phone className="w-5 h-5 text-eco-600 dark:text-eco-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">Phone</p>
                                        <p className="text-slate-600 dark:text-slate-400">+63 917 123 4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-eco-100 dark:bg-eco-900/50 rounded-xl shrink-0">
                                        <MapPin className="w-5 h-5 text-eco-600 dark:text-eco-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">Location</p>
                                        <p className="text-slate-600 dark:text-slate-400">Manila, Philippines</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-eco-50 dark:bg-eco-900/30 rounded-2xl p-6 border border-eco-200 dark:border-eco-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Partnership Opportunities</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Interested in partnering with EcoVoice? We work with LGUs, NGOs, and environmental organizations.
                                Reach out to discuss how we can collaborate.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 space-y-4">
                        {result && (
                            <div className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 ${result.success
                                    ? "bg-eco-100 dark:bg-eco-900/50 text-eco-800 dark:text-eco-300"
                                    : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
                                }`}>
                                {result.success && <CheckCircle className="w-5 h-5 shrink-0" />}
                                {result.message}
                            </div>
                        )}

                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Name *
                            </span>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="Your name"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Email *
                            </span>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="you@example.com"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Organization (optional)
                            </span>
                            <input
                                type="text"
                                value={formData.organization}
                                onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                                placeholder="Company or organization"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Message *
                            </span>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                rows={4}
                                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent resize-none"
                                placeholder="How can we help you?"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-eco-600 hover:bg-eco-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
                        >
                            {submitting ? "Sending..." : "Send Message"}
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
