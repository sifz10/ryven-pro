export default function EmptyState({ title, description, icon, action }) {
    return (
        <div className="text-center py-12">
            <div className="flex justify-center mb-4">
                <div className="rounded-full bg-muted p-3">
                    {icon}
                </div>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

