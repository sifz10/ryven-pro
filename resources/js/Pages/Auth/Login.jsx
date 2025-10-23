import { Button } from '@/components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                <p className="mt-2 text-sm text-white/60">
                    Sign in to your Ryven account
                </p>
            </div>

            {status && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-lg border border-[#4FFA69]/30 bg-[#4FFA69]/10 p-3 text-sm font-medium text-[#4FFA69]"
                >
                    {status}
                </motion.div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-[#4FFA69]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4FFA69]/20"
                        autoComplete="username"
                        autoFocus
                        placeholder="you@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white/90">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-[#4FFA69]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4FFA69]/20"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                    )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#4FFA69] focus:ring-2 focus:ring-[#4FFA69]/20 focus:ring-offset-0"
                        />
                        <span className="ml-2 text-sm text-white/70">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-[#4FFA69] transition-colors hover:text-[#42e760] focus:outline-none focus:ring-2 focus:ring-[#4FFA69]/20"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#4FFA69] py-6 text-base font-semibold text-black transition-all hover:bg-[#42e760] disabled:opacity-50"
                >
                    {processing ? 'Signing in...' : 'Sign in'}
                </Button>

                {/* Register link */}
                <p className="text-center text-sm text-white/60">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="font-medium text-[#4FFA69] transition-colors hover:text-[#42e760]"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
