<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            // Admin dashboard stats
            $stats = [
                'total_users' => User::where('role', 'customer')->count(),
                'total_proposals' => Lead::count(),
                'pending_proposals' => Lead::where('status', 'pending')->count(),
                'completed_proposals' => Lead::where('status', 'completed')->count(),
            ];

            // Recent proposals
            $recentProposals = Lead::with('user')
                ->latest()
                ->take(5)
                ->get();

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'recentProposals' => $recentProposals,
                'isAdmin' => true,
            ]);
        }

        // Customer dashboard stats
        $stats = [
            'total_proposals' => Lead::where('user_id', $user->id)->count(),
            'pending_proposals' => Lead::where('user_id', $user->id)->where('status', 'pending')->count(),
            'completed_proposals' => Lead::where('user_id', $user->id)->where('status', 'completed')->count(),
        ];

        // Recent proposals
        $recentProposals = Lead::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentProposals' => $recentProposals,
            'isAdmin' => false,
        ]);
    }
}
