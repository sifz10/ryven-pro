import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-3 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#4FFA69] text-[#4FFA69] focus:border-[#4FFA69]'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-[#4FFA69] focus:border-border focus:text-foreground') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
