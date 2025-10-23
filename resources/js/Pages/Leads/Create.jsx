import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Create() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: '',
        project_description: '',
        requirements: {},
        budget: {},
        timeline: {},
        metadata: {},
    });

    const next = () => setStep((s) => Math.min(s + 1, 4));
    const back = () => setStep((s) => Math.max(s - 1, 1));

    const submit = (e) => {
        e.preventDefault();
        post(route('leads.store'));
    };

    return (
        <GuestLayout>
            <Head title="Get Estimate" />
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 text-2xl font-semibold">Project Estimate</h1>
                <form onSubmit={submit} className="space-y-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input className="mt-1 w-full rounded-md border p-2" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input type="email" className="mt-1 w-full rounded-md border p-2" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone</label>
                                <input className="mt-1 w-full rounded-md border p-2" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Company</label>
                                <input className="mt-1 w-full rounded-md border p-2" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Project Type</label>
                                <input className="mt-1 w-full rounded-md border p-2" value={data.project_type} onChange={(e) => setData('project_type', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Project Description</label>
                                <textarea className="mt-1 w-full rounded-md border p-2" rows={5} value={data.project_description} onChange={(e) => setData('project_description', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Key Requirements (comma separated)</label>
                                <input className="mt-1 w-full rounded-md border p-2" onChange={(e) => setData('requirements', { items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium">Budget (USD)</label>
                                    <input type="number" className="mt-1 w-full rounded-md border p-2" onChange={(e) => setData('budget', { ...(data.budget||{}), amount: Number(e.target.value||0) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Timeline (weeks)</label>
                                    <input type="number" className="mt-1 w-full rounded-md border p-2" onChange={(e) => setData('timeline', { ...(data.timeline||{}), weeks: Number(e.target.value||0) })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Review your info, then submit to receive a PDF estimate via email.</p>
                            <pre className="overflow-auto rounded-md bg-gray-50 p-3 text-xs">{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Button type="button" variant="secondary" onClick={back} disabled={step===1}>Back</Button>
                            {step < 4 ? (
                                <Button type="button" onClick={next}>Next</Button>
                            ) : (
                                <Button type="submit" disabled={processing}>Submit</Button>
                            )}
                        </div>
                        <div className="text-sm text-gray-500">Step {step} of 4</div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}


