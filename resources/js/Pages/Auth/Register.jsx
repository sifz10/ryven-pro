import { Button } from '@/components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">Create account</h1>
                <p className="mt-2 text-sm text-white/60">
                    Start getting instant project estimates
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-[#4FFA69]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4FFA69]/20"
                        autoComplete="name"
                        autoFocus
                        placeholder="John Doe"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                    )}
                </div>

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
                        placeholder="you@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-white/90">
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:border-[#4FFA69]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4FFA69]/20"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="mt-2 text-sm text-red-400">{errors.password_confirmation}</p>
                    )}
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#4FFA69] py-6 text-base font-semibold text-black transition-all hover:bg-[#42e760] disabled:opacity-50"
                >
                    {processing ? 'Creating account...' : 'Create account'}
                </Button>

                {/* Login link */}
                <p className="text-center text-sm text-white/60">
                    Already have an account?{' '}
                    <Link
                        href={route('login')}
                        className="font-medium text-[#4FFA69] transition-colors hover:text-[#42e760]"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
