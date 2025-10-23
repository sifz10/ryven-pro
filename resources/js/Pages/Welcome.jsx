import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Welcome() {
    const [step, setStep] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: '',
        project_description: '',
        requirements: { items: [] },
        attachments: [],
        timeline: {},
        metadata: {},
    });

    const next = () => setStep((s) => Math.min(s + 1, 6));
    const back = () => setStep((s) => Math.max(s - 1, 1));
    const submit = (e) => {
        e.preventDefault();
        if (step < 6) {
            next();
            return;
        }
        post(route('leads.store'));
    };

    // Prevent form submission on Enter key press in input fields (but allow it in textareas)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && step < 6) {
            e.preventDefault();
            next();
        }
    };

    return (
        <>
            <Head title="Get Your Project Estimate - Ryven" />
            <div className="relative min-h-screen bg-black text-white">
                {/* Abstract 3D-ish background accents */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[conic-gradient(at_top_left,_#4FFA69_0%,_rgba(79,250,105,0)_60%)] opacity-40 blur-3xl anim-spin-slow" />
                    <div className="absolute -right-24 top-1/4 h-[28rem] w-[28rem] rotate-12 rounded-[3rem] bg-[radial-gradient(closest-side,_rgba(79,250,105,0.35),_rgba(0,0,0,0))] opacity-60 blur-2xl anim-float" />
                    <div className="absolute bottom-[-6rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-[#4FFA69]/20 bg-gradient-to-tr from-[#071a0b] to-transparent shadow-[0_0_120px_-20px_#4FFA69] anim-glow" />

                    {/* Animated grid */}
                    <div className="absolute inset-0 bg-grid opacity-40" />

                    {/* 3D Assets sprinkled & animated */}
                    <img src="/3d/4. Cube.png.png" alt="cube" className="absolute left-10 top-24 w-24 opacity-70 drop-shadow-[0_0_30px_rgba(79,250,105,0.25)] anim-float" />
                    <img src="/3d/6. Ring Sphere.png.png" alt="ring" className="absolute right-16 top-40 w-28 opacity-70 drop-shadow-[0_0_30px_rgba(79,250,105,0.25)] anim-spin-slow" />
                    <img src="/3d/16. Gem.png.png" alt="gem" className="absolute left-1/3 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2 opacity-70 drop-shadow-[0_0_30px_rgba(79,250,105,0.25)] anim-float-delayed" />
                    <img src="/3d/7. Sphere.png.png" alt="sphere" className="absolute bottom-24 left-12 w-16 opacity-70 drop-shadow-[0_0_30px_rgba(79,250,105,0.25)] anim-float" />
                    <img src="/3d/8. TorusKnot.png.png" alt="knot" className="absolute bottom-36 right-16 w-24 opacity-70 drop-shadow-[0_0_30px_rgba(79,250,105,0.25)] anim-float-delayed" />
                            </div>

                {/* Nav - Enhanced */}
                <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/50">
                    <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            <img src="/logo/logo.png" alt="Ryven" className="h-7 sm:h-8 w-auto" />
                        </motion.div>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {[
                                { href: '#hero', label: 'Home' },
                                { href: '#form', label: 'Estimate' },
                                { href: '#problem', label: 'Problem' },
                                { href: '#guide', label: 'Guide' },
                                { href: '#plan', label: 'How It Works' },
                            ].map((item, idx) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="rounded-lg px-3 py-2 text-sm text-white/70 transition-all hover:bg-white/5 hover:text-[#4FFA69]"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                        
                        {/* Desktop Auth Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="hidden sm:flex items-center gap-2 sm:gap-3"
                        >
                            <Link href={route('login')} className="text-xs sm:text-sm text-white/70 transition-colors hover:text-white">
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-lg border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#4FFA69] transition-all hover:bg-[#4FFA69]/20"
                            >
                                Sign up
                            </Link>
                        </motion.div>
                        
                        {/* Mobile Menu Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                    
                    {/* Mobile Menu Dropdown */}
                    <motion.div
                        initial={false}
                        animate={{ 
                            height: mobileMenuOpen ? 'auto' : 0,
                            opacity: mobileMenuOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden border-t border-white/5"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {[
                                { href: '#hero', label: 'Home' },
                                { href: '#form', label: 'Estimate' },
                                { href: '#problem', label: 'Problem' },
                                { href: '#guide', label: 'Guide' },
                                { href: '#plan', label: 'How It Works' },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg px-4 py-3 text-sm text-white/70 transition-all hover:bg-white/5 hover:text-[#4FFA69]"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-2 sm:hidden">
                                <Link 
                                    href={route('login')} 
                                    className="block rounded-lg px-4 py-3 text-sm text-center text-white/70 transition-all hover:bg-white/5 hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="block rounded-lg border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-3 text-sm text-center font-medium text-[#4FFA69] transition-all hover:bg-[#4FFA69]/20"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Hero - Modern Interactive */}
                <section id="hero" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-24 md:pt-16">
                    <div className="relative mx-auto max-w-4xl">
                        {/* Floating orbs with parallax */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#4FFA69]/20 blur-3xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="pointer-events-none absolute -right-20 top-40 h-60 w-60 rounded-full bg-[#4FFA69]/10 blur-3xl"
                        />

                        <div className="relative text-center">
                            {/* Badge with pulse */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/5 px-4 py-1.5 backdrop-blur-sm"
                            >
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="inline-block h-2 w-2 rounded-full bg-[#4FFA69]"
                                />
                                <span className="text-xs font-medium text-[#4FFA69]">Instant Estimates • Under 3 Minutes</span>
                            </motion.div>

                            {/* Animated Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-balance bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-transparent"
                            >
                                Get a detailed
                                <br />
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="relative inline-block text-[#4FFA69]"
                                >
                                    project estimate
                                    <motion.span
                                        className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 w-full rounded-full bg-gradient-to-r from-[#4FFA69] to-transparent"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                </motion.span>
                                {' '}in minutes
                            </motion.h1>

                            {/* Subtitle with stagger */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70 md:text-xl px-2"
                            >
                                Planning your next project? Get a{' '}
                                <span className="font-semibold text-white">comprehensive breakdown</span> of costs, timelines, and deliverables—delivered as a professional PDF, ready to present to stakeholders.
                            </motion.p>

                            {/* CTA Buttons with hover effects */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
                            >
                                <a href="#form" className="w-full sm:w-auto">
                                    <motion.div
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79,250,105,0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full sm:w-auto"
                                    >
                                        <Button className="group relative overflow-hidden bg-[#4FFA69] w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-semibold text-black transition-all hover:bg-[#42e760]">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Get My Estimate
                                                <motion.span
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    →
                                                </motion.span>
                                            </span>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{ x: ["-100%", "200%"] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                        </Button>
                                    </motion.div>
                                </a>
                                <a href="#plan" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 px-5 sm:px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-[#4FFA69]/50 hover:bg-white/10"
                                    >
                                        <span>See How It Works</span>
                                        <motion.span
                                            className="text-[#4FFA69]"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            ↓
                                        </motion.span>
                                    </motion.button>
                                </a>
                            </motion.div>

                            {/* Stats Grid with reveal */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                                className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
                            >
                                {[
                                    { icon: '⚡', title: 'Under 3 min', desc: 'Average completion time' },
                                    { icon: '🎯', title: 'Detailed quotes', desc: 'Professional estimates' },
                                    { icon: '📄', title: 'PDF ready', desc: 'Investor-grade reports' },
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={stat.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1 + idx * 0.1 }}
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(79,250,105,0.3)" }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm transition-all"
                                    >
                                        <div className="relative z-10">
                                            <div className="mb-3 text-3xl">{stat.icon}</div>
                                            <div className="text-lg font-bold text-white">{stat.title}</div>
                                            <div className="mt-1 text-sm text-white/60">{stat.desc}</div>
                                    </div>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-[#4FFA69]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                                            initial={false}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Floating 3D elements with mouse parallax */}
                            <motion.img
                                src="/3d/4. Cube.png.png"
                                alt="cube"
                                className="pointer-events-none absolute -left-16 top-20 hidden w-20 opacity-60 md:block"
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 10, 0],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.img
                                src="/3d/16. Gem.png.png"
                                alt="gem"
                                className="pointer-events-none absolute -right-12 top-32 hidden w-16 opacity-60 md:block"
                                animate={{
                                    y: [0, 20, 0],
                                    rotate: [0, -15, 0],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </section>

                {/* Form section only */}
                <section id="form" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24">
                    <div className="mx-auto max-w-3xl">
                        <form onSubmit={submit} onKeyDown={handleKeyDown} className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 sm:p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
                            {/* Gradient orbs */}
                            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#4FFA69]/10 blur-[100px] pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#4FFA69]/5 blur-[100px] pointer-events-none" />
                            
                            {/* Floating 3D element */}
                            <div className="pointer-events-none absolute -right-8 -top-8 hidden rotate-12 md:block">
                                <motion.img 
                                    src="/3d/1. Torus.png.png" 
                                    alt="torus" 
                                    className="w-24 opacity-80 drop-shadow-[0_0_20px_rgba(79,250,105,0.4)]"
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [12, 22, 12],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                            
                            {/* Header with progress */}
                            <div className="mb-6 sm:mb-10">
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                            Get Your Estimate
                                        </h3>
                                        <p className="text-xs sm:text-sm text-white/50">Step {step} of 6 • Only takes 2 minutes ⚡</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#4FFA69]/10 border border-[#4FFA69]/30 backdrop-blur-sm">
                                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#4FFA69] animate-pulse" />
                                        <span className="text-xs font-semibold text-[#4FFA69]">{Math.round((step/6)*100)}%</span>
                                    </div>
                                </div>
                                
                                {/* Modern linear progress bar */}
                                <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden mb-6 shadow-inner">
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(step / 6) * 100}%` }}
                                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4FFA69] via-[#42e760] to-[#4FFA69] rounded-full shadow-[0_0_20px_rgba(79,250,105,0.6)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                    </motion.div>
                                </div>
                                
                                {/* Step cards */}
                                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                                    {[
                                        { num: 1, label: 'Service', icon: '🎯' },
                                        { num: 2, label: 'Details', icon: '📝' },
                                        { num: 3, label: 'Files', icon: '📎' },
                                        { num: 4, label: 'Features', icon: '⚡' },
                                        { num: 5, label: 'Timeline', icon: '📅' },
                                        { num: 6, label: 'Contact', icon: '👤' },
                                    ].map((item) => (
                                        <motion.div
                                            key={item.num}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{
                                                scale: item.num === step ? 1 : 0.95,
                                                opacity: item.num <= step ? 1 : 0.4,
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            className="flex flex-col items-center gap-1 sm:gap-2"
                                        >
                                            <div
                                                className={`relative flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg transition-all duration-300 ${
                                                    item.num < step
                                                        ? 'bg-[#4FFA69] text-black shadow-[0_4px_20px_rgba(79,250,105,0.5)]'
                                                        : item.num === step
                                                        ? 'bg-[#4FFA69]/20 text-[#4FFA69] border-2 border-[#4FFA69] shadow-[0_4px_20px_rgba(79,250,105,0.4)]'
                                                        : 'bg-white/5 text-white/30 border border-white/10'
                                                }`}
                                            >
                                                {item.num < step ? (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                        className="text-xs sm:text-sm md:text-base"
                                                    >
                                                        ✓
                                                    </motion.span>
                                                ) : (
                                                    <span className="text-xs sm:text-sm md:text-base">{item.icon}</span>
                                                )}
                                                {item.num === step && (
                                                    <motion.div
                                                        className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-[#4FFA69]"
                                                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    />
                                                )}
                                            </div>
                                            <span className={`text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center hidden md:block ${item.num <= step ? 'text-white/80' : 'text-white/30'}`}>
                                                {item.label}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {step === 1 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }} 
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">What service do you need?</h3>
                                        <p className="text-xs sm:text-sm text-white/50">Choose the service that best matches your project</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {[
                                            { id: 'web', label: 'Web Development', icon: '💻', desc: 'Full-stack web applications' },
                                            { id: 'mobile', label: 'Mobile App', icon: '📱', desc: 'iOS & Android apps' },
                                            { id: 'uiux', label: 'UI/UX Design', icon: '🎨', desc: 'User interface & experience' },
                                            { id: 'branding', label: 'Branding', icon: '✨', desc: 'Brand identity & strategy' },
                                        ].map((service, idx) => (
                                            <motion.button
                                                key={service.id}
                                                type="button"
                                                onClick={() => setData('project_type', service.id)}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`group relative flex flex-col gap-3 rounded-2xl border p-6 text-left transition-all duration-300 overflow-hidden ${
                                                    data.project_type === service.id
                                                        ? 'border-[#4FFA69] bg-[#4FFA69]/10 shadow-[0_8px_30px_rgba(79,250,105,0.3)]'
                                                        : 'border-white/10 bg-white/[0.02] hover:border-[#4FFA69]/40 hover:bg-white/[0.05]'
                                                }`}
                                            >
                                                {/* Gradient overlay on hover */}
                                                <div className={`absolute inset-0 bg-gradient-to-br from-[#4FFA69]/0 to-[#4FFA69]/0 transition-all duration-300 ${
                                                    data.project_type === service.id ? 'from-[#4FFA69]/10 to-transparent' : 'group-hover:from-[#4FFA69]/5'
                                                }`} />
                                                <div className="relative flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-3xl">{service.icon}</span>
                                                            <span className="text-base font-semibold text-white">{service.label}</span>
                                                        </div>
                                                        <p className="text-xs text-white/50">{service.desc}</p>
                                                    </div>
                                                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                        data.project_type === service.id
                                                            ? 'border-[#4FFA69] bg-[#4FFA69] scale-100'
                                                            : 'border-white/20 bg-transparent scale-90'
                                                    }`}>
                                                        {data.project_type === service.id && (
                                                            <motion.svg
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="h-3 w-3 text-black"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </motion.svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }} 
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">Tell us about your project</h3>
                                        <p className="text-xs sm:text-sm text-white/50">The more details, the better estimate we can provide</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-3">What are you building? ✨</label>
                                        <div className="relative">
                                            <textarea 
                                                rows={7} 
                                                placeholder="Describe your project vision, goals, target audience, key features, and any specific requirements..." 
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#4FFA69] focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4FFA69]/20 backdrop-blur-sm resize-none" 
                                                value={data.project_description} 
                                                onChange={(e) => setData('project_description', e.target.value)} 
                                            />
                                            <div className="absolute bottom-3 right-3 text-xs text-white/30">
                                                {data.project_description?.length || 0} characters
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }} 
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">Upload files (optional)</h3>
                                        <p className="text-xs sm:text-sm text-white/50">Attach designs, documents, or references to help us understand your vision</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-3">Project files & references 📎</label>
                                        <motion.div 
                                            whileHover={{ scale: 1.01 }}
                                            className="relative group"
                                        >
                                            <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] p-12 transition-all duration-300 hover:border-[#4FFA69]/30 hover:bg-white/[0.04] cursor-pointer">
                                                <div className="text-center">
                                                    <motion.div 
                                                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4FFA69]/10 mb-4 group-hover:bg-[#4FFA69]/20 transition-all"
                                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                                    >
                                                        <span className="text-3xl">📎</span>
                                                    </motion.div>
                                                    <p className="text-base font-medium text-white/80 mb-2">
                                                        Drag & drop files here
                                                    </p>
                                                    <p className="text-sm text-white/50 mb-4">or click to browse</p>
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        PDF, PNG, JPG, DOC, XLS (Max 10MB each)
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        multiple 
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                                        onChange={(e) => setData('attachments', Array.from(e.target.files))} 
                                                    />
                                                </div>
                                            </div>
                                            {data.attachments && data.attachments.length > 0 && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-4 space-y-2"
                                                >
                                                    <p className="text-xs font-medium text-white/70 mb-2">Attached files:</p>
                                                    {data.attachments.map((file, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                                            <span className="text-lg">📄</span>
                                                            <span className="text-sm text-white/70 flex-1 truncate">{file.name}</span>
                                                            <span className="text-xs text-white/40">{(file.size / 1024).toFixed(1)} KB</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }} 
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">Key requirements</h3>
                                        <p className="text-xs sm:text-sm text-white/50">List the must-have features and functionalities</p>
                                    </div>
                                    <div className="space-y-3">
                                        {(data.requirements.items || []).map((req, i) => (
                                            <motion.div 
                                                key={i} 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex gap-3 group"
                                            >
                                                <div className="flex items-center justify-center w-8 h-8 mt-2 rounded-lg bg-[#4FFA69]/10 text-[#4FFA69] text-xs font-semibold shrink-0">
                                                    {i + 1}
                                                </div>
                                                <input
                                                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#4FFA69] focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4FFA69]/20"
                                                    placeholder={`e.g., ${i === 0 ? 'User authentication & profiles' : i === 1 ? 'Real-time notifications' : i === 2 ? 'Payment integration' : 'Your requirement here'}`}
                                                    value={req}
                                                    onChange={(e) => {
                                                        const updated = [...(data.requirements.items || [])];
                                                        updated[i] = e.target.value;
                                                        setData('requirements', { items: updated });
                                                    }}
                                                />
                                                <motion.button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = (data.requirements.items || []).filter((_, idx) => idx !== i);
                                                        setData('requirements', { items: updated });
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center justify-center w-10 h-10 mt-2 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all shrink-0"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...(data.requirements.items || []), ''];
                                            setData('requirements', { items: updated });
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] px-4 py-4 text-sm font-medium text-white/70 transition-all hover:border-[#4FFA69]/30 hover:bg-white/[0.04] hover:text-[#4FFA69]"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add requirement
                                    </motion.button>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }} 
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">Project timeline</h3>
                                        <p className="text-xs sm:text-sm text-white/50">When do you need your project completed?</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        {[
                                            { weeks: 2, label: 'Rush', icon: '⚡' },
                                            { weeks: 4, label: 'Fast', icon: '🚀' },
                                            { weeks: 8, label: 'Standard', icon: '📅' },
                                            { weeks: 12, label: 'Flexible', icon: '🎯' },
                                        ].map((option, idx) => (
                                            <motion.button
                                                key={option.weeks}
                                                type="button"
                                                onClick={() => setData('timeline', { weeks: option.weeks })}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{ scale: 1.05, y: -4 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 overflow-hidden ${
                                                    data.timeline?.weeks === option.weeks
                                                        ? 'border-[#4FFA69] bg-[#4FFA69]/10 shadow-[0_8px_30px_rgba(79,250,105,0.3)]'
                                                        : 'border-white/10 bg-white/[0.02] hover:border-[#4FFA69]/40 hover:bg-white/[0.05]'
                                                }`}
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br from-[#4FFA69]/0 to-[#4FFA69]/0 transition-all duration-300 ${
                                                    data.timeline?.weeks === option.weeks ? 'from-[#4FFA69]/10 to-transparent' : ''
                                                }`} />
                                                <span className="text-2xl relative">{option.icon}</span>
                                                <div className="relative">
                                                    <span className="text-3xl font-bold text-white block">{option.weeks}</span>
                                                    <span className="text-xs text-white/50 block">weeks</span>
                                                </div>
                                                <span className="text-xs font-medium text-white/70 relative">{option.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-3">Or specify a custom timeline 🎯</label>
                                        <input
                                            type="number"
                                            placeholder="e.g., 6 weeks"
                                            min="1"
                                            max="52"
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#4FFA69] focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4FFA69]/20"
                                            value={data.timeline?.weeks || ''}
                                            onChange={(e) => setData('timeline', { weeks: Number(e.target.value || 0) })}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 6 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }} 
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">Almost there! 🎉</h3>
                                        <p className="text-xs sm:text-sm text-white/50">Share your contact details so we can send your estimate</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-3">Your name *</label>
                                            <input 
                                                placeholder="John Doe" 
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#4FFA69] focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4FFA69]/20" 
                                                value={data.name} 
                                                onChange={(e) => setData('name', e.target.value)} 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-3">Email address *</label>
                                            <input 
                                                type="email" 
                                                placeholder="john@company.com" 
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#4FFA69] focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4FFA69]/20" 
                                                value={data.email} 
                                                onChange={(e) => setData('email', e.target.value)} 
                                            />
                                            {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-3">Company name</label>
                                        <input 
                                            placeholder="Acme Inc." 
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#4FFA69] focus:bg-white/[0.05] focus:ring-2 focus:ring-[#4FFA69]/20" 
                                            value={data.company} 
                                            onChange={(e) => setData('company', e.target.value)} 
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                                <div className="flex items-center justify-between gap-3 sm:gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={back}
                                        disabled={step === 1}
                                        whileHover={{ scale: step === 1 ? 1 : 1.02 }}
                                        whileTap={{ scale: step === 1 ? 1 : 0.98 }}
                                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <span className="hidden sm:inline">Back</span>
                                    </motion.button>
                                    
                                    {step < 6 ? (
                                        <motion.button
                                            type="button"
                                            onClick={next}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#4FFA69] to-[#3dd45a] text-black font-semibold shadow-[0_4px_20px_rgba(79,250,105,0.4)] hover:shadow-[0_6px_30px_rgba(79,250,105,0.6)] transition-all text-sm sm:text-base"
                                        >
                                            Next
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            whileHover={{ scale: processing ? 1 : 1.05 }}
                                            whileTap={{ scale: processing ? 1 : 0.95 }}
                                            className="flex-1 sm:flex-none relative flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#4FFA69] to-[#3dd45a] text-black font-semibold shadow-[0_4px_20px_rgba(79,250,105,0.4)] hover:shadow-[0_6px_30px_rgba(79,250,105,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-sm sm:text-base"
                                        >
                                            {processing && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    animate={{ x: ['-100%', '200%'] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            )}
                                            <span className="relative">
                                                {processing ? 'Processing...' : 'Get My Estimate'}
                                            </span>
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </motion.button>
                                    )}
                                </div>
                                
                                {/* Info badges - hidden on mobile to save space */}
                                <div className="hidden sm:flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-center">
                                    <span className="text-xs text-white/40">⚡ Lightning-fast</span>
                                    <span className="text-white/20">•</span>
                                    <span className="text-xs text-white/40">📄 Detailed proposal</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                {/* SB7: Problem - Redesigned */}
                <section id="problem" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                    {/* Background decorative elements */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-red-500/5 blur-3xl"
                        />
                    </div>

                    <div className="relative">
                        {/* Section Header with animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto mb-12 max-w-3xl text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-xs font-medium text-red-400"
                            >
                                <span className="text-base">⚠️</span>
                                <span>The Problem</span>
                            </motion.div>
                            <h2 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent">
                                Estimating is slow{' '}
                                <span className="relative inline-block">
                                    <span className="text-red-400">and vague</span>
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-red-400/50"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    />
                                </span>
                            </h2>
                            <p className="mt-4 text-lg text-white/60">
                                Prospects drop off when quotes take days or lack clarity. You're losing deals before they even start.
                            </p>
                        </motion.div>

                        {/* Pain Points Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {[
                                    {
                                        icon: '⏳',
                                        title: 'Waiting days for quotes',
                                        desc: 'Traditional estimation processes take days or weeks, delaying your project decisions and planning.',
                                        color: 'from-orange-500/20 to-red-500/20',
                                        borderColor: 'border-orange-500/20',
                                        delay: 0,
                                    },
                                    {
                                        icon: '🤷',
                                        title: 'Unclear pricing',
                                        desc: 'Vague estimates without detailed breakdowns make it hard to budget and get stakeholder approval.',
                                        color: 'from-red-500/20 to-pink-500/20',
                                        borderColor: 'border-red-500/20',
                                        delay: 0.1,
                                    },
                                    {
                                        icon: '💔',
                                        title: 'Missing deadlines',
                                        desc: 'Without clear timelines and scope, projects often run over budget and miss launch dates.',
                                        color: 'from-pink-500/20 to-purple-500/20',
                                        borderColor: 'border-pink-500/20',
                                        delay: 0.2,
                                    },
                                ].map((pain, idx) => (
                                <motion.div
                                    key={pain.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: pain.delay }}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className="group relative flex h-full"
                                >
                                    {/* Glow effect */}
                                    <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${pain.color} opacity-0 blur transition duration-300 group-hover:opacity-100`} />
                                    
                                    {/* Card */}
                                    <div className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border ${pain.borderColor} bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-sm md:p-8`}>
                                        {/* Icon with animation */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: pain.delay + 0.2, type: "spring" }}
                                            className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl backdrop-blur-sm md:h-14 md:w-14 md:text-3xl"
                                        >
                                            {pain.icon}
                                        </motion.div>

                                        {/* Content */}
                                        <h3 className="mb-3 text-lg font-semibold text-white md:text-xl">{pain.title}</h3>
                                        <p className="flex-grow text-sm leading-relaxed text-white/60">{pain.desc}</p>

                                        {/* Decorative corner */}
                                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-300 group-hover:bg-white/10" />
                                            </div>
                                </motion.div>
                            ))}
                                        </div>

                        {/* Bottom emphasis with counter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-12 overflow-hidden rounded-2xl border border-red-500/10 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 p-8 text-center backdrop-blur-sm"
                        >
                            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 md:flex-row md:justify-between">
                                <div className="text-left">
                                    <div className="text-sm font-medium text-red-400">The cost of slow estimates</div>
                                    <div className="mt-1 text-2xl font-bold text-white">Every day matters</div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                                            className="text-3xl font-bold text-red-400"
                                        >
                                            72hrs
                                        </motion.div>
                                        <div className="mt-1 text-xs text-white/60">Average quote time</div>
                                    </div>
                                    <div className="h-12 w-px bg-white/10" />
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                                            className="text-3xl font-bold text-red-400"
                                        >
                                            40%
                                        </motion.div>
                                        <div className="mt-1 text-xs text-white/60">Leads lost to delays</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SB7: Guide - Redesigned */}
                <section id="guide" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                    {/* Background glow */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4FFA69]/10 blur-3xl"
                        />
                                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl border border-[#4FFA69]/20 bg-gradient-to-br from-[#4FFA69]/[0.08] via-white/[0.03] to-white/[0.02] p-8 shadow-[0_0_80px_-20px_rgba(79,250,105,0.3)] backdrop-blur-xl md:p-12"
                    >
                        {/* Decorative elements */}
                        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#4FFA69]/20 blur-3xl" />
                        <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#4FFA69]/10 blur-3xl" />

                        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Left side - Message */}
                            <div className="flex flex-col justify-center">
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-1.5 text-xs font-medium text-[#4FFA69] backdrop-blur-sm"
                                >
                                    <span className="text-base">✓</span>
                                    <span>Your Trusted Guide</span>
                                </motion.div>

                                {/* Heading */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                                >
                                    We've scoped{' '}
                                    <span className="relative inline-block">
                                        <span className="text-[#4FFA69]">hundreds of projects</span>
                                        <motion.span
                                            className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#4FFA69]/30"
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.5 }}
                                            style={{ transformOrigin: "left" }}
                                        />
                                    </span>
                                    {' '}— we get it
                                </motion.h2>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mb-6 text-lg leading-relaxed text-white/70"
                                >
                                    Ryven helps you <span className="font-semibold text-white">look professional</span> and <span className="font-semibold text-white">respond instantly</span>, without sacrificing accuracy. Get detailed estimates without the wait.
                                </motion.p>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="flex flex-wrap gap-6"
                                >
                                    {[
                                        { value: '500+', label: 'Projects scoped' },
                                        { value: '98%', label: 'Accuracy rate' },
                                        { value: '24/7', label: 'Always ready' },
                                    ].map((stat, idx) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.6 + idx * 0.1, type: "spring" }}
                                            className="flex flex-col"
                                        >
                                            <div className="text-2xl font-bold text-[#4FFA69]">{stat.value}</div>
                                            <div className="text-xs text-white/60">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                    </div>

                            {/* Right side - Trust signals */}
                            <div className="flex flex-col gap-4">
                                {/* Testimonial card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                                >
                                    <div className="mb-3 flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                                                className="text-[#4FFA69]"
                                            >
                                                ★
                                            </motion.span>
                                        ))}
                                    </div>
                                    <p className="mb-4 text-sm leading-relaxed text-white/80">
                                        "Cut our estimation time from 3 days to 3 minutes. Our close rate jumped 40% because we could respond while leads were hot."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4FFA69]/20 text-sm font-bold text-[#4FFA69]">
                                            SJ
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">Sarah Johnson</div>
                                            <div className="text-xs text-white/60">CEO, PixelForge Studio</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Features grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: '🎯', label: 'Accurate pricing' },
                                        { icon: '⚡', label: 'Lightning fast' },
                                        { icon: '🔒', label: 'Secure & private' },
                                        { icon: '📊', label: 'Detailed breakdown' },
                                    ].map((feature, idx) => (
                                        <motion.div
                                            key={feature.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                                            whileHover={{ y: -4 }}
                                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                                        >
                                            <span className="text-2xl">{feature.icon}</span>
                                            <span className="text-sm font-medium text-white">{feature.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-8 flex items-center justify-center gap-4 border-t border-white/10 pt-8"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.8 + i * 0.1, type: "spring" }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-[#4FFA69]/30 to-[#4FFA69]/10 text-xs font-bold text-white"
                                    >
                                        {String.fromCharCode(65 + i)}
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-sm text-white/70">
                                Join <span className="font-semibold text-[#4FFA69]">200+</span> teams who trust Ryven
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* SB7: Plan - Redesigned Storytelling */}
                <section id="plan" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                    {/* Background elements */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
                        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
                                    </div>

                    <div className="relative">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="mb-16 text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium text-blue-400"
                            >
                                <span className="text-base">📋</span>
                                <span>How It Works</span>
                            </motion.div>
                            <h2 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent">
                                A simple plan
                            </h2>
                            <p className="mt-4 text-lg text-white/60">
                                From idea to investor-ready estimate in 3 minutes
                            </p>
                        </motion.div>

                        {/* Timeline Steps */}
                        <div className="relative">
                            {/* Connecting line */}
                            <div className="absolute left-8 top-0 hidden h-full w-0.5 md:left-1/2 md:block">
                                <div className="h-full w-full bg-white/10" />
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute top-0 w-full bg-gradient-to-b from-[#4FFA69] to-blue-500"
                                    style={{ transformOrigin: "top" }}
                                />
                            </div>

                            {/* Steps */}
                            <div className="space-y-16">
                                {[
                                    {
                                        step: '01',
                                        title: 'Complete the form',
                                        desc: 'Answer guided prompts about your project. Select your service, describe your vision, upload files, and define requirements. Our smart form adapts to your needs.',
                                        icon: '📝',
                                        image: '/3d/15. Plane.png.png',
                                        color: 'from-[#4FFA69]/20 to-green-500/20',
                                        delay: 0,
                                    },
                                    {
                                        step: '02',
                                        title: 'Instant processing',
                                        desc: 'Our system processes your inputs instantly, breaking down your project into phases, calculating accurate timelines, and determining fair pricing based on hundreds of similar projects.',
                                        icon: '⚙️',
                                        image: '/3d/11. Chain.png.png',
                                        color: 'from-blue-500/20 to-purple-500/20',
                                        delay: 0.2,
                                    },
                                    {
                                        step: '03',
                                        title: 'Receive polished PDF',
                                        desc: 'Get a professional, branded PDF estimate delivered straight to your inbox. Complete with transparent breakdowns, pricing details, and timelines—ready to share with stakeholders.',
                                        icon: '📄',
                                        image: '/3d/16. Gem.png.png',
                                        color: 'from-purple-500/20 to-pink-500/20',
                                        delay: 0.4,
                                    },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.step}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, delay: item.delay }}
                                        className={`relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 ${idx % 2 === 1 ? 'md:text-right' : ''}`}
                                    >
                                        {/* Step number dot */}
                                        <div className="absolute left-8 hidden h-16 w-16 -translate-x-1/2 md:left-1/2 md:block">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: item.delay + 0.2, type: "spring" }}
                                                className="flex h-full w-full items-center justify-center rounded-full border-4 border-black bg-gradient-to-br from-[#4FFA69] to-blue-500 text-xl font-bold text-black shadow-lg"
                                            >
                                                {item.step}
                                            </motion.div>
                                        </div>

                                        {/* Content - alternating sides */}
                                        {idx % 2 === 0 ? (
                                            <>
                                                {/* Left side - Text */}
                                                <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-2 md:items-end' : ''}`}>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: item.delay + 0.3 }}
                                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm mb-4"
                                                    >
                                                        <span className="text-2xl">{item.icon}</span>
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Step {item.step}</span>
                                                    </motion.div>
                                                    <motion.h3
                                                        initial={{ opacity: 0, x: -30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: item.delay + 0.4 }}
                                                        className="mb-4 text-2xl font-bold text-white md:text-3xl"
                                                    >
                                                        {item.title}
                                                    </motion.h3>
                                                    <motion.p
                                                        initial={{ opacity: 0, x: -30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: item.delay + 0.5 }}
                                                        className="leading-relaxed text-white/70"
                                                    >
                                                        {item.desc}
                                                    </motion.p>
                                                </div>

                                                {/* Right side - Visual */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 30, rotate: -10 }}
                                                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: item.delay + 0.3 }}
                                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                                    className="group relative"
                                                >
                                                    <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${item.color} opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-100`} />
                                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-sm">
                                                        <img src={item.image} alt={item.title} className="mx-auto w-32 drop-shadow-[0_0_30px_rgba(79,250,105,0.3)]" />
                                                    </div>
                                                </motion.div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Left side - Visual (swapped) */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -30, rotate: 10 }}
                                                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: item.delay + 0.3 }}
                                                    whileHover={{ scale: 1.05, rotate: -5 }}
                                                    className="group relative md:order-1"
                                                >
                                                    <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${item.color} opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-100`} />
                                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-sm">
                                                        <img src={item.image} alt={item.title} className="mx-auto w-32 drop-shadow-[0_0_30px_rgba(79,250,105,0.3)]" />
                                                    </div>
                                                </motion.div>

                                                {/* Right side - Text (swapped) */}
                                                <div className="flex flex-col justify-center md:order-2 md:items-end md:text-right">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: item.delay + 0.3 }}
                                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm mb-4"
                                                    >
                                                        <span className="text-2xl">{item.icon}</span>
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Step {item.step}</span>
                                                    </motion.div>
                                                    <motion.h3
                                                        initial={{ opacity: 0, x: 30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: item.delay + 0.4 }}
                                                        className="mb-4 text-2xl font-bold text-white md:text-3xl"
                                                    >
                                                        {item.title}
                                                    </motion.h3>
                                                    <motion.p
                                                        initial={{ opacity: 0, x: 30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: item.delay + 0.5 }}
                                                        className="leading-relaxed text-white/70"
                                                    >
                                                        {item.desc}
                                                    </motion.p>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-20 text-center"
                        >
                            <div className="mb-6">
                                <div className="text-sm font-medium text-white/60">Ready to get started?</div>
                                <div className="mt-1 text-2xl font-bold text-white">Your estimate is 3 minutes away</div>
                            </div>
                            <a href="#form">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="bg-[#4FFA69] px-8 py-6 text-base font-semibold text-black hover:bg-[#42e760]">
                                        Start Your Free Estimate
                                    </Button>
                                </motion.div>
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Animated Plan component */}
                {/* Placed at end of file scope */}

                {/* SB7: Failure - Redesigned */}
                <section id="failure" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                    {/* Dramatic background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 blur-3xl"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.08] via-black to-black p-8 shadow-[0_0_100px_-30px_rgba(239,68,68,0.4)] backdrop-blur-xl md:p-12"
                    >
                        {/* Warning stripes - subtle */}
                        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-red-500/5 to-transparent" />
                        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-red-500/5 to-transparent" />

                        <div className="relative">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-medium text-red-400 backdrop-blur-sm"
                            >
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-base"
                                >
                                    ⚠️
                                </motion.span>
                                <span>The Cost of Inaction</span>
                            </motion.div>

                            {/* Main message */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                            >
                                Don't let slow estimates{' '}
                                <span className="relative inline-block">
                                    <span className="text-red-400">delay your project</span>
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-red-400/50"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-12 max-w-3xl text-lg leading-relaxed text-white/70"
                            >
                                Every day spent waiting for estimates is a day your project can't move forward. Time lost means opportunities missed and goals delayed.
                            </motion.p>

                            {/* Consequences grid */}
                            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                                {[
                                    {
                                        icon: '📉',
                                        title: 'Budget overruns',
                                        desc: 'Without clear pricing upfront, projects often exceed budgets, causing financial stress and stakeholder concerns.',
                                        stat: '+40%',
                                        statLabel: 'over budget',
                                        delay: 0.5,
                                    },
                                    {
                                        icon: '😤',
                                        title: 'Decision paralysis',
                                        desc: 'Waiting weeks for estimates means delayed approvals, missed opportunities, and frustrated stakeholders.',
                                        stat: '3-7',
                                        statLabel: 'weeks waiting',
                                        delay: 0.6,
                                    },
                                    {
                                        icon: '🏃',
                                        title: 'Project delays',
                                        desc: 'Slow estimation means late project starts, pushing back launch dates and time-to-market.',
                                        stat: '2-3x',
                                        statLabel: 'longer timeline',
                                        delay: 0.7,
                                    },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, delay: item.delay }}
                                        className="group relative"
                                    >
                                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 blur transition duration-300 group-hover:opacity-100" />
                                        
                                        <div className="relative flex h-full flex-col rounded-2xl border border-red-500/20 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-sm">
                                            {/* Icon */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: item.delay + 0.2, type: "spring" }}
                                                className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-2xl backdrop-blur-sm"
                                            >
                                                {item.icon}
                                            </motion.div>

                                            {/* Content */}
                                            <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                                            <p className="mb-4 flex-grow text-sm leading-relaxed text-white/60">{item.desc}</p>

                                            {/* Stat */}
                                            <div className="border-t border-red-500/10 pt-4">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: item.delay + 0.4, type: "spring" }}
                                                    className="text-2xl font-bold text-red-400"
                                                >
                                                    {item.stat}
                                                </motion.div>
                                                <div className="text-xs text-white/60">{item.statLabel}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                    </div>

                            {/* Bottom warning banner */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="overflow-hidden rounded-2xl border border-[#4FFA69]/30 bg-gradient-to-r from-[#4FFA69]/10 via-[#4FFA69]/5 to-[#4FFA69]/10 p-6"
                            >
                                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                                    <div className="text-center md:text-left">
                                        <div className="mb-2 text-sm font-medium text-[#4FFA69]">Start planning today</div>
                                        <div className="text-xl font-bold text-white">Get clarity on your project costs and timeline</div>
                                        <div className="mt-2 text-sm text-white/60">Fast, detailed estimates help you make confident decisions.</div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <a href="#form">
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button className="bg-[#4FFA69] px-8 py-6 text-base font-semibold text-black hover:bg-[#42e760]">
                                                    Get My Estimate
                                                </Button>
                                            </motion.div>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* SB7: Success - Redesigned */}
                <section id="success" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                    {/* Celebratory background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-[#4FFA69]/10 blur-3xl"
                        />
                        <motion.div
                            animate={{ 
                                rotate: [360, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
                        />
                    </div>

                    <div className="relative">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="mb-16 text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-1.5 text-xs font-medium text-[#4FFA69] backdrop-blur-sm"
                            >
                                <span className="text-base">✨</span>
                                <span>Your Success Story</span>
                            </motion.div>
                            <h2 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent">
                                Transform how you{' '}
                                <span className="relative inline-block">
                                    <span className="text-[#4FFA69]">plan projects</span>
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#4FFA69]/50"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                </span>
                                        </h2>
                            <p className="mt-4 text-lg text-white/60">
                                Fast, accurate estimates mean confident decisions and faster project starts
                            </p>
                        </motion.div>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {[
                                {
                                    icon: '⚡',
                                    number: '01',
                                    title: 'Instant clarity',
                                    desc: 'Get a comprehensive project estimate in minutes, not weeks. Make informed decisions faster and move your project forward without delay.',
                                    feature: '< 3 min',
                                    featureLabel: 'delivery time',
                                    color: 'from-[#4FFA69]/20 to-green-500/20',
                                    borderColor: 'border-[#4FFA69]/20',
                                    delay: 0,
                                },
                                {
                                    icon: '🎯',
                                    number: '02',
                                    title: 'Accurate budgeting',
                                    desc: 'Detailed cost breakdowns help you budget confidently and get stakeholder approval faster. No more surprises or scope creep.',
                                    feature: 'Detailed',
                                    featureLabel: 'breakdown',
                                    color: 'from-blue-500/20 to-cyan-500/20',
                                    borderColor: 'border-blue-500/20',
                                    delay: 0.1,
                                },
                                {
                                    icon: '💎',
                                    number: '03',
                                    title: 'Professional presentation',
                                    desc: 'Receive a polished, branded PDF ready to present to your team, investors, or board—showcasing your project\'s value and feasibility.',
                                    feature: 'Ready',
                                    featureLabel: 'to present',
                                    color: 'from-purple-500/20 to-pink-500/20',
                                    borderColor: 'border-purple-500/20',
                                    delay: 0.2,
                                },
                            ].map((benefit, idx) => (
                                <motion.div
                                    key={benefit.number}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: benefit.delay }}
                                    className="group relative"
                                >
                                    {/* Hover glow */}
                                    <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100`} />
                                    
                                    {/* Card */}
                                    <motion.div
                                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border ${benefit.borderColor} bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-xl`}
                                    >
                                        {/* Number badge */}
                                        <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-sm font-bold text-white/40 backdrop-blur-sm">
                                            {benefit.number}
                                        </div>

                                        {/* Icon */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: benefit.delay + 0.2, type: "spring", bounce: 0.5 }}
                                            className="mb-6 inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 text-4xl backdrop-blur-sm ring-1 ring-white/10"
                                        >
                                            {benefit.icon}
                                        </motion.div>

                                        {/* Content */}
                                        <h3 className="mb-3 text-2xl font-bold text-white">{benefit.title}</h3>
                                        <p className="mb-6 flex-grow text-sm leading-relaxed text-white/70">{benefit.desc}</p>

                                        {/* Feature highlight */}
                                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                            <div>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: benefit.delay + 0.4, type: "spring" }}
                                                    className="text-3xl font-bold text-[#4FFA69]"
                                                >
                                                    {benefit.feature}
                                                </motion.div>
                                                <div className="text-xs text-white/60">{benefit.featureLabel}</div>
                                            </div>
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4FFA69]/10 text-[#4FFA69] transition-colors group-hover:bg-[#4FFA69]/20"
                                            >
                                                →
                                            </motion.div>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:bg-[#4FFA69]/10" />
                                        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:bg-blue-500/10" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom transformation message */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-16 overflow-hidden rounded-3xl border border-[#4FFA69]/20 bg-gradient-to-r from-[#4FFA69]/10 via-blue-500/5 to-purple-500/10 p-8 backdrop-blur-xl md:p-12"
                        >
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                                <div>
                                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#4FFA69]/20 px-3 py-1 text-xs font-medium text-[#4FFA69]">
                                        <span>✓</span>
                                        <span>The Complete Package</span>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                                        Everything you need for confident project planning
                                    </h3>
                                    <p className="text-white/70">
                                        Stop waiting for estimates. Get instant clarity on costs, timelines, and deliverables to make smart project decisions.
                                        </p>
                                    </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Fast estimates', icon: '🚀' },
                                        { label: 'Clear budgets', icon: '💰' },
                                        { label: 'Ready to present', icon: '⭐' },
                                        { label: 'Quick decisions', icon: '⚡' },
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                                        >
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-xs font-medium text-white">{item.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SB7: CTA - Ultra Compelling */}
                <section id="cta" className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-20">
                    {/* Dramatic background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4FFA69]/20 blur-3xl"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden border-2 border-[#4FFA69]/30 bg-gradient-to-br from-[#4FFA69]/10 via-black to-black shadow-[0_0_120px_-20px_rgba(79,250,105,0.5)] backdrop-blur-2xl rounded-[20px]"
                    >
                        {/* Animated border glow */}
                        <motion.div
                            animate={{ 
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-r from-[#4FFA69]/20 via-[#4FFA69]/5 to-[#4FFA69]/20 blur-xl"
                        />

                        <div className="relative p-8 md:p-16">
                            {/* Top badges */}
                            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-1.5 text-xs font-medium text-[#4FFA69] backdrop-blur-sm"
                                >
                                    <motion.span
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        ⚡
                                    </motion.span>
                                    <span>Lightning Fast</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-1.5 text-xs font-medium text-[#4FFA69] backdrop-blur-sm"
                                >
                                    <span>🎯</span>
                                    <span>Free Forever</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-1.5 text-xs font-medium text-[#4FFA69] backdrop-blur-sm"
                                >
                                    <span>✨</span>
                                    <span>No Credit Card</span>
                                </motion.div>
                                    </div>

                            {/* Main headline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-6 text-center"
                            >
                                <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                                    Transform Your Idea Into a
                                    <br />
                                    <span className="relative inline-block mt-2">
                                        <span className="bg-gradient-to-r from-[#4FFA69] via-[#3de557] to-[#4FFA69] bg-clip-text text-transparent">
                                            Professional Estimate
                                        </span>
                                        <motion.span
                                            className="absolute -bottom-2 left-0 h-2 w-full bg-gradient-to-r from-[#4FFA69] via-[#3de557] to-[#4FFA69] opacity-30 blur-sm"
                                            animate={{ 
                                                opacity: [0.3, 0.6, 0.3],
                                                scaleX: [0.95, 1, 0.95]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </span>
                                </h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed"
                                >
                                    Get investor-ready project estimates in under <span className="font-semibold text-[#4FFA69]">3 minutes</span>. 
                                    No meetings, no back-and-forth—just accurate, detailed PDFs delivered instantly.
                                </motion.p>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                            >
                                <a href="#form" className="w-full sm:w-auto">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative"
                                    >
                                        {/* Glow effect */}
                                        <motion.div 
                                            className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#4FFA69] to-[#3de557] opacity-60 blur-xl"
                                            animate={{ 
                                                opacity: [0.6, 1, 0.6],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        
                                        <Button className="relative flex h-auto w-full items-center justify-center gap-3 rounded-xl bg-[#4FFA69] px-10 py-4 text-lg font-bold text-black shadow-2xl transition-all hover:bg-[#42e760] sm:w-auto">
                                            <span>Start Your Free Estimate</span>
                                            <motion.svg 
                                                className="w-5 h-5"
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </motion.svg>
                                        </Button>
                                    </motion.div>
                                </a>
                                <motion.a
                                    href="#plan"
                                    whileHover={{ scale: 1.02, borderColor: "rgba(79, 250, 105, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
                                >
                                    <span>View Examples</span>
                                    <svg className="w-4 h-4 text-[#4FFA69] transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.a>
                            </motion.div>

                            {/* Trust indicators */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#4FFA69]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>No credit card required</span>
                                </div>
                                <div className="hidden sm:block w-px h-4 bg-white/20" />
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#4FFA69]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Free forever</span>
                                </div>
                                <div className="hidden sm:block w-px h-4 bg-white/20" />
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#4FFA69]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Takes less than 3 minutes</span>
                                </div>
                            </motion.div>

                            {/* Social proof bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="border-t border-white/10 pt-10"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4FFA69]/10 mb-3">
                                            <svg className="w-8 h-8 text-[#4FFA69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div className="text-3xl font-bold text-[#4FFA69] mb-1">3 min</div>
                                        <div className="text-sm text-white/60">Average completion time</div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.9 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4FFA69]/10 mb-3">
                                            <svg className="w-8 h-8 text-[#4FFA69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-3xl font-bold text-[#4FFA69] mb-1">500+</div>
                                        <div className="text-sm text-white/60">Projects estimated</div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 1.0 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4FFA69]/10 mb-3">
                                            <svg className="w-8 h-8 text-[#4FFA69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-3xl font-bold text-[#4FFA69] mb-1">$0</div>
                                        <div className="text-sm text-white/60">Forever free</div>
                                    </motion.div>
                                </div>

                                {/* Reviews */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                    className="flex flex-col items-center justify-center gap-4"
                                >
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0, x: -10 }}
                                                whileInView={{ scale: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: 1.2 + i * 0.05, type: "spring" }}
                                                className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-[#4FFA69]/40 to-[#4FFA69]/20 flex items-center justify-center text-xs font-bold text-white"
                                            >
                                                {String.fromCharCode(64 + i)}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.svg
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.2, delay: 1.4 + i * 0.05 }}
                                                className="w-5 h-5 text-[#4FFA69]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </motion.svg>
                                        ))}
                                    </div>
                                    <p className="text-sm text-white/70">
                                        Trusted by <span className="font-semibold text-white">200+ businesses</span> worldwide
                                    </p>
                                </motion.div>

                                {/* Live activity indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1.5 }}
                                    className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50"
                                >
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-2 h-2 rounded-full bg-[#4FFA69]"
                                    />
                                    <span><span className="font-medium text-white/70">5 estimates</span> generated in the last hour</span>
                                </motion.div>
                            </motion.div>
                                    </div>
                    </motion.div>
                </section>

                {/* Footer - Enhanced */}
                <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
                    <div className="mx-auto max-w-7xl px-6 py-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            {/* Brand */}
                            <div className="md:col-span-2">
                                <img src="/logo/logo.png" alt="Ryven" className="mb-4 h-8 w-auto" />
                                <p className="mb-4 max-w-sm text-sm text-white/60">
                                    Get professional project estimates instantly. Ryven delivers detailed, investor-ready PDFs in under 3 minutes.
                                </p>
                                <div className="flex items-center gap-3">
                                    <a href="#form" className="inline-flex items-center gap-2 rounded-lg border border-[#4FFA69]/30 bg-[#4FFA69]/10 px-4 py-2 text-sm font-medium text-[#4FFA69] transition-all hover:bg-[#4FFA69]/20">
                                        <span>Start Free</span>
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
                                <ul className="space-y-2">
                                    {[
                                        { href: '#hero', label: 'Home' },
                                        { href: '#form', label: 'Get Estimate' },
                                        { href: '#problem', label: 'The Problem' },
                                        { href: '#guide', label: 'Our Approach' },
                                        { href: '#plan', label: 'How It Works' },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <a href={link.href} className="text-sm text-white/60 transition-colors hover:text-[#4FFA69]">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                    </div>

                            {/* Resources */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href={route('login')} className="text-sm text-white/60 transition-colors hover:text-[#4FFA69]">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('register')} className="text-sm text-white/60 transition-colors hover:text-[#4FFA69]">
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#cta" className="text-sm text-white/60 transition-colors hover:text-[#4FFA69]">
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#success" className="text-sm text-white/60 transition-colors hover:text-[#4FFA69]">
                                            Features
                                        </a>
                                    </li>
                                </ul>
                </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
                            <p className="text-sm text-white/50">
                                © {new Date().getFullYear()} Ryven. All rights reserved. Estimate smarter.
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-white/50 transition-colors hover:text-white/70">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-white/50 transition-colors hover:text-white/70">
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function AnimatedPlan() {
    const { scrollYProgress } = useScroll({
        offset: ["start end", "end start"],
    });
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const steps = [
        {
            title: 'Complete the embedded form',
            desc: 'Answer guided prompts so AI can scope accurately.',
            icon: '/3d/15. Plane.png.png',
        },
        {
            title: 'AI generates breakdown & costs',
            desc: 'Transparent phases, time, and pricing tailored to you.',
            icon: '/3d/11. Chain.png.png',
        },
        {
            title: 'Receive a polished PDF via email',
            desc: 'Shareable, branded, and ready for stakeholders.',
            icon: '/3d/16. Gem.png.png',
        },
    ];

    return (
        <div className="relative mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-[1fr_auto_1fr]">
            {/* Left column */}
            <div className="space-y-10">
                <PlanStep index={1} step={steps[0]} align="right" />
                <div className="hidden sm:block" />
                <PlanStep index={3} step={steps[2]} align="right" />
            </div>

            {/* Animated vertical progress line */}
            <div className="relative hidden sm:block">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
                <motion.div style={{ scaleY: lineScaleY }} className="origin-top absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#4FFA69]" />
            </div>

            {/* Right column */}
            <div className="space-y-10">
                <div className="hidden sm:block" />
                <PlanStep index={2} step={steps[1]} align="left" />
            </div>
        </div>
    );
}

function PlanStep({ index, step, align }) {
    const isLeft = align === 'left';
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className={`flex items-start gap-4 ${isLeft ? '' : 'justify-end text-right'}`}
        >
            {!isLeft && (
                <div className="hidden sm:block" />
            )}
            <div className={`max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_30px_-10px_rgba(79,250,105,0.2)] ${isLeft ? '' : ''}`}>
                <div className="mb-2 inline-flex items-center gap-2 text-xs text-white/70">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4FFA69] text-black font-semibold">{index}</span>
                    <img src={step.icon} alt="icon" className="h-5 w-5 opacity-80" />
                </div>
                <div className="text-sm font-semibold text-white">{step.title}</div>
                <div className="mt-1 text-sm text-white/70">{step.desc}</div>
            </div>
        </motion.div>
    );
}
