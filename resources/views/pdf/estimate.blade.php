<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Project Proposal - Ryven Global LLC</title>
    <style>
        @page {
            margin: 0;
        }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            color: #1a1a1a; 
            line-height: 1.7;
            margin: 0;
            padding: 0;
            font-size: 10pt;
        }
        .page {
            padding: 60px 50px;
            position: relative;
        }
        
        /* Cover Page Styles */
        .cover-page {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
            color: white;
            height: 100vh;
            padding: 0;
            margin: 0;
            position: relative;
            overflow: hidden;
        }
        .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(45deg, transparent 0%, rgba(79, 250, 105, 0.05) 100%);
        }
        .cover-content {
            position: relative;
            z-index: 2;
            padding: 100px 60px;
        }
        .logo {
            font-size: 48px;
            font-weight: bold;
            color: #4FFA69;
            margin-bottom: 5px;
            letter-spacing: 8px;
        }
        .logo-subtitle {
            font-size: 12px;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 120px;
        }
        .cover-title {
            font-size: 42px;
            margin-bottom: 30px;
            color: white;
            font-weight: 300;
            letter-spacing: 2px;
        }
        .cover-divider {
            width: 80px;
            height: 4px;
            background: #4FFA69;
            margin: 30px 0;
        }
        .cover-info {
            font-size: 14px;
            color: #d1d5db;
            margin: 15px 0;
            line-height: 1.8;
        }
        .cover-info strong {
            color: #4FFA69;
            font-weight: 600;
        }
        .cover-date {
            position: absolute;
            bottom: 60px;
            left: 60px;
            font-size: 11px;
            color: #6b7280;
        }
        
        /* Typography */
        h1 { 
            font-size: 24px; 
            color: #0a0a0a;
            margin-bottom: 20px;
            margin-top: 0;
            font-weight: 600;
            letter-spacing: 0.5px;
            padding-bottom: 12px;
            border-bottom: 2px solid #4FFA69;
        }
        h2 { 
            font-size: 16px; 
            color: #1a1a1a;
            margin-top: 30px;
            margin-bottom: 15px;
            font-weight: 600;
            position: relative;
            padding-left: 20px;
        }
        h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #4FFA69;
        }
        h3 {
            font-size: 13px;
            color: #374151;
            margin-top: 20px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        /* Content Sections */
        .section {
            margin-bottom: 35px;
        }
        .section p {
            margin: 12px 0;
            line-height: 1.8;
            color: #374151;
        }
        
        /* Boxes and Highlights */
        .highlight-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-left: 5px solid #4FFA69;
            padding: 25px 30px;
            margin: 25px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .highlight-box p {
            margin: 0;
            color: #1a1a1a;
            font-size: 11pt;
            line-height: 1.8;
        }
        .info-box {
            background: #f8fafc;
            border-left: 4px solid #4FFA69;
            padding: 20px 25px;
            margin: 20px 0;
        }
        .info-box p {
            margin: 0;
            color: #374151;
        }
        .problem-box {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 20px 25px;
            margin: 20px 0;
        }
        .problem-box p {
            margin: 0;
            color: #78350f;
        }
        .client-info {
            background: #f8fafc;
            padding: 25px;
            margin-bottom: 30px;
            border: 1px solid #e5e7eb;
        }
        .client-info p {
            margin: 8px 0;
            font-size: 11pt;
            color: #374151;
        }
        .client-info strong {
            color: #1a1a1a;
            font-weight: 600;
        }
        
        /* Tables */
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 25px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td { 
            padding: 15px 12px; 
            font-size: 10pt;
            text-align: left;
            vertical-align: top;
            border: none;
        }
        th { 
            background: #1a1a1a; 
            font-weight: 600;
            color: white;
            text-transform: uppercase;
            font-size: 9pt;
            letter-spacing: 0.5px;
        }
        .phase-row {
            background: #ffffff;
            border-bottom: 1px solid #e5e7eb;
        }
        .phase-row:nth-child(even) {
            background: #f9fafb;
        }
        .phase-name {
            font-weight: 600;
            color: #1a1a1a;
            font-size: 11pt;
            margin-bottom: 8px;
        }
        .phase-desc {
            font-size: 9pt;
            color: #6b7280;
            line-height: 1.6;
        }
        .total-row {
            background: #1a1a1a !important;
        }
        .total-row td {
            color: #4FFA69;
            font-weight: 700;
            font-size: 13pt;
            padding: 18px 12px;
            border-top: 3px solid #4FFA69;
        }
        
        /* Payment Box */
        .payment-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-left: 5px solid #3b82f6;
            padding: 25px 30px;
            margin: 30px 0;
        }
        .payment-box h3 {
            color: #1e40af;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 14pt;
        }
        .payment-table {
            margin: 15px 0;
            width: 100%;
        }
        .payment-table td {
            padding: 10px 0;
            font-size: 11pt;
            color: #374151;
        }
        .payment-amount {
            font-size: 20pt;
            font-weight: 700;
            color: #1e40af;
        }
        .payment-note {
            font-size: 9pt;
            color: #1e40af;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #bfdbfe;
        }
        
        /* Lists */
        ul {
            margin: 12px 0;
            padding-left: 25px;
        }
        li {
            margin: 10px 0;
            font-size: 10pt;
            line-height: 1.7;
            color: #374151;
        }
        li::marker {
            color: #4FFA69;
        }
        .deliverables-list {
            margin: 8px 0 0 0;
            padding-left: 20px;
        }
        .deliverables-list li {
            font-size: 9pt;
            margin: 6px 0;
            color: #6b7280;
        }
        
        /* Why Ryven Section */
        .why-ryven-box {
            background: #f0fdf4;
            padding: 25px;
            margin: 20px 0;
            border: 1px solid #bbf7d0;
        }
        .credential-item {
            padding: 15px 0;
            border-bottom: 1px solid #d1fae5;
            display: flex;
            align-items: flex-start;
        }
        .credential-item:last-child {
            border-bottom: none;
        }
        .credential-icon {
            color: #4FFA69;
            font-weight: bold;
            font-size: 14pt;
            margin-right: 15px;
            line-height: 1;
        }
        .credential-text {
            flex: 1;
            color: #1a1a1a;
            font-size: 10pt;
            line-height: 1.7;
        }
        
        /* Terms Box */
        .terms-box {
            background: #f8fafc;
            padding: 20px 25px;
            margin: 20px 0;
            border: 1px solid #e5e7eb;
        }
        .terms-box li {
            font-size: 9pt;
            color: #4b5563;
        }
        
        /* CTA Box */
        .cta-box {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: white;
            padding: 40px 35px;
            margin: 40px 0;
            text-align: center;
            border-top: 5px solid #4FFA69;
        }
        .cta-box h2 {
            color: #4FFA69;
            border: none;
            margin: 0 0 15px 0;
            padding: 0;
            font-size: 22pt;
            font-weight: 600;
        }
        .cta-box h2::before {
            display: none;
        }
        .cta-box p {
            color: #d1d5db;
            font-size: 11pt;
            margin: 12px 0;
            line-height: 1.7;
        }
        .cta-contact {
            font-size: 13pt;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #374151;
        }
        .cta-contact strong {
            color: #4FFA69;
        }
        
        /* Timeline Badge */
        .timeline-badge {
            background: linear-gradient(135deg, #4FFA69 0%, #3dd45a 100%);
            color: #0a0a0a;
            padding: 30px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 4px 12px rgba(79, 250, 105, 0.3);
        }
        .timeline-badge h3 {
            margin: 0 0 10px 0;
            color: #0a0a0a;
            font-size: 12pt;
            font-weight: 600;
        }
        .timeline-badge-value {
            font-size: 36pt;
            font-weight: 700;
            color: #0a0a0a;
            margin: 5px 0;
            line-height: 1;
        }
        
        /* Footer */
        .footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            font-size: 9pt;
            color: #6b7280;
        }
        .footer .logo-footer {
            font-size: 20px;
            font-weight: bold;
            color: #4FFA69;
            margin-bottom: 10px;
            letter-spacing: 3px;
        }
        .footer p {
            margin: 8px 0;
            line-height: 1.6;
        }
        .footer strong {
            color: #1a1a1a;
        }
        .footer-highlight {
            margin-top: 20px;
            color: #4FFA69;
            font-weight: 600;
            font-size: 10pt;
        }
        
        /* Section Numbering */
        .section-number {
            display: inline-block;
            background: #4FFA69;
            color: #0a0a0a;
            font-weight: 700;
            font-size: 10pt;
            padding: 4px 12px;
            margin-right: 10px;
            border-radius: 4px;
        }
        
        /* Subsection Styles */
        .subsection {
            margin: 25px 0;
        }
        .subsection h3 {
            color: #1a1a1a;
            font-size: 12pt;
            margin-bottom: 12px;
            padding-left: 15px;
            border-left: 3px solid #4FFA69;
        }
        .subsection ul {
            margin-top: 10px;
        }
        
        /* Policy Box */
        .policy-box {
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 20px 25px;
            margin: 20px 0;
        }
        .policy-box h3 {
            color: #1e40af;
            margin-top: 0;
            font-size: 12pt;
        }
        .policy-box p {
            margin: 10px 0;
            color: #374151;
        }
        
        /* Note Box */
        .note-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px 20px;
            margin: 15px 0;
        }
        .note-box p {
            margin: 5px 0;
            color: #78350f;
            font-size: 9pt;
        }
        
        /* Success Box */
        .success-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-left: 5px solid #22c55e;
            padding: 20px 25px;
            margin: 20px 0;
        }
        .success-box p {
            margin: 8px 0;
            color: #166534;
        }
        
        /* Numbered List Enhancement */
        ol {
            margin: 12px 0;
            padding-left: 30px;
        }
        ol li {
            margin: 12px 0;
            font-size: 10pt;
            line-height: 1.7;
            color: #374151;
            padding-left: 10px;
        }
        ol li::marker {
            color: #4FFA69;
            font-weight: 700;
        }
        
        /* Utilities */
        .page-break {
            page-break-after: always;
        }
        .text-center {
            text-align: center;
        }
        .mt-0 {
            margin-top: 0 !important;
        }
        .mb-0 {
            margin-bottom: 0 !important;
        }
    </style>
