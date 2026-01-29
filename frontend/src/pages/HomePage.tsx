import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Leaf, ArrowRight, Mic, Camera, Sparkles, ShieldCheck, Building2, CheckCircle2,
    FileText, Users, Globe, Zap, TrendingUp, Award
} from 'lucide-react';

export default function HomePage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-eco-50 via-white to-eco-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-eco-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-eco-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 py-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-eco-100 dark:bg-eco-900/50 px-4 py-2 text-sm font-semibold text-eco-700 dark:text-eco-300 mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Environmental Reporting
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
                        <span className="text-eco-600">Eco</span>Voice
                    </h1>

                    <p className="text-xl sm:text-2xl text-eco-700 dark:text-eco-400 font-semibold mb-4">
                        Voice. Photos. Real Action. No Barriers.
                    </p>

                    <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8">
                        Report environmental violations through voice or photos in your local language.
                        AI-powered verification ensures your reports reach the right authorities.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/report"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-eco-600 hover:bg-eco-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Report an Issue <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/how-it-works"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:border-eco-500"
                        >
                            Learn How It Works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <StatCard icon={<FileText />} value="1,200+" label="Reports Submitted" />
                        <StatCard icon={<Users />} value="50+" label="Communities Served" />
                        <StatCard icon={<Globe />} value="3" label="Languages Supported" />
                        <StatCard icon={<Award />} value="95%" label="AI Accuracy" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            Why EcoVoice?
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Simple, accessible environmental reporting for everyone
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={<Mic className="w-6 h-6" />}
                            title="Voice Reporting"
                            description="Simply speak your report in your local language - English, Filipino, or Cebuano."
                        />
                        <FeatureCard
                            icon={<Camera className="w-6 h-6" />}
                            title="Photo Evidence"
                            description="Capture photos of violations. AI analyzes images for automatic classification."
                        />
                        <FeatureCard
                            icon={<Sparkles className="w-6 h-6" />}
                            title="AI Verification"
                            description="Each report gets a Trust Score based on evidence quality and GPS verification."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="w-6 h-6" />}
                            title="Anonymous Option"
                            description="Report anonymously if you prefer - your identity is protected."
                        />
                        <FeatureCard
                            icon={<Building2 className="w-6 h-6" />}
                            title="Direct Routing"
                            description="Reports automatically go to LGUs, DENR, and relevant authorities."
                        />
                        <FeatureCard
                            icon={<CheckCircle2 className="w-6 h-6" />}
                            title="Status Updates"
                            description="Track your report status and get SMS notifications on progress."
                        />
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            Our Partners
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Working together for a cleaner environment
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <PartnerCard name="DENR" description="Department of Environment" />
                        <PartnerCard name="LGUs" description="Local Government Units" />
                        <PartnerCard name="NGOs" description="Environmental Organizations" />
                        <PartnerCard name="Communities" description="Local Communities" />
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            Roadmap
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Our journey to protect the environment
                        </p>
                    </div>

                    <div className="space-y-4">
                        <RoadmapItem
                            phase="Phase 1"
                            title="Foundation"
                            status="done"
                            items={["Voice & Photo Reporting", "AI Classification", "Trust Score System"]}
                        />
                        <RoadmapItem
                            phase="Phase 2"
                            title="Expansion"
                            status="current"
                            items={["SMS Integration", "More Languages", "Mobile App"]}
                        />
                        <RoadmapItem
                            phase="Phase 3"
                            title="Scale"
                            status="upcoming"
                            items={["Nationwide Coverage", "Real-time Tracking", "Partner Dashboard"]}
                        />
                        <RoadmapItem
                            phase="Phase 4"
                            title="Impact"
                            status="upcoming"
                            items={["Data Analytics", "Policy Advocacy", "Community Programs"]}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-eco-600 dark:bg-eco-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-eco-100 mb-8">
                        Join communities across the Philippines in protecting our environment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/report"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eco-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Submit a Report <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-eco-500 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-eco-400 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="text-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eco-100 dark:bg-eco-900/50 rounded-xl flex items-center justify-center text-eco-600 dark:text-eco-400 mx-auto mb-3">
                {icon}
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{label}</p>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-eco-500 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-eco-100 dark:bg-eco-900/50 rounded-xl flex items-center justify-center text-eco-600 dark:text-eco-400 mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
        </div>
    );
}

function PartnerCard({ name, description }: { name: string; description: string }) {
    return (
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center hover:border-eco-500 transition-all">
            <div className="w-14 h-14 bg-eco-100 dark:bg-eco-900/50 rounded-full flex items-center justify-center text-eco-600 dark:text-eco-400 mx-auto mb-3">
                <Building2 className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">{name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    );
}

function RoadmapItem({ phase, title, status, items }: { phase: string; title: string; status: 'done' | 'current' | 'upcoming'; items: string[] }) {
    const statusStyles = {
        done: 'border-eco-500 bg-eco-50 dark:bg-eco-900/30',
        current: 'border-amber-500 bg-amber-50 dark:bg-amber-900/30',
        upcoming: 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800',
    };

    const badgeStyles = {
        done: 'bg-eco-500 text-white',
        current: 'bg-amber-500 text-white',
        upcoming: 'bg-slate-400 text-white',
    };

    return (
        <div className={`p-4 sm:p-5 rounded-2xl border-2 ${statusStyles[status]}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeStyles[status]}`}>
                        {phase}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
                </div>
                {status === 'done' && <CheckCircle2 className="w-5 h-5 text-eco-500" />}
                {status === 'current' && <Zap className="w-5 h-5 text-amber-500" />}
            </div>
            <ul className="space-y-1">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'done' ? 'bg-eco-500' : status === 'current' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
