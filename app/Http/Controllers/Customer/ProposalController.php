<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProposalController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->input('status');
        
        $proposals = Lead::query()
            ->where('user_id', $request->user()->id)
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Customer/Proposals/Index', [
            'proposals' => $proposals,
            'filters' => ['status' => $status],
        ]);
    }

    public function show(Lead $proposal): Response
    {
        // Ensure customer can only view their own proposals
        if ($proposal->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access.');
        }

        return Inertia::render('Customer/Proposals/Show', [
            'proposal' => $proposal,
        ]);
    }
}