</head>
<body>
    <!-- COVER PAGE -->
    <div class="cover-page">
        <div class="cover-content">
            <div class="logo">RYVEN</div>
            <div class="logo-subtitle">Global LLC</div>
            
            <div class="cover-title">Project Proposal</div>
            <div class="cover-divider"></div>
            
            <div class="cover-info"><strong>Prepared For:</strong> {{ $lead->name }}@if($lead->company) - {{ $lead->company }}@endif</div>
            <div class="cover-info"><strong>Project Type:</strong> {{ ucfirst(str_replace('-', ' ', $lead->project_type)) }}</div>
            
            <div class="cover-date">Generated on {{ now()->format('F j, Y') }}</div>
        </div>
    </div>

    <div class="page-break"></div>

    <!-- EXECUTIVE SUMMARY -->
    <div class="page">
        <h1>Executive Summary</h1>
        
        <div class="highlight-box">
            <p>{{ $analysis['executive_summary'] ?? 'Thank you for considering Ryven Global LLC for your project.' }}</p>
        </div>

        <!-- Client Information -->
        <div class="client-info">
            <p><strong>Client Contact:</strong> {{ $lead->name }}</p>
            <p><strong>Email:</strong> {{ $lead->email }}</p>
            @if($lead->company)
            <p><strong>Company:</strong> {{ $lead->company }}</p>
            @endif
            <p><strong>Requested Timeline:</strong> {{ $lead->timeline_weeks ?? 'Flexible' }} weeks</p>
        </div>

        <!-- Client's Problem/Goal -->
        @if(!empty($analysis['client_problem']))
        <div class="section">
            <h2>Your Challenge</h2>
            <div class="problem-box">
                <p>{{ $analysis['client_problem'] }}</p>
            </div>
        </div>
        @endif

        <!-- Project Description -->
        <div class="section">
            <h2>Project Description</h2>
            <p>{{ $lead->project_description ?? 'Custom project based on client requirements' }}</p>
            
            @php
                $requirements = is_string($lead->requirements) ? json_decode($lead->requirements, true) : $lead->requirements;
            @endphp
            @if(!empty($requirements) && is_array($requirements))
            <h3>Key Requirements</h3>
            <ul>
                @foreach($requirements as $req)
                <li>{{ is_string($req) ? $req : (is_array($req) ? implode(', ', $req) : '') }}</li>
                @endforeach
            </ul>
            @endif
        </div>

        <!-- Solution Overview -->
        @if(!empty($analysis['solution_overview']))
        <div class="section">
            <h2>Our Solution</h2>
            <div class="info-box">
                <p>{{ $analysis['solution_overview'] }}</p>
            </div>
        </div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- OBJECTIVES & SCOPE -->
    <div class="page">
        @if(!empty($analysis['objectives']))
        <h1>Project Objectives</h1>
        
        @if(!empty($analysis['objectives']['main_objectives']))
        <div class="section">
            <ul>
                @foreach($analysis['objectives']['main_objectives'] as $objective)
                <li><strong>{{ is_string($objective) ? $objective : '' }}</strong></li>
                @endforeach
            </ul>
        </div>
        @endif

        @if(!empty($analysis['objectives']['outcome_statement']))
        <div class="info-box">
            <p><strong>Outcome:</strong> {{ $analysis['objectives']['outcome_statement'] }}</p>
        </div>
        @endif
        @endif

        <!-- Project Scope -->
        @if(!empty($analysis['project_scope']))
        <h1 style="margin-top: 40px;">Project Scope</h1>
        
        @if(!empty($analysis['project_scope']['core_features']))
        <h2>Core Features & Capabilities</h2>
        <div class="section">
            <ul>
                @foreach($analysis['project_scope']['core_features'] as $feature)
                <li>{{ is_string($feature) ? $feature : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        @if(!empty($analysis['project_scope']['deliverables_summary']))
        <h2>Deliverables Summary</h2>
        <div class="section">
            <ul>
                @foreach($analysis['project_scope']['deliverables_summary'] as $deliverable)
                <li>{{ is_string($deliverable) ? $deliverable : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        @if(!empty($analysis['project_scope']['out_of_scope']))
        <h2>Out of Scope</h2>
        <div class="problem-box">
            <p style="margin-bottom: 10px;"><strong>The following items are explicitly NOT included in this proposal:</strong></p>
            <ul style="margin: 0;">
                @foreach($analysis['project_scope']['out_of_scope'] as $item)
                <li>{{ is_string($item) ? $item : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif
        @endif
    </div>

    <div class="page-break"></div>

    <!-- PROJECT PHASES & BREAKDOWN -->
    <div class="page">
        <h1>Project Breakdown & Timeline</h1>
        
        @if(!empty($analysis['timeline_overview']))
        <div class="info-box">
            <p><strong>Timeline Overview:</strong> {{ $analysis['timeline_overview'] }}</p>
        </div>
        @endif

        @if(!empty($analysis['total_timeline']))
        <div class="timeline-badge">
            <h3>Total Project Duration</h3>
            <div class="timeline-badge-value">{{ $analysis['total_timeline'] }} Weeks</div>
        </div>
        @endif

        <h2>Detailed Phase Breakdown</h2>

        <table>
            <thead>
                <tr>
                    <th style="width: 30%;">Phase & Description</th>
                    <th style="width: 12%; text-align: center;">Duration</th>
                    <th style="width: 40%;">Deliverables</th>
                    <th style="width: 18%; text-align: right;">Investment</th>
                </tr>
            </thead>
            <tbody>
                @foreach(($analysis['phases'] ?? []) as $phase)
                <tr class="phase-row">
                    <td>
                        <div class="phase-name">{{ $phase['name'] ?? 'Phase ' . ($loop->iteration) }}</div>
                        @if(!empty($phase['description']))
                        <div class="phase-desc">{{ is_string($phase['description']) ? $phase['description'] : '' }}</div>
                        @endif
                    </td>
                    <td style="text-align: center;">
                        <strong>{{ $phase['weeks'] ?? $phase['duration'] ?? 'TBD' }}</strong> weeks
                    </td>
                    <td>
                        @php
                            $deliverables = $phase['deliverables'] ?? [];
                            if (is_string($deliverables)) {
                                $deliverables = json_decode($deliverables, true) ?: [$deliverables];
                            }
                        @endphp
                        @if(!empty($deliverables) && is_array($deliverables))
                        <ul class="deliverables-list">
                            @foreach($deliverables as $deliverable)
                            <li>{{ is_string($deliverable) ? $deliverable : '' }}</li>
                            @endforeach
                        </ul>
                        @else
                        <span style="font-size: 10px; color: #a0aec0;">Deliverables to be defined</span>
                        @endif
                    </td>
                    <td style="text-align: right; font-weight: bold; color: #2d3748;">
                        ${{ number_format($phase['cost'] ?? 0, 0) }}
                    </td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="3" style="text-align: right; font-size: 16px;">
                        <strong>TOTAL PROJECT INVESTMENT:</strong>
                    </td>
                    <td style="text-align: right; font-size: 18px;">
                        <strong>${{ number_format($analysis['total'] ?? 0, 0) }}</strong>
                    </td>
                </tr>
            </tfoot>
        </table>

        <!-- Payment Terms -->
        @if(!empty($analysis['payment_terms']))
        <div class="payment-box">
            <h3>💳 Payment Terms</h3>
            <p style="margin: 8px 0 15px 0;">{{ $analysis['payment_terms']['payment_schedule'] ?? 'Payment schedule to be determined' }}</p>
            
            <table class="payment-table">
                <tr>
                    <td><strong>Upfront Payment ({{ $analysis['payment_terms']['upfront_percentage'] ?? 40 }}%):</strong></td>
                    <td style="text-align: right;">
                        <span class="payment-amount">${{ number_format($analysis['payment_terms']['upfront_amount'] ?? 0, 0) }}</span>
                    </td>
                </tr>
                <tr>
                    <td><strong>Final Payment ({{ $analysis['payment_terms']['final_percentage'] ?? 60 }}%):</strong></td>
                    <td style="text-align: right;">
                        <span class="payment-amount">${{ number_format($analysis['payment_terms']['final_amount'] ?? 0, 0) }}</span>
                    </td>
                </tr>
            </table>
            
            <div class="payment-note">
                <strong>Note:</strong> The 40% upfront payment is required before starting Phase 1. The remaining 60% is due upon successful project completion and final delivery.
            </div>
        </div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- DELIVERABLES & WHY RYVEN -->
    <div class="page">
        @if(!empty($analysis['total_deliverables']))
        <h1>Complete Deliverables Package</h1>
        <div class="section">
            <p>Upon project completion, you will receive:</p>
            <ul>
                @foreach($analysis['total_deliverables'] as $deliverable)
                <li>{{ is_string($deliverable) ? $deliverable : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        <!-- Why Choose Ryven -->
        @if(!empty($analysis['why_ryven']))
        <h1>Why Choose Ryven Global LLC</h1>
        <div class="why-ryven-box">
            @foreach($analysis['why_ryven'] as $reason)
            <div class="credential-item">
                <div class="credential-icon">✓</div>
                <div class="credential-text">{{ is_string($reason) ? $reason : '' }}</div>
            </div>
            @endforeach
        </div>
        @endif

    </div>

    <div class="page-break"></div>

    <!-- SUPPORT & MAINTENANCE -->
    <div class="page">
        @if(!empty($analysis['support_maintenance']))
        <h1>Support & Maintenance</h1>
        
        <h2>Included Support (No Extra Cost)</h2>
        <div class="highlight-box">
            <p><strong>Duration: 30 Days Post-Launch</strong></p>
            <p>{{ $analysis['support_maintenance']['included_support'] ?? '30 days of post-launch support included' }}</p>
        </div>

        @if(!empty($analysis['support_maintenance']['support_details']))
        <div class="section">
            <h3>Coverage Includes:</h3>
            <ul>
                @foreach($analysis['support_maintenance']['support_details'] as $detail)
                <li>{{ is_string($detail) ? $detail : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        @if(!empty($analysis['support_maintenance']['extended_support']))
        <h2>Optional Extended Maintenance</h2>
        <div class="info-box">
            <p>{{ $analysis['support_maintenance']['extended_support'] }}</p>
        </div>
        @endif
        @endif

        <!-- Assumptions & Exclusions -->
        <h1 style="margin-top: 50px;">Assumptions & Exclusions</h1>
        
        @if(!empty($analysis['assumptions']))
        <h2>Assumptions</h2>
        <div class="section">
            <p style="margin-bottom: 15px;">The following assumptions define the foundation of this proposal:</p>
            <ul>
                @foreach($analysis['assumptions'] as $assumption)
                <li>{{ is_string($assumption) ? $assumption : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        @if(!empty($analysis['exclusions']))
        <h2>Exclusions</h2>
        <div class="problem-box">
            <p style="margin-bottom: 10px;"><strong>The following items are NOT included in the project price:</strong></p>
            <ul style="margin: 0;">
                @foreach($analysis['exclusions'] as $exclusion)
                <li>{{ is_string($exclusion) ? $exclusion : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- PROJECT POLICIES -->
    <div class="page">
        @if(!empty($analysis['project_policies']))
        <h1>Project Policies</h1>
        
        @if(!empty($analysis['payment_terms']['payment_policy']))
        <h2>Payment Policy</h2>
        <div class="info-box">
            <p>{{ $analysis['payment_terms']['payment_policy'] }}</p>
            <p style="margin-top: 10px;">{{ $analysis['payment_terms']['payment_schedule'] ?? '' }}</p>
        </div>
        @endif

        @if(!empty($analysis['project_policies']['change_request_policy']))
        <h2>Change Request Policy</h2>
        <div class="section">
            <p>{{ $analysis['project_policies']['change_request_policy'] }}</p>
        </div>
        @endif

        @if(!empty($analysis['project_policies']['warranty_policy']))
        <h2>Warranty Policy</h2>
        <div class="section">
            <p>{{ $analysis['project_policies']['warranty_policy'] }}</p>
        </div>
        @endif

        @if(!empty($analysis['project_policies']['confidentiality_policy']))
        <h2>Data Security & Confidentiality Policy</h2>
        <div class="section">
            <p>{{ $analysis['project_policies']['confidentiality_policy'] }}</p>
        </div>
        @endif

        @if(!empty($analysis['project_policies']['source_code_policy']))
        <h2>Source Code & Intellectual Property Policy</h2>
        <div class="section">
            <p>{{ $analysis['project_policies']['source_code_policy'] }}</p>
        </div>
        @endif
        @endif

        <!-- Terms & Conditions -->
        @php
            $terms = $analysis['terms_and_conditions'] ?? [];
            if (is_string($terms)) {
                $terms = json_decode($terms, true) ?: [];
            }
        @endphp
        @if(!empty($terms) && is_array($terms))
        <h2 style="margin-top: 40px;">Additional Terms & Conditions</h2>
        <div class="terms-box">
            <ul>
                @foreach($terms as $term)
                <li>{{ is_string($term) ? $term : '' }}</li>
                @endforeach
            </ul>
        </div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- NEXT STEPS & CTA -->
    <div class="page">
        <h1>Ready to Get Started?</h1>

        @php
            $nextSteps = $analysis['next_steps'] ?? [];
            if (is_string($nextSteps)) {
                $nextSteps = json_decode($nextSteps, true) ?: [];
            }
        @endphp
        @if(!empty($nextSteps) && is_array($nextSteps))
        <div class="section">
            <h2>Next Steps</h2>
            <ul>
                @foreach($nextSteps as $step)
                <li><strong>{{ is_string($step) ? $step : '' }}</strong></li>
                @endforeach
            </ul>
        </div>
        @endif

        <div class="cta-box">
            <h2>Let's Build Something Amazing Together</h2>
            <p>We're excited about the opportunity to work with you and bring your vision to life.</p>
            <div class="cta-contact">
                <strong>Ready to proceed?</strong> Contact us at <strong>{{ $lead->email }}</strong>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="logo-footer">RYVEN</div>
            <p><strong>Ryven Global LLC</strong></p>
            <p>Professional Development & Design Services</p>
            <p style="margin-top: 20px;">
                <strong>Important:</strong> This proposal is valid for 30 days from {{ now()->format('F j, Y') }}<br>
                All information is confidential and proprietary to Ryven Global LLC
            </p>
            <p class="footer-highlight">
                Thank you for considering Ryven for your project!
            </p>
        </div>
    </div>
</body>
</html>
