import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "How does EcoVoice verify reports?",
        answer: "EcoVoice uses AI to analyze voice transcriptions, photos, and GPS data. Each report receives a Trust Score (0-100%) based on evidence quality, location verification, and detail level. Higher scores get prioritized by authorities."
    },
    {
        question: "What languages are supported?",
        answer: "Currently we support English, Filipino (Tagalog), and Cebuano. Our AI can transcribe voice reports in these languages. More Philippine languages are planned for future updates."
    },
    {
        question: "Who receives the reports?",
        answer: "Reports are automatically routed to relevant authorities based on location and incident type. This includes Local Government Units (LGUs), DENR (Department of Environment and Natural Resources), and partner NGOs."
    },
    {
        question: "Is EcoVoice free to use?",
        answer: "Yes! EcoVoice is completely free for community members to submit reports. We believe environmental protection should be accessible to everyone."
    },
    {
        question: "Can I report anonymously?",
        answer: "Absolutely. You can submit a report without providing your name or phone number. Anonymous reports are still verified and processed, though providing contact info allows us to send you status updates."
    },
    {
        question: "What types of violations can I report?",
        answer: "You can report: Illegal Dumping, Water Pollution, Air Pollution, Illegal Logging, Wildlife Crime, Land Degradation, Coastal Damage, and other environmental issues."
    },
    {
        question: "How do I track my report status?",
        answer: "If you provide a phone number, you'll receive SMS updates when your report status changes. You can also check with local authorities using your report ID."
    },
    {
        question: "What is the Trust Score?",
        answer: "The Trust Score (0-100%) indicates how verified a report is. It increases with: GPS location (+10%), photos (+5%), detailed description (+5%), and contact info (+5%). Higher scores help authorities prioritize real violations."
    }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="font-semibold text-slate-900 dark:text-white pr-4">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="py-8 sm:py-16 bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-eco-100 dark:bg-eco-900/50 rounded-2xl mb-4">
                        <HelpCircle className="w-7 h-7 text-eco-600 dark:text-eco-400" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Everything you need to know about EcoVoice
                    </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
                    {FAQS.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-eco-600 hover:bg-eco-700 text-white font-bold rounded-xl transition-all"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
