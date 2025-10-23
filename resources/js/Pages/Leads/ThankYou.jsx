import { Head, Link } from '@inertiajs/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ThankYou() {
    const [countdown, setCountdown] = useState(15);
    const [email, setEmail] = useState('');
    const [checklistProgress, setChecklistProgress] = useState(0);

    // Animated counter
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Progress animation
    useEffect(() => {
        const steps = [
            { delay: 1000, progress: 25 },
            { delay: 3000, progress: 50 },
            { delay: 5000, progress: 75 },
            { delay: 7000, progress: 100 },
        ];

        steps.forEach(({ delay, progress }) => {
            setTimeout(() => setChecklistProgress(progress), delay);
        });
    }, []);

    // Floating animation
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
        mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            <Head title="Thank You - Estimate On The Way" />

            {/* Animated background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#4FFA69]/20 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
                {/* Success Icon with Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    className="mb-8"
                >
                    <div className="relative">
                        {/* Pulsing rings */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-4 border-[#4FFA69]"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute inset-0 rounded-full border-4 border-[#4FFA69]"
                        />
                        
                        {/* Main icon */}
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#4FFA69] to-green-400 shadow-2xl">
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-16 w-16 text-black"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <motion.path d="M20 6L9 17l-5-5" />
                            </motion.svg>
                        </div>
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-4 text-center"
                >
                    <h1 className="text-5xl font-bold text-white md:text-6xl">
                        🎉 Amazing!
                    </h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-[#4FFA69] to-green-400"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-12 max-w-2xl text-center text-xl text-white/80"
                >
                    Your estimate is being prepared right now!
                </motion.p>

                {/* Processing Status Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-12 w-full max-w-2xl"
                    onMouseMove={handleMouseMove}
                >
                    <div className="space-y-4">
                        {[
                            { step: 1, label: 'Analyzing your requirements', icon: '🔍', delay: 0 },
                            { step: 2, label: 'Generating project phases', icon: '📋', delay: 0.2 },
                            { step: 3, label: 'Calculating costs & timeline', icon: '💰', delay: 0.4 },
                            { step: 4, label: 'Creating your PDF estimate', icon: '📄', delay: 0.6 },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ 
                                    opacity: checklistProgress >= (item.step * 25) ? 1 : 0.4, 
                                    x: 0,
                                    scale: checklistProgress >= (item.step * 25) ? 1 : 0.95,
                                }}
                                transition={{ duration: 0.5, delay: item.delay }}
                                className={`flex items-center gap-4 rounded-xl border p-4 backdrop-blur-xl transition-all ${
                                    checklistProgress >= (item.step * 25)
                                        ? 'border-[#4FFA69]/50 bg-[#4FFA69]/10'
                                        : 'border-white/10 bg-white/5'
                                }`}
                            >
                                <motion.div
                                    animate={checklistProgress >= (item.step * 25) ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                    className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${
                                        checklistProgress >= (item.step * 25)
                                            ? 'bg-[#4FFA69] text-black'
                                            : 'bg-white/10 text-white/60'
                                    }`}
                                >
                                    {checklistProgress >= (item.step * 25) ? '✓' : item.icon}
                                </motion.div>
                                <div className="flex-1">
                                    <p className={`font-medium ${
                                        checklistProgress >= (item.step * 25) ? 'text-white' : 'text-white/60'
                                    }`}>
                                        {item.label}
                                    </p>
                                </div>
                                {checklistProgress >= (item.step * 25) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4FFA69] text-black">
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6"
                    >
                        <div className="overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${checklistProgress}%` }}
                                transition={{ duration: 0.5 }}
                                className="h-3 rounded-full bg-gradient-to-r from-[#4FFA69] to-green-400"
                            />
                        </div>
                        <p className="mt-2 text-center text-sm text-white/60">
                            Processing... {checklistProgress}%
                        </p>
                    </motion.div>
                </motion.div>

                {/* Email Countdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mb-12 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl"
                        >
                            📧
                        </motion.div>
                        <div>
                            <p className="font-semibold text-white">Check your inbox!</p>
                            <p className="text-sm text-white/70">
                                Your estimate will arrive in approximately{' '}
                                <motion.span
                                    key={countdown}
                                    initial={{ scale: 1.5, color: '#4FFA69' }}
                                    animate={{ scale: 1, color: '#ffffff' }}
                                    className="font-bold"
                                >
                                    {countdown}
                                </motion.span>
                                {' '}seconds
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="w-full max-w-2xl"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-[#4FFA69]/20 bg-gradient-to-br from-[#4FFA69]/10 via-green-500/5 to-transparent p-8 backdrop-blur-xl md:p-12">
                        {/* Animated background glow */}
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-r from-[#4FFA69]/20 to-transparent"
                        />

                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.6, type: "spring" }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4FFA69]/30 bg-[#4FFA69]/20 px-4 py-1.5 text-xs font-medium text-[#4FFA69]"
                            >
                                <motion.span
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    ⚡
                                </motion.span>
                                <span>Pro Tip</span>
                            </motion.div>

                            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                                Want to manage all your estimates in one place?
                            </h2>
                            
                            <p className="mb-6 text-lg leading-relaxed text-white/80">
                                Create a free account to track your project estimates, compare different options, 
                                and communicate directly with our team. Plus, get instant access to your estimate dashboard!
                            </p>

                            {/* Benefits Grid */}
                            <div className="mb-8 grid grid-cols-2 gap-4">
                                {[
                                    { icon: '📊', text: 'Track all estimates' },
                                    { icon: '💬', text: 'Direct team chat' },
                                    { icon: '🔔', text: 'Status updates' },
                                    { icon: '📈', text: 'Compare proposals' },
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={benefit.text}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.8 + index * 0.1 }}
                                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                                    >
                                        <span className="text-2xl">{benefit.icon}</span>
                                        <span className="text-sm font-medium text-white">{benefit.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link href={route('register')}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#4FFA69] to-green-400 opacity-75 blur-lg transition duration-300 group-hover:opacity-100" />
                                    
                                    <Button className="relative w-full bg-[#4FFA69] py-7 text-lg font-bold text-black transition-all hover:bg-[#42e760]">
                                        <span className="flex items-center justify-center gap-3">
                                            Create Free Account
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="text-2xl"
                                            >
                                                →
                                            </motion.span>
                                        </span>
                                    </Button>
                                </motion.div>
                            </Link>

                            <p className="mt-4 text-center text-sm text-white/60">
                                No credit card required • Free forever • Setup in 30 seconds
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Secondary Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-6"
                >
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                    >
                        <span>←</span>
                        <span className="border-b border-transparent group-hover:border-white">Back to home</span>
                    </Link>
                    <span className="text-white/30">•</span>
                    <Link
                        href={route('leads.create')}
                        className="group flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                    >
                        <span>📝</span>
                        <span className="border-b border-transparent group-hover:border-white">Submit another project</span>
                    </Link>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="mt-12 text-center"
                >
                    <div className="mb-3 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 2.4 + i * 0.1, type: "spring" }}
                                className="text-2xl text-[#4FFA69]"
                            >
                                ★
                            </motion.span>
                        ))}
                    </div>
                    <p className="text-sm text-white/60">
                        Join <span className="font-semibold text-white">200+ businesses</span> who trust Ryven
                    </p>
                </motion.div>
            </div>
        </div>
    );
}


