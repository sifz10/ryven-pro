import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-black">
            {/* Animated background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 bg-grid opacity-20" />
                
                {/* Floating orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#4FFA69]/20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
                />
            </div>

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-8"
            >
                <Link href="/">
                    <img src="/logo/logo.png" alt="Ryven" className="h-10 w-auto" />
                </Link>
            </motion.div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-8 shadow-2xl backdrop-blur-xl">
                    {/* Glow effect */}
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#4FFA69]/20 to-transparent opacity-50 blur-xl" />
                    
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </motion.div>

            {/* Footer note */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-10 mt-6 text-center text-sm text-white/40"
            >
                © {new Date().getFullYear()} Ryven Global LLC. All rights reserved.
            </motion.p>
        </div>
    );
}
