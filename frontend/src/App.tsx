import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Mic,
  Camera,
  Sparkles,
  ShieldCheck,
  Building2,
  MessageSquareText,
  Leaf,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Handshake,
  HelpCircle,
  Moon,
  Sun,
  Menu,
  X,
  Bot,
  Send,
} from "lucide-react";

type Toast = { type: "success" | "error"; message: string };

const NAV = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "how", label: "How It Works" },
  { id: "report", label: "Report Issue" },
  { id: "roadmap", label: "Roadmap" },
  { id: "impact", label: "Impact" },
  { id: "contact", label: "Contact" },
] as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center scroll-reveal">
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-wide text-eco-700 dark:text-eco-400 neon-text">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl animated-text-gradient">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-eco-100 dark:bg-eco-900/50 px-4 py-2 text-sm font-semibold text-eco-800 dark:text-eco-300 ring-1 ring-eco-200 dark:ring-eco-700 shadow-lg">
      {children}
    </span>
  );
}

function Card({
  icon,
  title,
  children,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glow-card rounded-2xl p-6 group",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-eco-500 to-eco-700 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-eco-500/30">
            {icon}
          </div>
        ) : null}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-eco-700 dark:group-hover:text-eco-400 transition-colors">{title}</h3>
          <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
  icon,
}: {
  n: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex items-start gap-4 rounded-2xl bg-white dark:bg-slate-800 p-5 ring-1 ring-slate-200/70 dark:ring-slate-700">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eco-100 dark:bg-eco-900/50 text-eco-800 dark:text-eco-300 ring-1 ring-eco-200 dark:ring-eco-700">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-eco-700 dark:text-eco-400">
          Step {n}
        </p>
        <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
      </div>
    </div>
  );
}

