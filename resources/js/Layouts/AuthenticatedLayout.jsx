import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-background transition-colors duration-200">
            <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center gap-3">
                                <Link href="/" className="flex items-center">
                                    <img src="/logo/logo.png" alt="Ryven" className="h-8 w-auto" />
                                </Link>
                            </div>

                            <div className="hidden space-x-1 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                {user.is_admin ? (
                                    <>
                                        <NavLink
                                            href={route('admin.users.index')}
                                            active={route().current('admin.users.*')}
                                        >
                                            Users
                                        </NavLink>
                                        <NavLink
                                            href={route('admin.proposals.index')}
                                            active={route().current('admin.proposals.*')}
                                        >
                                            All Proposals
                                        </NavLink>
                                    </>
                                ) : (
                                    <NavLink
                                        href={route('my.proposals.index')}
                                        active={route().current('my.proposals.*')}
                                    >
                                        My Proposals
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-3">
                            <ThemeToggle />
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium leading-4 text-foreground transition duration-150 ease-in-out hover:text-[#4FFA69] focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition duration-150 ease-in-out hover:bg-accent hover:text-[#4FFA69] focus:bg-accent focus:text-[#4FFA69] focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {user.is_admin ? (
                            <>
                                <ResponsiveNavLink
                                    href={route('admin.users.index')}
                                    active={route().current('admin.users.*')}
                                >
                                    Users
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('admin.proposals.index')}
                                    active={route().current('admin.proposals.*')}
                                >
                                    All Proposals
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <ResponsiveNavLink
                                href={route('my.proposals.index')}
                                active={route().current('my.proposals.*')}
                            >
                                My Proposals
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-border pb-1 pt-4">
                        <div className="px-4 flex items-center justify-between">
                            <div>
                                <div className="text-base font-medium text-foreground">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">
                                    {user.email}
                                </div>
                            </div>
                            <ThemeToggle />
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-card border-b border-border shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="bg-background">{children}</main>
        </div>
    );
}
