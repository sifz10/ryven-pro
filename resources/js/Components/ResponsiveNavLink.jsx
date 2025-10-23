import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[#4FFA69] bg-[#4FFA69]/10 text-[#4FFA69] focus:border-[#4FFA69] focus:bg-[#4FFA69]/20 focus:text-[#4FFA69]'
                    : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-[#4FFA69] focus:border-border focus:bg-accent focus:text-foreground'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
