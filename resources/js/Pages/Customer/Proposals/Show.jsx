import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Badge from '@/Components/Badge';

export default function Show({ proposal }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
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

    const getStatusDescription = (status) => {
        const descriptions = {
            pending: 'Your proposal is being reviewed. We\'ll update you soon!',
            in_progress: 'We\'re working on your proposal. Stay tuned!',
            completed: 'Your proposal is ready! Download the PDF below.',
            rejected: 'Unfortunately, this proposal was not approved.',
        };
        return descriptions[status] || '';
    };

    const formatBudget = (budget) => {
        if (!budget) return 'N/A';
        
        try {
            const budgetData = typeof budget === 'string' ? JSON.parse(budget) : budget;
            
            if (budgetData.range) {
                return budgetData.range;
            }
            if (budgetData.amount) {
                return `$${Number(budgetData.amount).toLocaleString()}`;
            }
            return JSON.stringify(budgetData);
        } catch (e) {
            return budget;
        }
    };

    const formatTimeline = (timeline) => {
        if (!timeline) return 'N/A';
        
        try {
            const timelineData = typeof timeline === 'string' ? JSON.parse(timeline) : timeline;
            
            if (timelineData.weeks) {
                const weeks = Number(timelineData.weeks);
                return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
            }
            if (timelineData.months) {
                const months = Number(timelineData.months);
                return `${months} ${months === 1 ? 'month' : 'months'}`;
            }
            if (timelineData.days) {
                const days = Number(timelineData.days);
                return `${days} ${days === 1 ? 'day' : 'days'}`;
            }
            return JSON.stringify(timelineData);
        } catch (e) {
            return timeline;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-foreground">
                        Proposal Details
                    </h2>
                    <Link
                        href={route('my.proposals.index')}
                        className="text-sm text-[#4FFA69] hover:text-[#4FFA69]/80 font-medium"
                    >
                        ← Back to My Proposals
                    </Link>
                </div>
            }
        >
            <Head title={`Proposal - ${proposal.name || 'Unnamed'}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Status Banner */}
                    <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    {proposal.name || 'Unnamed Proposal'}
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <Badge variant={getStatusVariant(proposal.status)}>
                                        {proposal.status}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {getStatusDescription(proposal.status)}
                                    </span>
                                </div>
                            </div>
                            {proposal.estimate_pdf_path && (
                                <a
                                    href={`/storage/${proposal.estimate_pdf_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-[#4FFA69]/10 text-[#4FFA69] border border-[#4FFA69]/20 rounded-md hover:bg-[#4FFA69]/20 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download PDF
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact Information */}
                            <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                                <h4 className="text-lg font-semibold text-foreground mb-4">
                                    Contact Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <p className="mt-1 text-sm text-foreground">{proposal.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <p className="mt-1 text-sm text-foreground">{proposal.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                        <p className="mt-1 text-sm text-foreground">{proposal.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Company</label>
                                        <p className="mt-1 text-sm text-foreground">{proposal.company || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                                <h4 className="text-lg font-semibold text-foreground mb-4">
                                    Project Details
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Project Type</label>
                                        <p className="mt-1 text-sm text-foreground">{proposal.project_type || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                                        <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">
                                            {proposal.project_description || 'N/A'}
                                        </p>
                                    </div>
                                    {proposal.requirements && proposal.requirements.length > 0 && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Requirements</label>
                                            <ul className="mt-2 list-disc list-inside space-y-1">
                                                {proposal.requirements.map((req, index) => (
                                                    <li key={index} className="text-sm text-foreground">{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Budget & Timeline */}
                            {(proposal.budget || proposal.timeline) && (
                                <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                                    <h4 className="text-lg font-semibold text-foreground mb-4">
                                        Budget & Timeline
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {proposal.budget && (
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground flex items-center">
                                                    <svg className="w-5 h-5 mr-2 text-[#4FFA69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Budget
                                                </label>
                                                <p className="mt-2 text-lg font-semibold text-[#4FFA69]">
                                                    {formatBudget(proposal.budget)}
                                                </p>
                                            </div>
                                        )}
                                        {proposal.timeline && (
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground flex items-center">
                                                    <svg className="w-5 h-5 mr-2 text-[#4FFA69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Timeline
                                                </label>
                                                <p className="mt-2 text-lg font-semibold text-[#4FFA69]">
                                                    {formatTimeline(proposal.timeline)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Timeline */}
                            <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                                <h4 className="text-lg font-semibold text-foreground mb-4">
                                    Timeline
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-foreground">Proposal Submitted</p>
                                            <p className="text-xs text-muted-foreground">{formatDate(proposal.created_at)}</p>
                                        </div>
                                    </div>
                                    {proposal.updated_at !== proposal.created_at && (
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-foreground">Last Updated</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(proposal.updated_at)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="bg-[#4FFA69]/5 border border-[#4FFA69]/20 overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/40 transition-colors">
                                <h4 className="text-lg font-semibold text-foreground mb-2">
                                    Need Help?
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    If you have any questions about your proposal, please contact our support team.
                                </p>
                                <a
                                    href="mailto:support@example.com"
                                    className="text-sm text-[#4FFA69] hover:text-[#4FFA69]/80 font-medium"
                                >
                                    Contact Support →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

