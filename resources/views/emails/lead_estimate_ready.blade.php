<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); max-width: 100%;">
                    
                    <!-- HEADER -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 30px; text-align: center; position: relative;">
                            <div style="border-bottom: 4px solid #4FFA69; padding-bottom: 20px; margin-bottom: 20px;">
                                <h1 style="color: #4FFA69; font-size: 48px; margin: 0; letter-spacing: 8px; font-weight: bold;">RYVEN</h1>
                                <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0; letter-spacing: 3px; text-transform: uppercase;">Global LLC</p>
                            </div>
                            <h2 style="color: #ffffff; font-size: 28px; margin: 20px 0 10px 0; font-weight: 600;">Project Proposal</h2>
                            <p style="color: #a0aec0; font-size: 14px; margin: 0;">Your Comprehensive {{ ucfirst($lead->project_type) }} Project Estimate</p>
                        </td>
                    </tr>

                    <!-- QUICK SUMMARY BOX -->
                    <tr>
                        <td style="padding: 30px;">
                            <table width="100%" cellpadding="15" cellspacing="0" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 5px solid #4FFA69; border-radius: 8px;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 10px 0;">Hi {{ $lead->name }}! 👋</h3>
                                        <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0;">Thank you for trusting Ryven Global LLC with your project. We've carefully analyzed your requirements and prepared this comprehensive proposal tailored specifically to your needs.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CLIENT INFO -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table width="100%" cellpadding="12" cellspacing="0" style="background: #f8fafc; border-radius: 8px; border: 1px solid #e5e7eb;">
                                <tr>
                                    <td>
                                        <p style="color: #374151; font-size: 13px; margin: 5px 0; line-height: 1.6;"><strong style="color: #1a1a1a;">Contact:</strong> {{ $lead->name }}</p>
                                        <p style="color: #374151; font-size: 13px; margin: 5px 0; line-height: 1.6;"><strong style="color: #1a1a1a;">Email:</strong> {{ $lead->email }}</p>
                                        @if($lead->company)
                                        <p style="color: #374151; font-size: 13px; margin: 5px 0; line-height: 1.6;"><strong style="color: #1a1a1a;">Company:</strong> {{ $lead->company }}</p>
                                        @endif
                                        <p style="color: #374151; font-size: 13px; margin: 5px 0; line-height: 1.6;"><strong style="color: #1a1a1a;">Project Type:</strong> {{ ucfirst($lead->project_type) }}</p>
                                        <p style="color: #374151; font-size: 13px; margin: 5px 0; line-height: 1.6;"><strong style="color: #1a1a1a;">Timeline:</strong> {{ $lead->timeline_weeks ?? 'Flexible' }} weeks</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- EXECUTIVE SUMMARY -->
                    @if(!empty($analysis['executive_summary']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Executive Summary</h2>
                            <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0;">{{ $analysis['executive_summary'] }}</p>
                        </td>
                    </tr>
                    @endif

                    <!-- PROJECT OBJECTIVES -->
                    @if(!empty($analysis['objectives']['main_objectives']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Project Objectives</h2>
                            <table width="100%" cellpadding="8" cellspacing="0">
                                @foreach($analysis['objectives']['main_objectives'] as $objective)
                                <tr>
                                    <td width="20" valign="top" style="color: #4FFA69; font-size: 16px; font-weight: bold;">✓</td>
                                    <td style="color: #374151; font-size: 13px; line-height: 1.7;">{{ $objective }}</td>
                                </tr>
                                @endforeach
                            </table>
                            @if(!empty($analysis['objectives']['outcome_statement']))
                            <div style="background: #f8fafc; border-left: 4px solid #4FFA69; padding: 15px; margin-top: 15px; border-radius: 4px;">
                                <p style="color: #374151; font-size: 13px; line-height: 1.7; margin: 0;"><strong style="color: #1a1a1a;">Outcome:</strong> {{ $analysis['objectives']['outcome_statement'] }}</p>
                            </div>
                            @endif
                        </td>
                    </tr>
                    @endif

                    <!-- PROJECT SCOPE -->
                    @if(!empty($analysis['project_scope']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Project Scope</h2>
                            
                            @if(!empty($analysis['project_scope']['core_features']))
                            <h3 style="color: #1a1a1a; font-size: 16px; margin: 15px 0 10px 0; padding-left: 12px; border-left: 4px solid #4FFA69;">Core Features</h3>
                            <table width="100%" cellpadding="6" cellspacing="0">
                                @foreach($analysis['project_scope']['core_features'] as $feature)
                                <tr>
                                    <td width="15" valign="top" style="color: #4FFA69; font-size: 14px;">•</td>
                                    <td style="color: #374151; font-size: 13px; line-height: 1.6;">{{ $feature }}</td>
                                </tr>
                                @endforeach
                            </table>
                            @endif

                            @if(!empty($analysis['project_scope']['out_of_scope']))
                            <h3 style="color: #1a1a1a; font-size: 16px; margin: 20px 0 10px 0; padding-left: 12px; border-left: 4px solid #f59e0b;">Out of Scope</h3>
                            <table width="100%" cellpadding="6" cellspacing="0" style="background: #fffbeb; border-radius: 6px; padding: 10px;">
                                @foreach($analysis['project_scope']['out_of_scope'] as $item)
                                <tr>
                                    <td width="15" valign="top" style="color: #f59e0b; font-size: 14px;">✕</td>
                                    <td style="color: #78350f; font-size: 13px; line-height: 1.6;">{{ $item }}</td>
                                </tr>
                                @endforeach
                            </table>
                            @endif
                        </td>
                    </tr>
                    @endif

                    <!-- TIMELINE & PHASES -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Project Timeline & Breakdown</h2>
                            
                            @if(!empty($analysis['total_timeline']))
                            <table width="100%" cellpadding="20" cellspacing="0" style="background: linear-gradient(135deg, #4FFA69 0%, #3dd45a 100%); border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td align="center">
                                        <div style="color: #0a0a0a; font-size: 36px; font-weight: bold; margin: 0;">{{ $analysis['total_timeline'] }} Weeks</div>
                                        <div style="color: #0a0a0a; font-size: 13px; margin-top: 5px;">Total Project Duration</div>
                                    </td>
                                </tr>
                            </table>
                            @endif

                            @if(!empty($analysis['phases']))
                            @foreach($analysis['phases'] as $phase)
                            <table width="100%" cellpadding="15" cellspacing="0" style="background: {{ $loop->odd ? '#ffffff' : '#f9fafb' }}; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 15px;">
                                <tr>
                                    <td>
                                        <h4 style="color: #1a1a1a; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">{{ $phase['name'] ?? 'Phase ' . $loop->iteration }}</h4>
                                        @if(!empty($phase['description']))
                                        <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0 0 10px 0;">{{ $phase['description'] }}</p>
                                        @endif
                                        <table width="100%" cellpadding="5" cellspacing="0">
                                            <tr>
                                                <td width="50%" style="font-size: 12px; color: #4a5568;">
                                                    <strong style="color: #1a1a1a;">Duration:</strong> {{ $phase['weeks'] ?? 'TBD' }} weeks
                                                </td>
                                                <td width="50%" align="right" style="font-size: 14px; color: #2d3748; font-weight: bold;">
                                                    ${{ number_format($phase['cost'] ?? 0, 0) }}
                                                </td>
                                            </tr>
                                        </table>
                                        @if(!empty($phase['deliverables']))
                                        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                                            <strong style="color: #1a1a1a; font-size: 11px;">Deliverables:</strong>
                                            <table width="100%" cellpadding="3" cellspacing="0" style="margin-top: 5px;">
                                                @foreach($phase['deliverables'] as $deliverable)
                                                <tr>
                                                    <td width="10" valign="top" style="color: #4FFA69; font-size: 12px;">•</td>
                                                    <td style="color: #4a5568; font-size: 11px;">{{ $deliverable }}</td>
                                                </tr>
                                                @endforeach
                                            </table>
                                        </div>
                                        @endif
                                    </td>
                                </tr>
                            </table>
                            @endforeach

                            <!-- TOTAL -->
                            <table width="100%" cellpadding="15" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin-top: 20px;">
                                <tr>
                                    <td>
                                        <table width="100%">
                                            <tr>
                                                <td style="color: #4FFA69; font-size: 16px; font-weight: bold;">TOTAL PROJECT INVESTMENT:</td>
                                                <td align="right" style="color: #4FFA69; font-size: 20px; font-weight: bold;">${{ number_format($analysis['total'] ?? 0, 0) }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            @endif
                        </td>
                    </tr>

                    <!-- PAYMENT TERMS -->
                    @if(!empty($analysis['payment_terms']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table width="100%" cellpadding="20" cellspacing="0" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 5px solid #3b82f6; border-radius: 8px;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1e40af; font-size: 18px; margin: 0 0 15px 0;">💳 Payment Terms</h3>
                                        <p style="color: #374151; font-size: 13px; line-height: 1.7; margin: 0 0 15px 0;">{{ $analysis['payment_terms']['payment_schedule'] ?? '' }}</p>
                                        <table width="100%" cellpadding="10" cellspacing="0">
                                            <tr>
                                                <td style="color: #374151; font-size: 14px;"><strong>Upfront Payment ({{ $analysis['payment_terms']['upfront_percentage'] ?? 40 }}%):</strong></td>
                                                <td align="right" style="color: #1e40af; font-size: 18px; font-weight: bold;">${{ number_format($analysis['payment_terms']['upfront_amount'] ?? 0, 0) }}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #374151; font-size: 14px;"><strong>Final Payment ({{ $analysis['payment_terms']['final_percentage'] ?? 60 }}%):</strong></td>
                                                <td align="right" style="color: #1e40af; font-size: 18px; font-weight: bold;">${{ number_format($analysis['payment_terms']['final_amount'] ?? 0, 0) }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- DELIVERABLES -->
                    @if(!empty($analysis['total_deliverables']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Complete Deliverables</h2>
                            <p style="color: #374151; font-size: 13px; margin: 0 0 10px 0;">Upon project completion, you will receive:</p>
                            <table width="100%" cellpadding="6" cellspacing="0">
                                @foreach($analysis['total_deliverables'] as $deliverable)
                                <tr>
                                    <td width="20" valign="top" style="color: #4FFA69; font-size: 14px; font-weight: bold;">✓</td>
                                    <td style="color: #374151; font-size: 13px; line-height: 1.7;">{{ $deliverable }}</td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- WHY RYVEN -->
                    @if(!empty($analysis['why_ryven']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Why Choose Ryven</h2>
                            <table width="100%" cellpadding="12" cellspacing="0" style="background: #f0fdf4; border-radius: 8px;">
                                @foreach($analysis['why_ryven'] as $reason)
                                <tr>
                                    <td width="30" valign="top" style="color: #4FFA69; font-size: 18px; font-weight: bold;">✓</td>
                                    <td style="color: #1a1a1a; font-size: 13px; line-height: 1.7; border-bottom: 1px solid #d1fae5; padding: 12px 0;">{{ $reason }}</td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- SUPPORT -->
                    @if(!empty($analysis['support_maintenance']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Support & Maintenance</h2>
                            <table width="100%" cellpadding="15" cellspacing="0" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 8px;">
                                <tr>
                                    <td>
                                        <strong style="color: #1a1a1a; font-size: 14px; display: block; margin-bottom: 8px;">✨ 30 Days Free Support Included</strong>
                                        <p style="color: #374151; font-size: 13px; line-height: 1.7; margin: 0;">{{ $analysis['support_maintenance']['included_support'] ?? '' }}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- NEXT STEPS -->
                    @if(!empty($analysis['next_steps']))
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #1a1a1a; font-size: 22px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #4FFA69;">Next Steps</h2>
                            <table width="100%" cellpadding="8" cellspacing="0">
                                @foreach($analysis['next_steps'] as $index => $step)
                                <tr>
                                    <td width="40" valign="top">
                                        <div style="background: #4FFA69; color: #0a0a0a; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; text-align: center; line-height: 30px;">{{ $index + 1 }}</div>
                                    </td>
                                    <td style="color: #1a1a1a; font-size: 13px; line-height: 1.7; font-weight: 500;">{{ $step }}</td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- CTA -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table width="100%" cellpadding="30" cellspacing="0" style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 12px; border-top: 5px solid #4FFA69;">
                                <tr>
                                    <td align="center">
                                        <h3 style="color: #4FFA69; font-size: 24px; margin: 0 0 10px 0; font-weight: 600;">Let's Build Something Amazing Together</h3>
                                        <p style="color: #d1d5db; font-size: 14px; line-height: 1.7; margin: 0 0 20px 0;">We're excited about the opportunity to work with you and bring your vision to life.</p>
                                        <div style="background: #4FFA69; color: #0a0a0a; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Ready to proceed? Simply reply to this email!</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background: #1a202c; padding: 30px; text-align: center;">
                            <h2 style="color: #4FFA69; font-size: 20px; margin: 0 0 10px 0; letter-spacing: 4px; font-weight: bold;">RYVEN</h2>
                            <p style="color: #718096; font-size: 13px; margin: 5px 0;">Ryven Global LLC | Professional Development & Design Services</p>
                            <p style="color: #4a5568; font-size: 12px; margin: 15px 0; line-height: 1.6;">
                                This proposal is valid for 30 days from {{ now()->format('F j, Y') }}<br>
                                All information is confidential and proprietary to Ryven Global LLC
                            </p>
                            <p style="color: #4FFA69; font-size: 14px; margin: 20px 0 0 0; font-weight: 600;">Thank you for considering Ryven for your project!</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
