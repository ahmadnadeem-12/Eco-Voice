import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    Leaf,
    Menu,
    X,
    Bell,
    ChevronDown,
    User,
    Home,
    Plus,
    Globe
} from 'lucide-react';

const NAV_ITEMS = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
    { path: '/admin/content', icon: Globe, label: 'Site Content' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
    const { adminUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Close sidebar on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 flex">
            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-700 shrink-0">
                    <div className="w-10 h-10 bg-eco-600 rounded-xl flex items-center justify-center shadow-lg shadow-eco-500/20">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-bold text-white truncate">EcoVoice</h1>
                        <p className="text-xs text-slate-400">Admin Panel</p>
                    </div>
                    <button
                        className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-eco-600 text-white shadow-lg shadow-eco-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-slate-700 space-y-1 shrink-0">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    >
                        <Home className="w-5 h-5 shrink-0" />
                        <span>View Website</span>
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 w-full">
                {/* Header */}
                <header className="h-16 bg-slate-800/80 backdrop-blur-lg border-b border-slate-700 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
                    {/* Left side - Mobile Menu + Title */}
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="w-8 h-8 bg-eco-600 rounded-lg flex items-center justify-center">
                                <Leaf className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-white text-sm">EcoVoice</span>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Notifications */}
                        <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-eco-500 rounded-full" />
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-700 transition-all"
                            >
                                <div className="w-8 h-8 bg-eco-600 rounded-lg flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="hidden sm:block text-sm text-white font-medium max-w-[100px] truncate">
                                    {adminUser?.name || 'Admin'}
                                </span>
                                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-20 overflow-hidden">
                                        <div className="p-3 border-b border-slate-700">
                                            <p className="text-sm text-white font-medium truncate">{adminUser?.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{adminUser?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <NavLink
                                                to="/admin/settings"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </NavLink>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-6 overflow-x-hidden overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
