import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Leaf, ArrowRight, Globe, Users, Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-eco-50 to-white dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-eco-100 dark:bg-eco-900/50 px-4 py-2 text-sm font-semibold text-eco-700 dark:text-eco-300 mb-4">
                        <Leaf className="w-4 h-4" />
                        About EcoVoice
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Empowering Communities to Protect Our Environment
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                        Making environmental reporting accessible to everyone, especially underserved communities.
                    </p>
                </div>
            </section>

            {/* The Problem */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Problem</h2>
                    </div>

                    <div className="space-y-4 text-slate-600 dark:text-slate-300">
                        <p>
                            <strong className="text-slate-900 dark:text-white">Environmental violations often go unreported</strong> because
                            traditional reporting systems are complicated, require internet access, or are only available in English.
                        </p>
                        <p>
                            Farmers, fisherfolk, and rural communities are often the first to witness illegal dumping,
                            water pollution, or deforestation—but they face barriers in reporting these issues.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Complex forms and bureaucratic processes</li>
                            <li>Language barriers (reports only in English)</li>
                            <li>Limited internet connectivity</li>
                            <li>No feedback or status updates</li>
                            <li>Fear of retaliation when not anonymous</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Our Solution */}
            <section className="py-16 bg-eco-50 dark:bg-slate-800">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-eco-100 dark:bg-eco-900/50 rounded-xl">
                            <Leaf className="w-6 h-6 text-eco-600 dark:text-eco-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Solution</h2>
                    </div>

                    <div className="space-y-4 text-slate-600 dark:text-slate-300">
                        <p>
                            <strong className="text-slate-900 dark:text-white">EcoVoice</strong> is an AI-powered platform that makes
                            environmental reporting as simple as speaking or taking a photo.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-3 mt-8">
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center">
                                <Globe className="w-8 h-8 text-eco-600 mx-auto mb-2" />
                                <h3 className="font-bold text-slate-900 dark:text-white">3 Languages</h3>
                                <p className="text-sm">English, Filipino, Cebuano</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center">
                                <Users className="w-8 h-8 text-eco-600 mx-auto mb-2" />
                                <h3 className="font-bold text-slate-900 dark:text-white">Community-First</h3>
                                <p className="text-sm">Built for underserved areas</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center">
                                <Shield className="w-8 h-8 text-eco-600 mx-auto mb-2" />
                                <h3 className="font-bold text-slate-900 dark:text-white">AI Verified</h3>
                                <p className="text-sm">Trust Score for each report</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 italic">
                        "To give every Filipino—regardless of language, location, or resources—the power to protect their environment."
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/report"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-eco-600 hover:bg-eco-700 text-white font-bold rounded-xl transition-all"
                        >
                            Submit a Report <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
