<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadEstimateReady extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Lead $lead, public array $analysis = [])
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '✨ Your Project Proposal is Ready - ' . ucfirst($this->lead->project_type) . ' Project',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.lead_estimate_ready',
            with: [
                'lead' => $this->lead,
                'analysis' => $this->analysis,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}


