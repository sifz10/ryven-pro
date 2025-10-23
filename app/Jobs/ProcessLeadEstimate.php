<?php

namespace App\Jobs;

use App\Mail\LeadEstimateReady;
use App\Models\Lead;
use App\Services\EstimateGenerator;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ProcessLeadEstimate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Lead $lead)
    {
    }

    public function handle(EstimateGenerator $generator): void
    {
        $analysis = $generator->generateEstimatePdf($this->lead);
        
        $this->lead->forceFill([
            'status' => 'processed',
        ])->save();

        Mail::to($this->lead->email)->send(new LeadEstimateReady($this->lead, $analysis));
    }
}


