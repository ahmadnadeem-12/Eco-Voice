import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Moon, Sun, Menu, X, Home, Info, Zap, FileText, Phone as PhoneIcon, HelpCircle } from 'lucide-react';
import AIChatbot, { ChatbotRef } from '../components/AIChatbot';

const NAV_LINKS = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/how-it-works', label: 'How It Works', icon: Zap },
    { path: '/report', label: 'Report', icon: FileText },
    { path: '/contact', label: 'Contact', icon: PhoneIcon },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const chatbotRef = useRef<ChatbotRef>(null);

    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        const isDark = saved === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        document.documentElement.classList.toggle('dark', newMode);
    };

    const openFAQ = () => {
        chatbotRef.current?.open();
        setMobileMenuOpen(false);
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
                    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-eco-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl hidden sm:block">EcoVoice</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${location.pathname === link.path
                                        ? 'bg-eco-100 dark:bg-eco-900/50 text-eco-700 dark:text-eco-300'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* FAQ Button - Opens Chatbot */}
                            <button
                                onClick={openFAQ}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                FAQ
                            </button>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <Link
                                to="/admin"
                                className="hidden sm:block px-4 py-2 bg-eco-600 hover:bg-eco-700 text-white font-medium rounded-xl text-sm transition-all"
                            >
                                Admin
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <div className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-800 z-50 lg:hidden shadow-2xl">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                <span className="font-bold text-lg">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-slate-600 dark:text-slate-400"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <nav className="p-4 space-y-1">
                                {NAV_LINKS.map(link => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path
                                            ? 'bg-eco-100 dark:bg-eco-900/50 text-eco-700 dark:text-eco-300'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        {link.label}
                                    </Link>
                                ))}
                                {/* FAQ Button in Mobile Menu */}
                                <button
                                    onClick={openFAQ}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                    FAQ
                                </button>
                                <Link
                                    to="/admin"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-eco-600 text-white mt-4"
                                >
                                    <Leaf className="w-5 h-5" />
                                    Admin Panel
                                </Link>
                            </nav>
                        </div>
                    </>
                )}

                {/* Main Content */}
                <main className="pt-16">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                    <div className="max-w-6xl mx-auto px-4 py-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-eco-600 rounded-lg flex items-center justify-center">
                                    <Leaf className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold">EcoVoice</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <Link to="/about" className="hover:text-eco-600 dark:hover:text-eco-400">About</Link>
                                <button onClick={openFAQ} className="hover:text-eco-600 dark:hover:text-eco-400">FAQ</button>
                                <Link to="/contact" className="hover:text-eco-600 dark:hover:text-eco-400">Contact</Link>
                                <Link to="/admin" className="hover:text-eco-600 dark:hover:text-eco-400">Admin</Link>
                            </div>
                            <p className="text-xs text-slate-500">© 2025 EcoVoice</p>
                        </div>
                    </div>
                </footer>

                {/* AI Chatbot */}
                <AIChatbot ref={chatbotRef} />
            </div>
        </div>
    );
}
