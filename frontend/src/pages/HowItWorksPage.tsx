import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Camera, Sparkles, ShieldCheck, Building2, MessageSquareText, ArrowRight } from 'lucide-react';

const STEPS = [
    {
        icon: Mic,
        title: "Speak or Type",
        description: "Record your report in English, Filipino, or Cebuano. AI transcribes your voice automatically."
    },
    {
        icon: Camera,
        title: "Add Photos",
        description: "Take photos of the violation. AI analyzes images for pollution, waste, or damage."
    },
    {
        icon: Sparkles,
        title: "AI Analysis",
        description: "Our AI verifies your report, classifies the incident type, and generates a Trust Score."
    },
    {
        icon: ShieldCheck,
        title: "Verification",
        description: "GPS location and evidence are checked. Higher Trust Score = faster response."
    },
    {
        icon: Building2,
        title: "Auto-Routing",
        description: "Report goes directly to LGUs, DENR, or relevant authorities based on location and type."
    },
    {
        icon: MessageSquareText,
        title: "Get Updates",
        description: "Receive SMS updates on your report status. Track progress until resolution."
    }
];

export default function HowItWorksPage() {
    return (
        <div>
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-eco-50 to-white dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        How EcoVoice Works
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                        From report to resolution in 6 simple steps
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="space-y-6">
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
                            >
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-eco-100 dark:bg-eco-900/50 rounded-xl flex items-center justify-center relative">
                                        <step.icon className="w-6 h-6 text-eco-600 dark:text-eco-400" />
                                        <span className="absolute -top-2 -left-2 w-6 h-6 bg-eco-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-eco-50 dark:bg-slate-800">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                        Built For Everyone
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Mobile-First</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Works on any smartphone</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Local Languages</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">English, Filipino, Cebuano</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Anonymous</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Report without revealing identity</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-eco-600 dark:bg-eco-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Report?</h2>
                    <Link
                        to="/report"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-eco-700 font-bold rounded-xl"
                    >
                        Submit a Report <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
