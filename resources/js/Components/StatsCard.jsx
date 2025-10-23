export default function StatsCard({ title, value, icon, color = 'green' }) {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-500',
        green: 'bg-[#4FFA69]/10 text-[#4FFA69]',
        yellow: 'bg-yellow-500/10 text-yellow-500',
        purple: 'bg-purple-500/10 text-purple-500',
        red: 'bg-red-500/10 text-red-500',
    };

    return (
        <div className="bg-card border border-border overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md hover:border-[#4FFA69]/30 transition-all duration-200">
            <div className="p-6">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 ${colorClasses[color]} rounded-md p-3`}>
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-muted-foreground truncate">
                                {title}
                            </dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-foreground">
                                    {value}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