function CTAButton({
  children,
  href,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none group";
  const styles =
    variant === "primary"
      ? "bg-eco-600 text-white hover:bg-eco-700 shadow-lg shadow-eco-500/20 button-glow scale-hover"
      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:ring-eco-200 dark:hover:ring-eco-600 scale-hover";
  const Comp: any = href ? "a" : "button";
  return (
    <Comp className={cn(base, styles)} href={href} onClick={onClick}>
      {children} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Comp>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 0.2, 0.4, 0.6] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// Report Submission Form Component
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

function ReportForm({ apiBase }: { apiBase: string }) {
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
      const res = await fetch(`${apiBase}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      setResult({
        success: true,
        message: `Report submitted successfully! Your report ID is ${data.id.slice(0, 8)}...`,
        trustScore: data.trust_score
      });

      // Reset form
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
        message: "Failed to submit report. Make sure the backend is running."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white dark:bg-slate-800 p-6 ring-1 ring-slate-200/70 dark:ring-slate-700 space-y-4">
      {result && (
        <div className={cn(
          "p-4 rounded-xl text-sm font-medium",
          result.success
            ? "bg-eco-100 dark:bg-eco-900/50 text-eco-800 dark:text-eco-300"
            : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
        )}>
          {result.message}
          {result.trustScore && (
            <p className="mt-1 text-eco-600 dark:text-eco-400">
              Trust Score: {result.trustScore}%
            </p>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Your Name (optional)
          <input
            name="reporter_name"
            value={formData.reporter_name}
            onChange={(e) => setFormData(prev => ({ ...prev, reporter_name: e.target.value }))}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 placeholder:text-slate-400"
            placeholder="Anonymous if empty"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Phone (optional)
          <input
            name="reporter_phone"
            value={formData.reporter_phone}
            onChange={(e) => setFormData(prev => ({ ...prev, reporter_phone: e.target.value }))}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 placeholder:text-slate-400"
            placeholder="For SMS updates"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Incident Type *
          <select
            value={formData.incident_type}
            onChange={(e) => setFormData(prev => ({ ...prev, incident_type: e.target.value }))}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800"
          >
            {INCIDENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Language
          <select
            value={formData.language}
            onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800"
          >
            <option value="en">English</option>
            <option value="fil">Filipino</option>
            <option value="ceb">Cebuano</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
        Location *
        <input
          name="location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 placeholder:text-slate-400"
          placeholder="Barangay, City, Province"
          required
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
        Description *
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 placeholder:text-slate-400"
          placeholder="Describe the environmental issue in detail..."
          required
          minLength={10}
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-eco-700 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-all duration-300 hover:bg-eco-800 disabled:cursor-not-allowed disabled:opacity-70 button-glow"
        )}
      >
        {submitting ? "Submitting..." : "Submit Report"} <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        Your report will be verified using AI and routed to the appropriate authorities.
      </p>
    </form>
  );
}

export default function App() {
  const active = useActiveSection(NAV.map((n) => n.id));
  const [toast, setToast] = useState<Toast | null>(null);
  const [sending, setSending] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Dark mode effect
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const isDark = saved === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const apiBase = useMemo(() => {
    // In dev you can set: VITE_API_URL=http://localhost:8000
    return (import.meta as any).env.VITE_API_URL || "http://localhost:8000";
  }, []);

  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      organization: String(fd.get("organization") || ""),
      message: String(fd.get("message") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setToast({ type: "error", message: "Please fill Name, Email, and Message." });
      return;
    }

    try {
      setSending(true);
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      (e.currentTarget as HTMLFormElement).reset();
      setToast({ type: "success", message: "Message sent! We'll get back to you soon." });
    } catch {
      setToast({
        type: "error",
        message:
          "Could not send message. Start backend (FastAPI) or set VITE_API_URL.",
      });
    } finally {
      setSending(false);
      window.setTimeout(() => setToast(null), 4500);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-700/70 glass shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-2 font-extrabold group">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-eco-700 text-white shadow-sm group-hover:scale-110 transition-transform pulse-glow">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="gradient-text">EcoVoice</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300",
                  active === item.id
                    ? "bg-eco-600 text-white shadow-lg shadow-eco-500/30"
                    : "text-slate-700 dark:text-white hover:bg-eco-500/20 dark:hover:bg-eco-500/30 hover:text-eco-700 dark:hover:text-eco-300"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:bg-eco-100 dark:hover:bg-eco-900/50 transition-all scale-hover shadow-sm"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-eco-100 dark:hover:bg-eco-900/50 transition-all shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <CTAButton href="#contact" variant="secondary">
                Request a Demo
              </CTAButton>
              <CTAButton href="#how" variant="primary">
                Report Now
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="px-4 py-3 space-y-1 border-t border-slate-200/70 dark:border-slate-700/70">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300",
                  active === item.id
                    ? "bg-eco-600 text-white shadow-md"
                    : "text-slate-700 dark:text-white hover:bg-eco-500/20 dark:hover:bg-eco-500/30"
                )}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <CTAButton href="#contact" variant="secondary">
                Request a Demo
              </CTAButton>
              <CTAButton href="#how" variant="primary">
                Report Now
              </CTAButton>
              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {darkMode ? <><Sun className="h-4 w-4" /> Light Mode</> : <><Moon className="h-4 w-4" /> Dark Mode</>}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main id="home" className="relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-eco-200 dark:bg-eco-900/40 blur-3xl opacity-60 float-animation" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        <div className="absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-eco-300 dark:bg-eco-800/40 blur-3xl opacity-50 float-animation" style={{ animationDelay: '3s', transform: `translateY(${-scrollY * 0.2}px)` }} />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Pill>
                <Sparkles className="h-4 w-4" />
                Environmental Reporting Made Simple
              </Pill>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                EcoVoice: AI‑Powered Environmental Reporter for Underserved
                Communities
              </h1>

              <p className="mt-4 text-lg leading-8 text-white/80">
                <span className="font-semibold text-white">
                  “Voice. Photos. Real Action. No Barriers.”
                </span>{" "}
                Report illegal dumping, pollution, and environmental harm in
                seconds — even with low literacy or limited connectivity. EcoVoice
                helps communities speak up, verifies reports with AI, and routes
                them directly to LGUs, DENR‑type departments, and partner NGOs.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="#how" variant="primary">
                  Report an Issue
                </CTAButton>
                <CTAButton href="#partners" variant="secondary">
                  Partner with EcoVoice
                </CTAButton>
                <CTAButton href="#contact" variant="secondary">
                  Contact Us
                </CTAButton>
              </div>

              <p className="mt-5 text-sm text-white/70">
                Also for NGOs, LGUs, DENR‑type departments, and volunteers.{" "}
                <span className="font-semibold text-eco-300">
                  AI‑Powered Environmental Reporting for Every Filipino.
                </span>
              </p>
            </div>

            <div className="rounded-3xl bg-white/95 dark:bg-slate-900/90 p-6 shadow-2xl ring-1 ring-white/20 dark:ring-slate-700 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Demo Report Card
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Friendly prototype UI (sample)
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-eco-100 dark:bg-eco-900/70 px-3 py-1 text-xs font-bold text-eco-900 dark:text-eco-300 ring-1 ring-eco-200 dark:ring-eco-700">
                  <ShieldCheck className="h-4 w-4" />
                  Trust Score: 93%
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Reporter Voice (Filipino/Cebuano/local)
                  </p>
                  <p className="mt-1 text-sm text-slate-800 dark:text-white">
                    “May illegal dumping po dito malapit sa ilog. Mabaho at kulay
                    itim ang tubig…”
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Evidence</p>
                    <p className="mt-1 text-sm text-slate-800 dark:text-white">
                      Photos uploaded • location pinned
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <Camera className="h-4 w-4" /> 3 photos
                      <MapPin className="ml-2 h-4 w-4" /> Barangay pin
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">AI Result</p>
                    <p className="mt-1 text-sm text-slate-800 dark:text-white">
                      Classified: water pollution
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <Sparkles className="h-4 w-4" /> Satellite cross‑check
                      <ShieldCheck className="ml-2 h-4 w-4" /> Verified
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-eco-100 dark:bg-eco-900/60 p-4 ring-1 ring-eco-200 dark:ring-eco-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Auto‑sent to: LGU Environment Office + Partner NGO
                  </p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    Reporter receives SMS confirmation and status updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Problem */}
      <section id="problem" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Why EcoVoice exists"
          title="The Problem"
          desc="Environmental harm often goes unreported — not because people don’t care, but because the system is hard to access."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card
            title="Violations go unreported"
            icon={<Leaf className="h-5 w-5" />}
            className="scroll-reveal-left"
          >
            Illegal dumping, water pollution, and illegal logging can continue
            for months because communities have no easy way to report safely and
            quickly.
          </Card>

          <Card title="Low literacy blocks reporting" icon={<HelpCircle className="h-5 w-5" />} className="scroll-reveal-right">
            Many farmers and fisherfolk struggle with long forms, official
            language, and complicated apps — so they stay silent even when they
            see harm.
          </Card>

          <Card title="No direct channel to government" icon={<Building2 className="h-5 w-5" />} className="scroll-reveal-left">
            Reports get lost, delayed, or forwarded through multiple layers. A
            missing photo, unclear location, or incomplete details can stop
            action.
          </Card>

          <Card title="False reports waste resources" icon={<ShieldCheck className="h-5 w-5" />} className="scroll-reveal-right">
            Agencies and NGOs must verify each report. Without prioritization
            and evidence, teams spend time chasing false leads while real
            violations need urgent response.
          </Card>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="bg-white dark:bg-slate-800/50 section-bg-pattern">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionTitle
            eyebrow="A simple, trusted pathway to action"
            title="Our Solution"
            desc="EcoVoice lets anyone report in their own language, verifies reports with AI, and routes them to the right responders — fast."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card title="Voice + Photos" icon={<Mic className="h-5 w-5" />} className="scroll-reveal-left">
              Speak in Filipino, Cebuano, or a local language. Upload photos of
              pollution. EcoVoice turns real‑world evidence into a clear report.
            </Card>

            <Card title="AI Verification" icon={<Sparkles className="h-5 w-5" />} className="scroll-reveal">
              EcoVoice transcribes voice, analyzes photos, and cross‑checks
              satellite or map context.
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-eco-100 dark:bg-eco-900/50 px-3 py-1 text-xs font-bold text-eco-900 dark:text-eco-300 ring-1 ring-eco-200 dark:ring-eco-700">
                  <ShieldCheck className="h-4 w-4" /> Trust Score: 90%+
                </span>
              </div>
            </Card>

            <Card title="Real Action" icon={<Building2 className="h-5 w-5" />} className="scroll-reveal-right">
              Verified reports are automatically sent to DENR/LGUs and partner
              NGOs — focused on direct impact, faster response, and transparent
              follow‑through.
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="5-step reporting flow"
          title="How It Works"
          desc="One simple experience for communities. One structured pipeline for agencies."
        />

        {/* Desktop horizontal flow */}
        <div className="mt-10 hidden items-stretch gap-4 lg:flex">
          {[
            {
              n: 1,
              title: "Report",
              desc: "Speak or upload a photo. No long forms.",
              icon: <Mic className="h-5 w-5" />,
            },
            {
              n: 2,
              title: "AI Process",
              desc: "Transcribe and classify the incident type.",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              n: 3,
              title: "Verify",
              desc: "Check satellite + flags. Generate a Trust Score.",
              icon: <ShieldCheck className="h-5 w-5" />,
            },
            {
              n: 4,
              title: "Alert",
              desc: "Auto-send to DENR/LGU + partner NGOs.",
              icon: <Building2 className="h-5 w-5" />,
            },
            {
              n: 5,
              title: "Feedback",
              desc: "SMS confirmation + status updates.",
              icon: <MessageSquareText className="h-5 w-5" />,
            },
          ].map((s, idx, arr) => (
            <div key={s.n} className="relative flex-1">
              <div className="h-full rounded-2xl bg-white dark:bg-slate-800 p-5 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-eco-100 dark:bg-eco-900/50 text-eco-800 dark:text-eco-300 ring-1 ring-eco-200 dark:ring-eco-700">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-eco-700 dark:text-eco-400">
                      Step {s.n}
                    </p>
                    <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
              {idx < arr.length - 1 ? (
                <div className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 lg:block">
                  <div className="h-0.5 w-4 bg-eco-200" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="mt-10 grid gap-4 lg:hidden">
          <Step
            n={1}
            title="Report"
            desc="Speak or upload a photo. No long forms."
            icon={<Mic className="h-5 w-5" />}
          />
          <Step
            n={2}
            title="AI Process"
            desc="Transcribe and classify the incident type."
            icon={<Sparkles className="h-5 w-5" />}
          />
          <Step
            n={3}
            title="Verify"
            desc="Check satellite + flags. Generate a Trust Score."
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <Step
            n={4}
            title="Alert"
            desc="Auto-send to DENR/LGU + partner NGOs."
            icon={<Building2 className="h-5 w-5" />}
          />
          <Step
            n={5}
            title="Feedback"
            desc="SMS confirmation + status updates."
            icon={<MessageSquareText className="h-5 w-5" />}
          />
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
          “Reporter stays informed. Government takes action. Impact tracked.”
        </p>

        <div className="mt-10 rounded-3xl bg-white dark:bg-slate-800 p-6 ring-1 ring-slate-200/70 dark:ring-slate-700">
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Built for access</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Mobile‑first. Local language. Simple voice-first reporting so
                anyone can participate.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Built for trust</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Trust Score, evidence, and verification reduce false reports and
                help responders prioritize real violations.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Built for action</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Auto-alert pipelines (SMS/WhatsApp/email) for faster response
                and clearer accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Submission Section */}
      <section id="report" className="bg-white dark:bg-slate-800/50 section-bg-pattern">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionTitle
            eyebrow="Submit a report"
            title="Report an Environmental Issue"
            desc="Use this form to report illegal dumping, pollution, or any environmental violation. Your report will be verified and routed to the appropriate authorities."
          />

          <div className="mt-10 max-w-2xl mx-auto">
            <ReportForm apiBase={apiBase} />
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="bg-white dark:bg-slate-800/50 section-bg-pattern">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionTitle
            eyebrow="Friendly demo style"
            title="Prototype Roadmap"
            desc="A clear MVP path for a final year project — built with open-source and student-friendly tools."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Speech-to-Text" icon={<Mic className="h-5 w-5" />}>
              Whisper (open-source) converts voice to text in Filipino, Cebuano,
              and English.
            </Card>

            <Card title="Image Analysis" icon={<Camera className="h-5 w-5" />}>
              Python + OpenCV preprocessing, with YOLOv8/MobileNet for detecting
              waste, smoke, and water pollution.
            </Card>

            <Card title="Map Pin / Location Tagging" icon={<MapPin className="h-5 w-5" />}>
              Drop a pin or capture GPS coordinates using Google Maps API or
              Mapbox.
            </Card>

            <Card title="Auto-alert via WhatsApp/SMS" icon={<Phone className="h-5 w-5" />}>
              Twilio SMS for confirmations and alerts. WhatsApp Business API as
              an optional upgrade.
            </Card>

            <Card title="Verified Status + Trust Score UI" icon={<ShieldCheck className="h-5 w-5" />}>
              A friendly “Trust Score” badge and verified status card for quick
              prioritization.
            </Card>

            <Card title="Realtime Updates + Storage" icon={<CheckCircle2 className="h-5 w-5" />}>
              Firebase for authentication, report storage, evidence uploads, and
              status tracking.
            </Card>
          </div>

          <div className="mt-10 rounded-3xl bg-eco-50 dark:bg-eco-900/30 p-6 ring-1 ring-eco-200 dark:ring-eco-700">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Recommended Tech Stack</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Frontend</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  React.js + Vite (mobile-first)
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Backend</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Python + FastAPI (AI-friendly)
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">AI</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Whisper + OpenCV + YOLOv8/MobileNet
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Maps</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Google Maps API or Mapbox
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Twilio (SMS)</p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-200/70 dark:ring-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Database</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Firebase (free tier)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Why it matters"
          title="Impact"
          desc="EcoVoice turns community observations into verified environmental action."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card title="Community-first outcomes" icon={<Handshake className="h-5 w-5" />}>
            <ul className="mt-2 list-inside list-disc space-y-2">
              <li>Empower communities. Protect the environment. Make voices heard.</li>
              <li>Low-barrier reporting for farmers, fisherfolk, and marginalized groups.</li>
              <li>Transparent status updates — people see that reporting leads to action.</li>
            </ul>
          </Card>

          <Card title="Scalable, global-ready model" icon={<Leaf className="h-5 w-5" />}>
            <ul className="mt-2 list-inside list-disc space-y-2">
              <li>Scales globally with language swaps and localized partners.</li>
              <li>Aligns with UN SDGs #13 (Climate Action), #15 (Life on Land), #11 (Sustainable Cities).</li>
              <li>MVP cost: <span className="font-semibold">$0–$100</span> using open-source AI and free tiers.</li>
            </ul>
          </Card>
        </div>

        <div className="mt-10 rounded-3xl bg-white dark:bg-slate-800 p-6 ring-1 ring-slate-200/70 dark:ring-slate-700">
          <p className="text-sm font-bold text-slate-900 dark:text-white">Example use cases</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-700 p-4 ring-1 ring-slate-200/70 dark:ring-slate-600">
              <p className="font-semibold text-slate-900 dark:text-white">Farmers</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Report pesticide runoff, river contamination, and illegal dumping near fields.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-700 p-4 ring-1 ring-slate-200/70 dark:ring-slate-600">
              <p className="font-semibold text-slate-900 dark:text-white">Fisherfolk</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Flag oil spills, coastal waste, and destructive practices with photos and voice notes.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-700 p-4 ring-1 ring-slate-200/70 dark:ring-slate-600">
              <p className="font-semibold text-slate-900 dark:text-white">Volunteers</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Assist communities with reporting, cleanup efforts, and evidence documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="bg-white dark:bg-slate-800/50 section-bg-pattern">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionTitle
            eyebrow="Ecosystem-ready"
            title="Partners / Government"
            desc="EcoVoice is designed to integrate with local response systems — so reports reach the right people, fast."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card title="For LGUs & DENR-type departments" icon={<Building2 className="h-5 w-5" />}>
              Structured reports, trust scoring, and prioritization improve field response and reduce noise.
            </Card>
            <Card title="For NGOs" icon={<Handshake className="h-5 w-5" />}>
              Verified community evidence supports campaigns, cleanup operations, and community protection work.
            </Card>
            <Card title="For Volunteers" icon={<CheckCircle2 className="h-5 w-5" />}>
              Easy reporting and transparent tracking help coordinate action and keep communities informed.
            </Card>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <CTAButton href="#contact" variant="primary">
              Partner with EcoVoice
            </CTAButton>
            <CTAButton href="#contact" variant="secondary">
              Request a Demo
            </CTAButton>
            <CTAButton href="#how" variant="secondary">
              Report an Issue
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6">
        <SectionTitle
          eyebrow="Quick answers"
          title="FAQ"
          desc="Built to be simple for communities and reliable for responders."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="How are reports verified?" icon={<ShieldCheck className="h-5 w-5" />}>
            EcoVoice combines voice transcription, photo analysis, location data, and optional satellite/map cross‑checks to produce a Trust Score and reduce false reports.
          </Card>

          <Card title="What languages are supported?" icon={<Mic className="h-5 w-5" />}>
            Filipino, Cebuano, English — and expandable to local languages with the same pipeline.
          </Card>

          <Card title="Who receives the report?" icon={<Building2 className="h-5 w-5" />}>
            Verified reports are routed to LGUs, DENR‑type departments, and partner NGOs based on location and incident type.
          </Card>

          <Card title="How do users get updates?" icon={<MessageSquareText className="h-5 w-5" />}>
            Reporters receive SMS confirmations and status updates so they know their report was received and acted on.
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Get involved"
          title="Contact EcoVoice"
          desc="Report an issue, request a demo, or explore partnerships. We’ll respond quickly."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 ring-1 ring-slate-200/70 dark:ring-slate-700">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Send a message</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Fields marked with * are required.
            </p>

            <form className="mt-6 grid gap-4" onSubmit={submitContact}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Name *
                  <input
                    name="name"
                    className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 dark:placeholder:text-slate-400"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email *
                  <input
                    name="email"
                    type="email"
                    className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 dark:placeholder:text-slate-400"
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Organization (optional)
                <input
                  name="organization"
                  className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 dark:placeholder:text-slate-400"
                  placeholder="LGU / NGO / School / Community Group"
                />
              </label>

              <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Message *
                <textarea
                  name="message"
                  rows={5}
                  className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white shadow-sm transition-all focus:border-eco-400 dark:focus:border-eco-500 focus:ring-2 focus:ring-eco-200 dark:focus:ring-eco-800 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 dark:placeholder:text-slate-400"
                  placeholder="Tell us what you need: demo, partnership, pilot area, or reporting support…"
                />
              </label>

              <button
                type="submit"
                disabled={sending}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-eco-700 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-all duration-300 hover:bg-eco-800 disabled:cursor-not-allowed disabled:opacity-70 button-glow scale-hover"
                )}
              >
                {sending ? "Sending…" : "Send Message"} <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-2 flex flex-wrap gap-2">
                <CTAButton href="#how" variant="secondary">
                  Report an Issue
                </CTAButton>
                <CTAButton href="#partners" variant="secondary">
                  Partner with EcoVoice
                </CTAButton>
                <CTAButton href="#contact" variant="secondary">
                  Request a Demo
                </CTAButton>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 ring-1 ring-slate-200/70 dark:ring-slate-700">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Press Kit</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Date: <span className="font-semibold">22 December, 2025</span>
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                EcoVoice is a community-first environmental reporting platform that
                makes it easy to report violations through voice and photos — then
                verifies evidence and routes reports to the right responders.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-700 p-4 ring-1 ring-slate-200/70 dark:ring-slate-600">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tagline</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    Voice. Photos. Real Action. No Barriers.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-700 p-4 ring-1 ring-slate-200/70 dark:ring-slate-600">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Audience</p>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    Communities, NGOs, LGUs, volunteers, government responders
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-xl bg-eco-100 dark:bg-eco-900/50 px-3 py-2 font-semibold text-eco-900 dark:text-eco-300 ring-1 ring-eco-200 dark:ring-eco-700">
                  <Mail className="h-4 w-4" /> hello@ecovoice.org
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 px-3 py-2 font-semibold text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-slate-600">
                  <Phone className="h-4 w-4" /> +63 (demo)
                </span>
              </div>
            </div>

            {toast ? (
              <div
                role="status"
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold ring-1 shadow-lg animate-in slide-in-from-top-5 fade-in duration-500",
                  toast.type === "success"
                    ? "bg-eco-50 text-eco-900 ring-eco-200"
                    : "bg-red-50 text-red-900 ring-red-200"
                )}
              >
                {toast.message}
              </div>
            ) : null}

            <div className="rounded-3xl bg-eco-50 dark:bg-eco-900/30 p-6 ring-1 ring-eco-200 dark:ring-eco-700">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Ready to pilot EcoVoice?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                We can run a community pilot with an LGU/NGO partner, train
                volunteers, and integrate alert routing for faster response.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CTAButton href="#contact" variant="primary">
                  Request a Demo
                </CTAButton>
                <CTAButton href="#partners" variant="secondary">
                  Partner with EcoVoice
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-eco-700 text-white shadow-sm">
                <Leaf className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">EcoVoice</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Aligning with UN SDGs #13, #15, #11
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <CTAButton href="#how" variant="secondary">
                Report an Issue
              </CTAButton>
              <CTAButton href="#partners" variant="secondary">
                Partner with EcoVoice
              </CTAButton>
              <CTAButton href="#contact" variant="secondary">
                Contact Us
              </CTAButton>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>EcoVoice © 2025</p>
            <div className="flex items-center gap-4">
              <a href="/admin" className="hover:text-eco-600 dark:hover:text-eco-400 transition-colors">
                Admin Panel
              </a>
              <p>Press-kit date: 22 December, 2025</p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}

// AI Chatbot Component with FAQ & About Us Knowledge
type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const CHATBOT_KNOWLEDGE = {
  greetings: [
    "Hello! 👋 I'm EcoVoice AI Assistant. How can I help you today?",
    "Hi there! Welcome to EcoVoice. Ask me anything about environmental reporting!",
    "Assalamu Alaikum! 🌿 I'm here to help you with EcoVoice. What would you like to know?",
  ],
  faq: [
    {
      keywords: ["verify", "verified", "trust", "score", "check", "authentic", "real"],
      answer: "🛡️ **Report Verification**: EcoVoice uses AI to verify reports through:\n\n• Voice transcription & analysis\n• Photo/image analysis (detecting pollution, waste)\n• GPS location verification\n• Optional satellite/map cross-checks\n\nEach report gets a **Trust Score** (0-100%) to help responders prioritize real violations!",
    },
    {
      keywords: ["language", "languages", "filipino", "cebuano", "tagalog", "english", "speak"],
      answer: "🗣️ **Supported Languages**: EcoVoice currently supports:\n\n• Filipino (Tagalog)\n• Cebuano\n• English\n\nWe use Whisper AI for speech-to-text, so more local languages can be added easily!",
    },
    {
      keywords: ["report", "send", "receive", "who", "government", "lgu", "denr", "ngo"],
      answer: "📤 **Report Recipients**: Verified reports are automatically routed to:\n\n• **LGUs** (Local Government Units)\n• **DENR** (Department of Environment & Natural Resources)\n• **Partner NGOs** based on location and incident type\n\nYou'll get SMS confirmation when your report is received!",
    },
    {
      keywords: ["update", "status", "sms", "notification", "track", "follow"],
      answer: "📱 **Status Updates**: Reporters receive:\n\n• SMS confirmation when report is submitted\n• Status updates as authorities respond\n• Final resolution notification\n\nTransparent tracking so you know your voice was heard!",
    },
    {
      keywords: ["how", "work", "step", "process", "report issue", "use"],
      answer: "🔄 **How EcoVoice Works** (5 Steps):\n\n1️⃣ **Report**: Speak or upload photos - no forms!\n2️⃣ **AI Process**: Voice transcribed, incident classified\n3️⃣ **Verify**: Trust Score generated with evidence\n4️⃣ **Alert**: Auto-sent to LGU/DENR + NGOs\n5️⃣ **Feedback**: SMS updates on status\n\nSimple for communities, structured for responders!",
    },
    {
      keywords: ["cost", "price", "free", "pay", "money", "charge"],
      answer: "💰 **Cost**: EcoVoice is designed to be accessible!\n\n• **For reporters**: FREE to use\n• **MVP cost**: $0-$100 using open-source AI\n• Uses free tiers of Firebase, Whisper, etc.\n\nMade for underserved communities with no barriers!",
    },
    {
      keywords: ["pollution", "dump", "dumping", "illegal", "waste", "water", "air", "smoke"],
      answer: "🌍 **What You Can Report**:\n\n• Illegal dumping sites\n• Water pollution (river, coastal)\n• Air pollution & smoke\n• Deforestation/logging\n• Industrial waste violations\n\nJust speak or take photos - AI handles the rest!",
    },
  ],
  about: [
    {
      keywords: ["what", "ecovoice", "about", "platform", "app", "is"],
      answer: "🌿 **About EcoVoice**:\n\nEcoVoice is an AI-powered environmental reporting platform that makes it easy for anyone to report environmental violations through **voice and photos**.\n\n**Tagline**: \"Voice. Photos. Real Action. No Barriers.\"\n\nDesigned for farmers, fisherfolk, and underserved communities who face barriers with traditional reporting systems!",
    },
    {
      keywords: ["mission", "goal", "purpose", "why", "vision"],
      answer: "🎯 **Our Mission**:\n\nEmpower communities to protect the environment by:\n\n• Making reporting accessible (voice-first, no forms)\n• Verifying reports with AI to reduce false alarms\n• Routing reports directly to responders\n• Tracking action transparently\n\nAligned with UN SDGs #13 (Climate Action), #15 (Life on Land), #11 (Sustainable Cities)!",
    },
    {
      keywords: ["tech", "technology", "stack", "built", "python", "react", "ai"],
      answer: "🛠️ **Tech Stack**:\n\n• **Frontend**: React.js + Vite (mobile-first)\n• **Backend**: Python + FastAPI\n• **AI**: Whisper (speech-to-text), OpenCV, YOLOv8\n• **Maps**: Google Maps API / Mapbox\n• **Notifications**: Twilio SMS\n• **Database**: Firebase (free tier)\n\nBuilt with open-source, student-friendly tools!",
    },
    {
      keywords: ["partner", "partnership", "volunteer", "join", "help", "contact"],
      answer: "🤝 **Partner With Us**:\n\nWe welcome:\n\n• **LGUs & Government** - Integrate report routing\n• **NGOs** - Coordinate community protection\n• **Volunteers** - Help communities report\n• **Schools** - Pilot programs\n\n📧 Contact: hello@ecovoice.org\n📞 Demo: +63 (demo)\n\nScroll to the Contact section to send a message!",
    },
    {
      keywords: ["team", "who made", "developer", "creator", "student", "project"],
      answer: "👥 **About the Team**:\n\nEcoVoice is a final year project built by students passionate about environmental protection and accessible technology.\n\nOur prototype demonstrates how AI can bridge the gap between communities and environmental responders!\n\nPress-kit date: 22 December, 2025",
    },
  ],
  fallback: [
    "I'm not sure about that, but I can help with:\n\n• How EcoVoice works\n• Report verification process\n• Supported languages\n• Partnerships\n• About us\n\nTry asking one of these topics! 🌿",
    "Hmm, I don't have info on that. Would you like to know about:\n\n• How to report an issue\n• Who receives reports\n• Our mission\n• Tech stack\n\nOr scroll down to the FAQ section!",
  ],
};

function getQuickSuggestions(): string[] {
  return [
    "How does it work?",
    "What is EcoVoice?",
    "Supported languages",
    "Who receives reports?",
  ];
}

function findBestResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  // Check greetings
  if (/^(hi|hello|hey|assalam|salam|good morning|good evening)/i.test(lowerInput)) {
    return CHATBOT_KNOWLEDGE.greetings[Math.floor(Math.random() * CHATBOT_KNOWLEDGE.greetings.length)];
  }

  // Check FAQ
  for (const faq of CHATBOT_KNOWLEDGE.faq) {
    if (faq.keywords.some(kw => lowerInput.includes(kw))) {
      return faq.answer;
    }
  }

  // Check About
  for (const about of CHATBOT_KNOWLEDGE.about) {
    if (about.keywords.some(kw => lowerInput.includes(kw))) {
      return about.answer;
    }
  }

  // Fallback
  return CHATBOT_KNOWLEDGE.fallback[Math.floor(Math.random() * CHATBOT_KNOWLEDGE.fallback.length)];
}

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm EcoVoice AI Assistant. Ask me about FAQs, how the app works, or about our mission!",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = findBestResponse(userMessage.text);
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: Date.now(),
        text: suggestion,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = findBestResponse(suggestion);
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 800 + Math.random() * 600);
    }, 100);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
      >
        {isOpen ? <X /> : <Bot />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chat-popup">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-header-avatar">
                <Bot />
              </div>
              <div className="chat-header-text">
                <h4>EcoVoice AI</h4>
                <p>Ask me anything!</p>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="chat-suggestions">
              {getQuickSuggestions().map((suggestion, idx) => (
                <button
                  key={idx}
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about FAQ, About Us..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="chat-send-btn" onClick={handleSend}>
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

