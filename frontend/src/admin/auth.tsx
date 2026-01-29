import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Auth Context
interface AuthContextType {
    isAuthenticated: boolean;
    adminUser: AdminUser | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

interface AdminUser {
    id: string;
    email: string;
    name: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// Default admin credentials (in production, this would be in the backend)
const DEFAULT_ADMIN = {
    email: 'admin@ecovoice.org',
    password: 'admin123',
    name: 'EcoVoice Admin'
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored token on mount
        const token = localStorage.getItem('ecovoice_admin_token');
        const storedUser = localStorage.getItem('ecovoice_admin_user');

        if (token && storedUser) {
            try {
                setAdminUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem('ecovoice_admin_token');
                localStorage.removeItem('ecovoice_admin_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Get stored password or use default
        const storedPassword = localStorage.getItem('ecovoice_admin_password') || DEFAULT_ADMIN.password;

        if (email === DEFAULT_ADMIN.email && password === storedPassword) {
            const user: AdminUser = {
                id: '1',
                email: DEFAULT_ADMIN.email,
                name: DEFAULT_ADMIN.name
            };

            const token = btoa(`${email}:${Date.now()}`); // Simple token
            localStorage.setItem('ecovoice_admin_token', token);
            localStorage.setItem('ecovoice_admin_user', JSON.stringify(user));

            setAdminUser(user);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('ecovoice_admin_token');
        localStorage.removeItem('ecovoice_admin_user');
        setAdminUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// API Helper
const API_BASE = 'http://localhost:8000';

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('ecovoice_admin_token');

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

// Types for API
export interface Report {
    id: string;
    reporter_name: string;
    description: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    incident_type: string;
    language: string;
    trust_score: number;
    status: string;
    ai_classification: string | null;
    photo_urls: string[];
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    organization: string | null;
    message: string;
    created_at: string;
    status: string;
}

export interface Stats {
    total_reports: number;
    verified_reports: number;
    pending_reports: number;
    resolved_reports: number;
    total_contacts: number;
    incident_types: Record<string, number>;
}
