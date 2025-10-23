<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LeadController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // User Management
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    
    // Proposal Management
    Route::get('proposals', [\App\Http\Controllers\Admin\ProposalController::class, 'index'])->name('proposals.index');
    Route::get('proposals/{proposal}', [\App\Http\Controllers\Admin\ProposalController::class, 'show'])->name('proposals.show');
    Route::patch('proposals/{proposal}/status', [\App\Http\Controllers\Admin\ProposalController::class, 'updateStatus'])->name('proposals.updateStatus');
    Route::delete('proposals/{proposal}', [\App\Http\Controllers\Admin\ProposalController::class, 'destroy'])->name('proposals.destroy');
});

// Customer Routes
Route::middleware(['auth'])->prefix('my')->name('my.')->group(function () {
    Route::get('proposals', [\App\Http\Controllers\Customer\ProposalController::class, 'index'])->name('proposals.index');
    Route::get('proposals/{proposal}', [\App\Http\Controllers\Customer\ProposalController::class, 'show'])->name('proposals.show');
});

require __DIR__.'/auth.php';

// Lead capture & estimate routes
Route::get('/estimate', [LeadController::class, 'create'])->name('leads.create');
Route::post('/estimate', [LeadController::class, 'store'])->name('leads.store');
Route::get('/estimate/thank-you', [LeadController::class, 'thankyou'])->name('leads.thankyou');

// Test Email sending routes (sends immediately, not queued)
// Route::get('/test-email', function () {
//     try {
//         // Create and SAVE a real test lead to database
//         $testLead = \App\Models\Lead::create([
//             'name' => 'Test User',
//             'email' => 'kazi.sifat1999@gmail.com',
//             'company' => 'Test Company Inc.',
//             'project_type' => 'web-app',
//             'project_description' => 'This is a test email to verify email configuration is working correctly. We need a comprehensive e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
//             'requirements' => [
//                 'User registration and login',
//                 'Product catalog with search',
//                 'Shopping cart functionality',
//                 'Payment gateway integration',
//                 'Admin dashboard'
//             ],
//             'timeline_weeks' => 12,
//             'status' => 'pending',
//             'estimate_pdf_path' => 'estimates/test/test-estimate.pdf',
//         ]);
        
//         // Send email immediately (synchronously, bypassing the queue)
//         // We use Mail::send with view() to bypass the ShouldQueue interface
//         \Mail::send('emails.lead_estimate_ready', ['lead' => $testLead], function($message) use ($testLead) {
//             $message->to($testLead->email)
//                     ->subject('Your Project Estimate is Ready');
//         });
        
//         return response()->json([
//             'success' => true,
//             'message' => 'Test email sent successfully to ' . $testLead->email,
//             'details' => [
//                 'recipient' => $testLead->email,
//                 'subject' => 'Your Project Estimate is Ready',
//                 'lead_name' => $testLead->name,
//                 'company' => $testLead->company,
//                 'lead_id' => $testLead->id,
//             ],
//             'note' => 'A test lead record was created in the database with ID: ' . $testLead->id
//         ]);
        
//     } catch (\Exception $e) {
//         return response()->json([
//             'success' => false,
//             'message' => 'Failed to send test email',
//             'error' => $e->getMessage(),
//             'trace' => config('app.debug') ? $e->getTraceAsString() : null
//         ], 500);
//     }
// })->name('test.email');