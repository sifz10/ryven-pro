import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import { useState } from 'react';

export default function Index({ proposals, filters }) {
    const [status, setStatus] = useState(filters.status || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('my.proposals.index'), { status }, { preserveState: true });
    };

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
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    My Proposals
                </h2>
            }
        >
            <Head title="My Proposals" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="mb-6 bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                        <form onSubmit={handleFilter} className="flex gap-4">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 bg-background border-border text-foreground focus:border-[#4FFA69] focus:ring-[#4FFA69] rounded-md shadow-sm"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#4FFA69] text-black font-medium rounded-md hover:bg-[#4FFA69]/90 transition-colors"
                            >
                                Filter
                            </button>
                            {filters.status && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStatus('');
                                        router.get(route('my.proposals.index'));
                                    }}
                                    className="px-4 py-2 text-sm text-muted-foreground hover:text-[#4FFA69] transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Proposals List */}
                    {proposals.data.length > 0 ? (
                        <div className="space-y-4">
                            {proposals.data.map((proposal) => (
                                <Link
                                    key={proposal.id}
                                    href={route('my.proposals.show', proposal.id)}
                                    className="block bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md hover:border-[#4FFA69]/30 transition-all"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-foreground">
                                                        {proposal.name || 'Unnamed Proposal'}
                                                    </h3>
                                                    <Badge variant={getStatusVariant(proposal.status)}>
                                                        {proposal.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {proposal.company} • {proposal.project_type}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(proposal.created_at)}
                                                </p>
                                                {proposal.estimate_pdf_path && (
                                                    <span className="inline-flex items-center mt-2 text-xs text-green-600">
                                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        PDF Ready
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {proposal.project_description}
                                        </p>

                                        <div className="mt-4 flex items-center text-sm text-[#4FFA69] hover:text-[#4FFA69]/80 transition-colors">
                                            View Details
                                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
                            <EmptyState
                                title="No proposals found"
                                description={filters.status ? "Try adjusting your filters." : "You haven't created any proposals yet."}
                                icon={
                                    <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                }
                            />
                        </div>
                    )}

                    {/* Pagination */}
                    {proposals.links.length > 3 && (
                        <div className="mt-6 bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="px-4 py-3 flex items-center justify-between">
                                <div className="text-sm text-foreground">
                                    Showing <span className="font-medium text-[#4FFA69]">{proposals.from}</span> to{' '}
                                    <span className="font-medium text-[#4FFA69]">{proposals.to}</span> of{' '}
                                    <span className="font-medium text-[#4FFA69]">{proposals.total}</span> results
                                </div>
                                <div className="flex space-x-2">
                                    {proposals.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                                link.active
                                                    ? 'bg-[#4FFA69] text-black font-medium'
                                                    : link.url
                                                    ? 'bg-background text-foreground hover:bg-[#4FFA69]/10 hover:text-[#4FFA69] border border-border'
                                                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

