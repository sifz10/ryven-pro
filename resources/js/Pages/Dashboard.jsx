import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import StatsCard from '@/Components/StatsCard';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';

export default function Dashboard({ stats, recentProposals, isAdmin }) {
    const { auth } = usePage().props;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusVariant = (status) => {
        const variants = {
            pending: 'pending',
            in_progress: 'in_progress',
            completed: 'completed',
            rejected: 'rejected',
        };
        return variants[status] || 'default';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Dashboard
                </h2>
                    <p className="text-sm text-muted-foreground">
                        Welcome back, <span className="text-[#4FFA69] font-medium">{auth.user.name}</span>!
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {isAdmin ? (
                            <>
                                <StatsCard
                                    title="Total Customers"
                                    value={stats.total_users}
                                    color="green"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    }
                                />
                                <StatsCard
                                    title="Total Proposals"
                                    value={stats.total_proposals}
                                    color="green"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    }
                                />
                                <StatsCard
                                    title="Pending"
                                    value={stats.pending_proposals}
                                    color="yellow"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />
                                <StatsCard
                                    title="Completed"
                                    value={stats.completed_proposals}
                                    color="green"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <StatsCard
                                    title="My Proposals"
                                    value={stats.total_proposals}
                                    color="green"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    }
                                />
                                <StatsCard
                                    title="Pending"
                                    value={stats.pending_proposals}
                                    color="yellow"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />
                                <StatsCard
                                    title="Completed"
                                    value={stats.completed_proposals}
                                    color="green"
                                    icon={
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                />
                            </>
                        )}
                    </div>

                    {/* Recent Proposals */}
                    <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-foreground">Recent Proposals</h3>
                                <Link
                                    href={isAdmin ? route('admin.proposals.index') : route('my.proposals.index')}
                                    className="text-sm text-[#4FFA69] hover:text-[#4FFA69]/80 font-medium"
                                >
                                    View all →
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentProposals.length > 0 ? (
                                <div className="space-y-4">
                                    {recentProposals.map((proposal) => (
                                        <Link
                                            key={proposal.id}
                                            href={isAdmin ? route('admin.proposals.show', proposal.id) : route('my.proposals.show', proposal.id)}
                                            className="block p-4 border border-border rounded-lg hover:bg-accent hover:border-[#4FFA69]/30 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3">
                                                        <h4 className="text-sm font-semibold text-foreground">
                                                            {proposal.name || 'Unnamed Proposal'}
                                                        </h4>
                                                        <Badge variant={getStatusVariant(proposal.status)}>
                                                            {proposal.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {proposal.company} • {proposal.project_type}
                                                    </p>
                                                    {isAdmin && proposal.user && (
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            Customer: {proposal.user.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatDate(proposal.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No proposals yet"
                                    description="Get started by creating your first proposal."
                                    icon={
                                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    }
                                />
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isAdmin ? (
                            <>
                                <Link
                                    href={route('admin.users.index')}
                                    className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-md hover:border-[#4FFA69]/30 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-[#4FFA69]/10 text-[#4FFA69] rounded-md p-3 group-hover:bg-[#4FFA69]/20 transition-colors">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-semibold text-foreground group-hover:text-[#4FFA69] transition-colors">Manage Users</h4>
                                            <p className="text-sm text-muted-foreground">View and manage all users</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link
                                    href={route('admin.proposals.index')}
                                    className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-md hover:border-[#4FFA69]/30 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-[#4FFA69]/10 text-[#4FFA69] rounded-md p-3 group-hover:bg-[#4FFA69]/20 transition-colors">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-semibold text-foreground group-hover:text-[#4FFA69] transition-colors">View All Proposals</h4>
                                            <p className="text-sm text-muted-foreground">Manage all proposals</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('my.proposals.index')}
                                    className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-md hover:border-[#4FFA69]/30 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-[#4FFA69]/10 text-[#4FFA69] rounded-md p-3 group-hover:bg-[#4FFA69]/20 transition-colors">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-semibold text-foreground group-hover:text-[#4FFA69] transition-colors">My Proposals</h4>
                                            <p className="text-sm text-muted-foreground">View all your proposals</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link
                                    href={route('profile.edit')}
                                    className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-md hover:border-[#4FFA69]/30 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-[#4FFA69]/10 text-[#4FFA69] rounded-md p-3 group-hover:bg-[#4FFA69]/20 transition-colors">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-semibold text-foreground group-hover:text-[#4FFA69] transition-colors">My Profile</h4>
                                            <p className="text-sm text-muted-foreground">Update your profile</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
