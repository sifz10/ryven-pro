<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Jobs\ProcessLeadEstimate;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Leads/Create');
    }

    public function store(StoreLeadRequest $request): RedirectResponse
    {
        $lead = Lead::create($request->validated());

        ProcessLeadEstimate::dispatch($lead);

        return redirect()->route('leads.thankyou');
    }

    public function thankyou(): Response
    {
        return Inertia::render('Leads/ThankYou');
    }
}


