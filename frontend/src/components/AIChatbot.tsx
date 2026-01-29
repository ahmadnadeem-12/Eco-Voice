import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Bot, X, Send, Leaf, HelpCircle } from 'lucide-react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

const KNOWLEDGE = {
    greetings: [
        "Hello! 👋 I'm EcoVoice AI. How can I help you today?",
        "Hi there! Ask me anything about environmental reporting!",
    ],
    topics: [
        {
            keywords: ['report', 'submit', 'how to'],
            response: "To submit a report:\n1. Go to the Report page\n2. Fill in location and description\n3. Choose incident type\n4. Click Submit\n\nYour report will be verified by AI and sent to authorities!"
        },
        {
            keywords: ['anonymous', 'privacy', 'identity'],
            response: "Yes! You can report anonymously. Just leave the name field empty. Your identity is protected even when you provide contact info for updates."
        },
        {
            keywords: ['language', 'filipino', 'cebuano', 'english'],
            response: "EcoVoice supports 3 languages:\n• English\n• Filipino (Tagalog)\n• Cebuano\n\nMore Philippine languages coming soon!"
        },
        {
            keywords: ['trust score', 'verification', 'verify'],
            response: "Trust Score (0-100%) shows how verified a report is:\n• +10 points: GPS location\n• +5 points: Photos attached\n• +5 points: Detailed description\n• +5 points: Contact info\n\nHigher scores get faster response!"
        },
        {
            keywords: ['types', 'incident', 'violations', 'what can'],
            response: "You can report:\n• Illegal Dumping\n• Water Pollution\n• Air Pollution\n• Illegal Logging\n• Wildlife Crime\n• Land Degradation\n• Coastal Damage\n• Other environmental issues"
        },
        {
            keywords: ['who', 'receives', 'authorities', 'sent'],
            response: "Reports go to:\n• Local Government Units (LGUs)\n• DENR (Dept. of Environment)\n• Environmental NGOs\n\nRouting is automatic based on location & type!"
        },
        {
            keywords: ['track', 'status', 'update', 'sms'],
            response: "Track your report:\n• Add your phone number when reporting\n• Get SMS updates on status changes\n• Contact local authorities with your Report ID"
        },
        {
            keywords: ['free', 'cost', 'pay'],
            response: "EcoVoice is 100% FREE! We believe environmental protection should be accessible to everyone."
        },
        {
            keywords: ['contact', 'help', 'support'],
            response: "Need help? Contact us:\n• Email: hello@ecovoice.ph\n• Go to Contact page\n• Or ask me your questions here!"
        },
    ],
    fallback: "I'm not sure about that. Try asking about:\n• How to submit reports\n• Languages supported\n• Trust Score system\n• What you can report\n\nOr visit our FAQ page!"
};

function getResponse(input: string): string {
    const lower = input.toLowerCase();

    if (lower.match(/^(hi|hello|hey|good|sup|yo)/)) {
        return KNOWLEDGE.greetings[Math.floor(Math.random() * KNOWLEDGE.greetings.length)];
    }

    for (const topic of KNOWLEDGE.topics) {
        if (topic.keywords.some(kw => lower.includes(kw))) {
            return topic.response;
        }
    }

    return KNOWLEDGE.fallback;
}

export interface ChatbotRef {
    open: () => void;
}

const AIChatbot = forwardRef<ChatbotRef>((_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! 👋 I'm EcoVoice AI. Ask me anything about environmental reporting!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true)
    }));

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input.trim(),
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Bot response after short delay
        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text: getResponse(input),
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-4 bg-eco-600 hover:bg-eco-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all ${isOpen ? 'hidden' : ''}`}
            >
                <Bot className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-96 h-[70vh] sm:h-[500px] bg-white dark:bg-slate-800 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-eco-600 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Leaf className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold">EcoVoice AI</h3>
                                <p className="text-xs text-eco-200">Ask me anything!</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === 'user'
                                            ? 'bg-eco-600 text-white rounded-br-md'
                                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-md'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-eco-500"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-eco-600 hover:bg-eco-700 text-white rounded-xl transition-all"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
});

AIChatbot.displayName = 'AIChatbot';

export default AIChatbot;
