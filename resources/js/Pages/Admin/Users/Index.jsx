import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Badge from '@/Components/Badge';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search }, { preserveState: true });
    };

    const handleDelete = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', userId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-foreground">
                        User Management
                    </h2>
                    <Link href={route('admin.users.create')}>
                        <PrimaryButton>Add New User</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-6 bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg p-6 hover:border-[#4FFA69]/30 transition-colors">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users by name or email..."
                                className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#4FFA69] focus:ring-[#4FFA69] rounded-md shadow-sm"
                            />
                            <PrimaryButton type="submit">Search</PrimaryButton>
                            {filters.search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        router.get(route('admin.users.index'));
                                    }}
                                    className="px-4 py-2 text-sm text-muted-foreground hover:text-[#4FFA69] transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Users Table */}
                    <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Proposals
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-card divide-y divide-border">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-accent transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-foreground">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                                {user.leads_count}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <Link
                                                    href={route('admin.users.edit', user.id)}
                                                    className="text-[#4FFA69] hover:text-[#4FFA69]/80 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users.links.length > 3 && (
                            <div className="bg-muted/30 px-4 py-3 border-t border-border sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-foreground">
                                        Showing <span className="font-medium text-[#4FFA69]">{users.from}</span> to{' '}
                                        <span className="font-medium text-[#4FFA69]">{users.to}</span> of{' '}
                                        <span className="font-medium text-[#4FFA69]">{users.total}</span> results
                                    </div>
                                    <div className="flex space-x-2">
                                        {users.links.map((link, index) => (
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
            </div>
        </AuthenticatedLayout>
    );
}

