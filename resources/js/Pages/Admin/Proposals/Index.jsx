import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Badge from '@/Components/Badge';
import { useState } from 'react';

export default function Index({ proposals, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.proposals.index'), { search, status }, { preserveState: true });
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
                    All Proposals
                </h2>
            }
        >
            <Head title="All Proposals" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="mb-6 bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                        <form onSubmit={handleFilter} className="flex gap-4">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, email, or company..."
                                className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#4FFA69] focus:ring-[#4FFA69] rounded-md shadow-sm"
                            />
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="bg-background border-border text-foreground focus:border-[#4FFA69] focus:ring-[#4FFA69] rounded-md shadow-sm"
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
                            {(filters.search || filters.status) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setStatus('');
                                        router.get(route('admin.proposals.index'));
                                    }}
                                    className="px-4 py-2 text-sm text-muted-foreground hover:text-[#4FFA69] transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Proposals Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {proposals.data.map((proposal) => (
                            <Link
                                key={proposal.id}
                                href={route('admin.proposals.show', proposal.id)}
                                className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md hover:border-[#4FFA69]/30 transition-all"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {proposal.name || 'Unnamed Proposal'}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {proposal.company}
                                            </p>
                                        </div>
                                        <Badge variant={getStatusVariant(proposal.status)}>
                                            {proposal.status}
                                        </Badge>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {proposal.user ? proposal.user.name : 'No customer'}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {proposal.email}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            {proposal.project_type}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                        {proposal.project_description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Created {formatDate(proposal.created_at)}</span>
                                        {proposal.estimate_pdf_path && (
                                            <span className="flex items-center text-green-600">
                                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                PDF Generated
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {proposals.data.length === 0 && (
                        <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-12">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-semibold text-foreground">No proposals found</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
                            </div>
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

