<?php

namespace App\Services;

use App\Models\Lead;
use Illuminate\Support\Facades\Storage;
use OpenAI\Laravel\Facades\OpenAI;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Style\Font;
use PhpOffice\PhpWord\SimpleType\Jc;

class EstimateGenerator
{
    public function generateEstimatePdf(Lead $lead): array
    {
        $analysis = $this->analyzeLead($lead);

        return $analysis;
    }

    protected function generateWordDocument(Lead $lead, array $analysis): string
    {
        $phpWord = new PhpWord();
        
        // Define styles
        $this->defineStyles($phpWord);
        
        // Create document sections
        $this->addCoverPage($phpWord, $lead);
        $this->addExecutiveSummary($phpWord, $lead, $analysis);
        $this->addObjectivesAndScope($phpWord, $analysis);
        $this->addProjectBreakdown($phpWord, $analysis);
        $this->addDeliverables($phpWord, $analysis);
        $this->addWhyRyven($phpWord, $analysis);
        $this->addSupportAndMaintenance($phpWord, $analysis);
        $this->addAssumptionsAndExclusions($phpWord, $analysis);
        $this->addProjectPolicies($phpWord, $analysis);
        $this->addNextSteps($phpWord, $analysis);
        
        // Save document
        $path = 'estimates/'.now()->format('Y/m/d').'/lead-'.$lead->id.'-proposal.docx';
        $fullPath = storage_path('app/public/' . $path);
        
        // Ensure directory exists
        $directory = dirname($fullPath);
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }
        
        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save($fullPath);
        
        return $path;
    }

    protected function defineStyles(PhpWord $phpWord): void
    {
        // Heading 1 - Main sections
        $phpWord->addFontStyle('Heading1', [
            'name' => 'Calibri',
            'size' => 24,
            'bold' => true,
            'color' => '0a0a0a',
        ]);
        $phpWord->addParagraphStyle('Heading1Para', [
            'alignment' => Jc::START,
            'spaceBefore' => 400,
            'spaceAfter' => 200,
            'borderBottomSize' => 18,
            'borderBottomColor' => '4FFA69',
        ]);
        
        // Heading 2 - Subsections
        $phpWord->addFontStyle('Heading2', [
            'name' => 'Calibri',
            'size' => 16,
            'bold' => true,
            'color' => '1a1a1a',
        ]);
        $phpWord->addParagraphStyle('Heading2Para', [
            'alignment' => Jc::START,
            'spaceBefore' => 300,
            'spaceAfter' => 150,
            'borderLeftSize' => 30,
            'borderLeftColor' => '4FFA69',
            'indentation' => ['left' => 200],
        ]);
        
        // Body text
        $phpWord->addFontStyle('BodyText', [
            'name' => 'Calibri',
            'size' => 11,
            'color' => '374151',
        ]);
        $phpWord->addParagraphStyle('BodyPara', [
            'alignment' => Jc::BOTH,
            'spaceBefore' => 120,
            'spaceAfter' => 120,
            'lineHeight' => 1.7,
        ]);
        
        // Highlight box
        $phpWord->addParagraphStyle('HighlightBox', [
            'alignment' => Jc::BOTH,
            'spaceBefore' => 200,
            'spaceAfter' => 200,
            'borderLeftSize' => 40,
            'borderLeftColor' => '4FFA69',
            'indentation' => ['left' => 300, 'right' => 100],
            'shading' => ['fill' => 'f0fdf4'],
        ]);
        
        // Info box
        $phpWord->addParagraphStyle('InfoBox', [
            'alignment' => Jc::BOTH,
            'spaceBefore' => 200,
            'spaceAfter' => 200,
            'borderLeftSize' => 30,
            'borderLeftColor' => '4FFA69',
            'indentation' => ['left' => 250],
            'shading' => ['fill' => 'f8fafc'],
        ]);
        
        // List bullet style
        $phpWord->addFontStyle('ListItem', [
            'name' => 'Calibri',
            'size' => 10,
            'color' => '374151',
        ]);
        $phpWord->addParagraphStyle('ListPara', [
            'spaceBefore' => 100,
            'spaceAfter' => 100,
            'lineHeight' => 1.6,
        ]);
    }

    protected function addCoverPage(PhpWord $phpWord, Lead $lead): void
    {
        $section = $phpWord->addSection([
            'marginLeft' => 1440,
            'marginRight' => 1440,
            'marginTop' => 1440,
            'marginBottom' => 1440,
        ]);
        
        // Logo/Company Name
        $section->addText('RYVEN', [
            'name' => 'Calibri',
            'size' => 48,
            'bold' => true,
            'color' => '4FFA69',
        ], ['alignment' => Jc::START, 'spaceAfter' => 50]);
        
        $section->addText('Global LLC', [
            'name' => 'Calibri',
            'size' => 12,
            'color' => '9ca3af',
            'allCaps' => true,
        ], ['alignment' => Jc::START, 'spaceAfter' => 800]);
        
        // Title
        $section->addText('Project Proposal', [
            'name' => 'Calibri',
            'size' => 42,
            'bold' => true,
            'color' => '1a1a1a',
        ], ['alignment' => Jc::START, 'spaceAfter' => 300]);
        
        // Divider line
        $section->addLine([
            'weight' => 4,
            'width' => 80,
            'height' => 0,
            'color' => '4FFA69',
        ]);
        
        $section->addTextBreak(2);
        
        // Client info
        $section->addText('Prepared For: ' . $lead->name . ($lead->company ? ' - ' . $lead->company : ''), [
            'name' => 'Calibri',
            'size' => 14,
            'color' => '374151',
        ], ['spaceAfter' => 150]);
        
        $section->addText('Project Type: ' . ucfirst(str_replace('-', ' ', $lead->project_type)), [
            'name' => 'Calibri',
            'size' => 14,
            'color' => '374151',
        ], ['spaceAfter' => 400]);
        
        $section->addText('Generated on ' . now()->format('F j, Y'), [
            'name' => 'Calibri',
            'size' => 11,
            'color' => '6b7280',
        ]);
    }

    protected function addExecutiveSummary(PhpWord $phpWord, Lead $lead, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        $section->addText('Executive Summary', 'Heading1', 'Heading1Para');
        
        // Summary content
        if (!empty($analysis['executive_summary'])) {
            $section->addText($analysis['executive_summary'], 'BodyText', 'HighlightBox');
        }
        
        $section->addTextBreak();
        
        // Client Information
        $section->addText('Client Information', 'Heading2', 'Heading2Para');
        $section->addText('Contact: ' . $lead->name, 'BodyText', 'BodyPara');
        $section->addText('Email: ' . $lead->email, 'BodyText', 'BodyPara');
        if ($lead->company) {
            $section->addText('Company: ' . $lead->company, 'BodyText', 'BodyPara');
        }
        $section->addText('Timeline: ' . ($lead->timeline_weeks ?? 'Flexible') . ' weeks', 'BodyText', 'BodyPara');
        
        $section->addTextBreak();
        
        // Challenge
        if (!empty($analysis['client_problem'])) {
            $section->addText('Your Challenge', 'Heading2', 'Heading2Para');
            $section->addText($analysis['client_problem'], 'BodyText', 'InfoBox');
            $section->addTextBreak();
        }
        
        // Project Description
        $section->addText('Project Description', 'Heading2', 'Heading2Para');
        $section->addText($lead->project_description ?? 'Custom project based on client requirements', 'BodyText', 'BodyPara');
        
        // Solution
        if (!empty($analysis['solution_overview'])) {
            $section->addTextBreak();
            $section->addText('Our Solution', 'Heading2', 'Heading2Para');
            $section->addText($analysis['solution_overview'], 'BodyText', 'InfoBox');
        }
    }

    protected function addObjectivesAndScope(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        // Objectives
        if (!empty($analysis['objectives'])) {
            $section->addText('Project Objectives', 'Heading1', 'Heading1Para');
            
            if (!empty($analysis['objectives']['main_objectives'])) {
                foreach ($analysis['objectives']['main_objectives'] as $objective) {
                    $section->addListItem($objective, 0, 'ListItem', 'ListPara', ['color' => '4FFA69']);
                }
            }
            
            if (!empty($analysis['objectives']['outcome_statement'])) {
                $section->addTextBreak();
                $section->addText($analysis['objectives']['outcome_statement'], 'BodyText', 'InfoBox');
            }
            
            $section->addTextBreak(2);
        }
        
        // Scope
        if (!empty($analysis['project_scope'])) {
            $section->addText('Project Scope', 'Heading1', 'Heading1Para');
            
            if (!empty($analysis['project_scope']['core_features'])) {
                $section->addText('Core Features & Capabilities', 'Heading2', 'Heading2Para');
                foreach ($analysis['project_scope']['core_features'] as $feature) {
                    $section->addListItem($feature, 0, 'ListItem', 'ListPara', ['color' => '4FFA69']);
                }
                $section->addTextBreak();
            }
            
            if (!empty($analysis['project_scope']['deliverables_summary'])) {
                $section->addText('Deliverables Summary', 'Heading2', 'Heading2Para');
                foreach ($analysis['project_scope']['deliverables_summary'] as $deliverable) {
                    $section->addListItem($deliverable, 0, 'ListItem', 'ListPara', ['color' => '4FFA69']);
                }
                $section->addTextBreak();
            }
            
            if (!empty($analysis['project_scope']['out_of_scope'])) {
                $section->addText('Out of Scope', 'Heading2', 'Heading2Para');
                $section->addText('The following items are explicitly NOT included in this proposal:', 'BodyText', 'BodyPara');
                foreach ($analysis['project_scope']['out_of_scope'] as $item) {
                    $section->addListItem($item, 0, 'ListItem', 'ListPara', ['color' => 'f59e0b']);
                }
            }
        }
    }

    protected function addProjectBreakdown(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        $section->addText('Project Breakdown & Timeline', 'Heading1', 'Heading1Para');
        
        if (!empty($analysis['timeline_overview'])) {
            $section->addText($analysis['timeline_overview'], 'BodyText', 'InfoBox');
            $section->addTextBreak();
        }
        
        // Timeline Badge
        if (!empty($analysis['total_timeline'])) {
            $textRun = $section->addTextRun(['alignment' => Jc::CENTER, 'shading' => ['fill' => '4FFA69']]);
            $textRun->addText($analysis['total_timeline'] . ' Weeks', [
                'name' => 'Calibri',
                'size' => 36,
                'bold' => true,
                'color' => '0a0a0a',
            ]);
            $section->addTextBreak();
        }
        
        $section->addText('Detailed Phase Breakdown', 'Heading2', 'Heading2Para');
        
        // Phases Table
        if (!empty($analysis['phases'])) {
            $table = $section->addTable([
                'borderSize' => 6,
                'borderColor' => 'e2e8f0',
                'cellMargin' => 80,
            ]);
            
            // Header row
            $table->addRow(null, ['tblHeader' => true]);
            $table->addCell(3000, ['bgColor' => '1a1a1a'])->addText('Phase & Description', [
                'name' => 'Calibri',
                'size' => 9,
                'bold' => true,
                'color' => 'ffffff',
            ]);
            $table->addCell(1500, ['bgColor' => '1a1a1a'])->addText('Duration', [
                'name' => 'Calibri',
                'size' => 9,
                'bold' => true,
                'color' => 'ffffff',
            ], ['alignment' => Jc::CENTER]);
            $table->addCell(3000, ['bgColor' => '1a1a1a'])->addText('Deliverables', [
                'name' => 'Calibri',
                'size' => 9,
                'bold' => true,
                'color' => 'ffffff',
            ]);
            $table->addCell(1500, ['bgColor' => '1a1a1a'])->addText('Investment', [
                'name' => 'Calibri',
                'size' => 9,
                'bold' => true,
                'color' => 'ffffff',
            ], ['alignment' => Jc::END]);
            
            // Phase rows
            $alternate = false;
            foreach ($analysis['phases'] as $phase) {
                $table->addRow();
                
                $bgColor = $alternate ? 'f9fafb' : 'ffffff';
                $alternate = !$alternate;
                
                // Phase name and description
                $cell = $table->addCell(3000, ['bgColor' => $bgColor]);
                $cell->addText($phase['name'] ?? '', [
                    'name' => 'Calibri',
                    'size' => 11,
                    'bold' => true,
                    'color' => '1a1a1a',
                ]);
                if (!empty($phase['description'])) {
                    $cell->addText($phase['description'], [
                        'name' => 'Calibri',
                        'size' => 9,
                        'color' => '6b7280',
                    ]);
                }
                
                // Duration
                $table->addCell(1500, ['bgColor' => $bgColor])->addText(
                    ($phase['weeks'] ?? 'TBD') . ' weeks',
                    ['name' => 'Calibri', 'size' => 10, 'bold' => true],
                    ['alignment' => Jc::CENTER]
                );
                
                // Deliverables
                $cell = $table->addCell(3000, ['bgColor' => $bgColor]);
                if (!empty($phase['deliverables'])) {
                    foreach ($phase['deliverables'] as $deliverable) {
                        $cell->addListItem($deliverable, 0, [
                            'name' => 'Calibri',
                            'size' => 9,
                            'color' => '4a5568',
                        ]);
                    }
                }
                
                // Cost
                $table->addCell(1500, ['bgColor' => $bgColor])->addText(
                    '$' . number_format($phase['cost'] ?? 0, 0),
                    ['name' => 'Calibri', 'size' => 10, 'bold' => true, 'color' => '2d3748'],
                    ['alignment' => Jc::END]
                );
            }
            
            // Total row
            $table->addRow();
            $table->addCell(7500, ['bgColor' => '1a1a1a', 'gridSpan' => 3])->addText(
                'TOTAL PROJECT INVESTMENT:',
                ['name' => 'Calibri', 'size' => 13, 'bold' => true, 'color' => '4FFA69'],
                ['alignment' => Jc::END]
            );
            $table->addCell(1500, ['bgColor' => '1a1a1a'])->addText(
                '$' . number_format($analysis['total'] ?? 0, 0),
                ['name' => 'Calibri', 'size' => 14, 'bold' => true, 'color' => '4FFA69'],
                ['alignment' => Jc::END]
            );
        }
        
        $section->addTextBreak();
        
        // Payment Terms
        if (!empty($analysis['payment_terms'])) {
            $section->addText('Payment Terms', 'Heading2', 'Heading2Para');
            $section->addText($analysis['payment_terms']['payment_schedule'] ?? '', 'BodyText', 'InfoBox');
            
            $section->addTextBreak();
            $section->addText('Upfront Payment (' . ($analysis['payment_terms']['upfront_percentage'] ?? 40) . '%): $' . 
                number_format($analysis['payment_terms']['upfront_amount'] ?? 0, 0), [
                'name' => 'Calibri',
                'size' => 14,
                'bold' => true,
                'color' => '1e40af',
            ]);
            
            $section->addText('Final Payment (' . ($analysis['payment_terms']['final_percentage'] ?? 60) . '%): $' . 
                number_format($analysis['payment_terms']['final_amount'] ?? 0, 0), [
                'name' => 'Calibri',
                'size' => 14,
                'bold' => true,
                'color' => '1e40af',
            ]);
        }
    }

    protected function addDeliverables(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        if (!empty($analysis['total_deliverables'])) {
            $section->addText('Complete Deliverables Package', 'Heading1', 'Heading1Para');
            $section->addText('Upon project completion, you will receive:', 'BodyText', 'BodyPara');
            $section->addTextBreak();
            
            foreach ($analysis['total_deliverables'] as $deliverable) {
                $section->addListItem($deliverable, 0, 'ListItem', 'ListPara', ['color' => '4FFA69']);
            }
        }
    }

    protected function addWhyRyven(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        if (!empty($analysis['why_ryven'])) {
            $section->addText('Why Choose Ryven Global LLC', 'Heading1', 'Heading1Para');
            
            foreach ($analysis['why_ryven'] as $reason) {
                $textRun = $section->addTextRun(['spaceBefore' => 150, 'spaceAfter' => 150]);
                $textRun->addText('✓ ', ['name' => 'Calibri', 'size' => 14, 'bold' => true, 'color' => '4FFA69']);
                $textRun->addText($reason, ['name' => 'Calibri', 'size' => 10, 'color' => '1a1a1a']);
            }
        }
    }

    protected function addSupportAndMaintenance(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        if (!empty($analysis['support_maintenance'])) {
            $section->addText('Support & Maintenance', 'Heading1', 'Heading1Para');
            
            $section->addText('Included Support (No Extra Cost)', 'Heading2', 'Heading2Para');
            $section->addText('Duration: 30 Days Post-Launch', [
                'name' => 'Calibri',
                'size' => 11,
                'bold' => true,
                'color' => '1a1a1a',
            ], 'HighlightBox');
            
            if (!empty($analysis['support_maintenance']['included_support'])) {
                $section->addText($analysis['support_maintenance']['included_support'], 'BodyText', 'HighlightBox');
            }
            
            if (!empty($analysis['support_maintenance']['support_details'])) {
                $section->addTextBreak();
                $section->addText('Coverage Includes:', [
                    'name' => 'Calibri',
                    'size' => 11,
                    'bold' => true,
                ]);
                foreach ($analysis['support_maintenance']['support_details'] as $detail) {
                    $section->addListItem($detail, 0, 'ListItem', 'ListPara', ['color' => '4FFA69']);
                }
            }
            
            if (!empty($analysis['support_maintenance']['extended_support'])) {
                $section->addTextBreak();
                $section->addText('Optional Extended Maintenance', 'Heading2', 'Heading2Para');
                $section->addText($analysis['support_maintenance']['extended_support'], 'BodyText', 'InfoBox');
            }
        }
    }

    protected function addAssumptionsAndExclusions(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        $section->addText('Assumptions & Exclusions', 'Heading1', 'Heading1Para');
        
        if (!empty($analysis['assumptions'])) {
            $section->addText('Assumptions', 'Heading2', 'Heading2Para');
            $section->addText('The following assumptions define the foundation of this proposal:', 'BodyText', 'BodyPara');
            
            foreach ($analysis['assumptions'] as $assumption) {
                $section->addListItem($assumption, 0, 'ListItem', 'ListPara', ['color' => '4FFA69']);
            }
        }
        
        if (!empty($analysis['exclusions'])) {
            $section->addTextBreak();
            $section->addText('Exclusions', 'Heading2', 'Heading2Para');
            $section->addText('The following items are NOT included in the project price:', [
                'name' => 'Calibri',
                'size' => 11,
                'bold' => true,
                'color' => '78350f',
            ]);
            
            foreach ($analysis['exclusions'] as $exclusion) {
                $section->addListItem($exclusion, 0, 'ListItem', 'ListPara', ['color' => 'f59e0b']);
            }
        }
    }

    protected function addProjectPolicies(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        if (!empty($analysis['project_policies'])) {
            $section->addText('Project Policies', 'Heading1', 'Heading1Para');
            
            if (!empty($analysis['project_policies']['change_request_policy'])) {
                $section->addText('Change Request Policy', 'Heading2', 'Heading2Para');
                $section->addText($analysis['project_policies']['change_request_policy'], 'BodyText', 'BodyPara');
            }
            
            if (!empty($analysis['project_policies']['warranty_policy'])) {
                $section->addText('Warranty Policy', 'Heading2', 'Heading2Para');
                $section->addText($analysis['project_policies']['warranty_policy'], 'BodyText', 'BodyPara');
            }
            
            if (!empty($analysis['project_policies']['confidentiality_policy'])) {
                $section->addText('Data Security & Confidentiality Policy', 'Heading2', 'Heading2Para');
                $section->addText($analysis['project_policies']['confidentiality_policy'], 'BodyText', 'BodyPara');
            }
            
            if (!empty($analysis['project_policies']['source_code_policy'])) {
                $section->addText('Source Code & Intellectual Property Policy', 'Heading2', 'Heading2Para');
                $section->addText($analysis['project_policies']['source_code_policy'], 'BodyText', 'BodyPara');
            }
        }
        
        // Additional Terms
        if (!empty($analysis['terms_and_conditions'])) {
            $section->addTextBreak();
            $section->addText('Additional Terms & Conditions', 'Heading2', 'Heading2Para');
            
            foreach ($analysis['terms_and_conditions'] as $term) {
                $section->addListItem($term, 0, [
                    'name' => 'Calibri',
                    'size' => 9,
                    'color' => '4b5563',
                ]);
            }
        }
    }

    protected function addNextSteps(PhpWord $phpWord, array $analysis): void
    {
        $section = $phpWord->addSection();
        
        $section->addText('Ready to Get Started?', 'Heading1', 'Heading1Para');
        
        if (!empty($analysis['next_steps'])) {
            $section->addText('Next Steps', 'Heading2', 'Heading2Para');
            
            $i = 1;
            foreach ($analysis['next_steps'] as $step) {
                $section->addListItem($step, 0, [
                    'name' => 'Calibri',
                    'size' => 10,
                    'bold' => true,
                    'color' => '1a1a1a',
                ], 'ListPara', ['color' => '4FFA69']);
                $i++;
            }
        }
        
        $section->addTextBreak(2);
        
        // CTA Box
        $section->addText('Let\'s Build Something Amazing Together', [
            'name' => 'Calibri',
            'size' => 22,
            'bold' => true,
            'color' => '4FFA69',
        ], ['alignment' => Jc::CENTER, 'spaceBefore' => 400, 'spaceAfter' => 200]);
        
        $section->addText('We\'re excited about the opportunity to work with you and bring your vision to life.', [
            'name' => 'Calibri',
            'size' => 11,
            'color' => '374151',
        ], ['alignment' => Jc::CENTER]);
        
        $section->addTextBreak(2);
        
        // Footer
        $section->addText('RYVEN', [
            'name' => 'Calibri',
            'size' => 18,
            'bold' => true,
            'color' => '4FFA69',
        ], ['alignment' => Jc::CENTER]);
        
        $section->addText('Ryven Global LLC | Professional Development & Design Services', [
            'name' => 'Calibri',
            'size' => 9,
            'color' => '6b7280',
        ], ['alignment' => Jc::CENTER]);
        
        $section->addText('Thank you for considering Ryven for your project!', [
            'name' => 'Calibri',
            'size' => 10,
            'bold' => true,
            'color' => '4FFA69',
        ], ['alignment' => Jc::CENTER, 'spaceBefore' => 200]);
    }

    protected function analyzeLead(Lead $lead): array
    {
        try {
            // Prepare project details for AI
            $projectDetails = $this->prepareProjectDetails($lead);
            
            // Get project-specific structure
            $phaseStructure = $this->getPhaseStructure($lead->project_type);
            
            
            // Call OpenAI to generate estimate
            $response = OpenAI::chat()->create([
                'model' => 'gpt-4o',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $this->getSystemPrompt()
                    ],
                    [
                        'role' => 'user',
                        'content' => $this->getUserPrompt($projectDetails, $phaseStructure, $lead->project_type)
                    ]
                ],
                'temperature' => 0.7,
                'response_format' => ['type' => 'json_object'],
            ]);

            $aiResponse = json_decode($response->choices[0]->message->content, true);
            // Log what AI returned
            if (isset($aiResponse['phases'])) {
                $returnedPhaseNames = array_map(fn($p) => $p['name'] ?? 'unnamed', $aiResponse['phases']);
            }
            return $this->formatAnalysis($aiResponse, $lead);
        } catch (\Exception $e) {
            // Fallback to basic estimate if AI fails
            \Log::error('OpenAI estimate generation failed: ' . $e->getMessage());
            return $this->generateFallbackEstimate($lead);
        }
    }

    protected function getSystemPrompt(): string
    {
        return 'You are a senior project manager and proposal writer at Ryven Global LLC, a professional development agency with 25+ successful projects. You create enterprise-level, comprehensive proposals that follow industry best practices. Your proposals include detailed objectives, clear scope definitions, assumptions, exclusions, and professional policies. You write in a confident, professional tone that demonstrates expertise while remaining client-focused. CRITICAL: You MUST follow the EXACT phase structure provided for each project type. Do NOT mix phase names from different project types. Do NOT create your own phase names.';
    }

    protected function getUserPrompt(string $projectDetails, array $phaseStructure, string $projectType): string
    {
        $phaseJson = json_encode($phaseStructure, JSON_PRETTY_PRINT);
        $phaseCount = count($phaseStructure);
        // Create a more explicit phase structure for the AI
        $phaseExamples = [];
        foreach ($phaseStructure as $index => $phaseName) {
            $phaseExamples[] = [
                'name' => $phaseName,
                'description' => '(Your detailed description here)',
                'weeks' => '(Duration in weeks)',
                'deliverables' => ['(List specific deliverables)'],
                'cost' => '(Cost in USD)'
            ];
        }
        $phaseExamplesJson = json_encode($phaseExamples, JSON_PRETTY_PRINT);

        return <<<PROMPT
Generate an enterprise-level, comprehensive project proposal for the following client:

{$projectDetails}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ CRITICAL: This is a {$projectType} project.
⚠️ You MUST use EXACTLY these {$phaseCount} phase names - NO SUBSTITUTIONS:
{$phaseJson}

DO NOT use phase names from other project types!
DO NOT create your own phase names!
COPY the phase names EXACTLY as shown above!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Payment Terms (MUST INCLUDE):
- 40% upfront payment before starting each milestone
- 60% payment after milestone completion

Provide a response in JSON format with these fields:

1. executive_summary: A compelling 2-3 paragraph summary with subsections:
   - project_vision: Vision statement for this project
   - business_value: Key business benefits (2-3 bullet points as array)
   - expected_outcome: What the client will achieve
   - Must be specific to {$projectType} projects

2. objectives: Object with:
   - main_objectives: Array of 4-6 detailed project objectives specific to {$projectType}
   - outcome_statement: Brief paragraph on what achieving these objectives means

3. project_scope: Object with:
   - core_features: Array of 3-5 key features/capabilities with brief descriptions
   - deliverables_summary: Array of main deliverables
   - out_of_scope: Array of 2-3 items explicitly NOT included
   
4. client_problem: Clear description of the client's current challenges or goals

5. solution_overview: Detailed overview of how Ryven will solve their problem with {$projectType} expertise

6. phases: Array with EXACTLY {$phaseCount} phases matching this structure:
{$phaseExamplesJson}

   CRITICAL RULES FOR PHASES:
   - MUST have exactly {$phaseCount} phases
   - MUST use the EXACT phase names shown above (copy them character-by-character)
   - description: Detailed, professional explanation specific to {$projectType}
   - weeks: Realistic duration in weeks
   - deliverables: Array of specific, tangible deliverables
   - cost: Realistic cost in USD
   
7. total_deliverables: Array of ALL final deliverables appropriate for {$projectType} projects

8. timeline_overview: Detailed paragraph explaining the overall timeline

9. support_maintenance: Object with:
   - included_support: Description of 30-day post-launch support included
   - support_details: Array of 3-4 items covered in included support
   - extended_support: Brief description of optional extended maintenance

10. assumptions: Array of 4-6 key assumptions (infrastructure, client responsibilities, timelines, etc.)

11. exclusions: Array of 3-5 items explicitly excluded from the project scope

12. why_ryven: Array of 5-6 compelling reasons to choose Ryven (include specific credentials, experience, process advantages)

13. payment_terms: Object with:
    - upfront_percentage: 40
    - upfront_amount: (calculate 40% of total)
    - final_percentage: 60
    - final_amount: (calculate 60% of total)
    - payment_schedule: Detailed description of milestone-based payments
    - payment_policy: Brief note about payment timeline (7 days)

14. project_policies: Object with:
    - change_request_policy: Brief description of how changes are handled
    - warranty_policy: Description of warranty period and coverage
    - confidentiality_policy: Data ownership and security statement
    - source_code_policy: Ownership and IP rights statement

15. terms_and_conditions: Array of 6-8 important terms (revisions, IP rights, support, confidentiality, compliance, etc.)

16. next_steps: Array of 4-5 clear, actionable steps for the client to proceed

17. total_cost: Total project investment in USD (realistic for {$projectType} projects)
18. total_timeline: Total weeks from start to delivery (sum of all phase durations)

Make the proposal:
- Enterprise-professional tone with detailed technical depth
- Client-focused (use "you" and "your business")
- Specific to {$projectType} projects and deliverables
- Include industry-standard terminology
- Realistic in pricing and timeline for {$projectType}
- Comprehensive and thorough like enterprise consulting proposals
- Use terminology and deliverables appropriate for {$projectType} only

REMINDER: Use the EXACT phase names provided above. Do not deviate!
PROMPT;
    }

    protected function getPhaseStructure(string $projectType): array
    {
        return match($projectType) {
            'web' => [
                'Phase 1: Information Gathering & Design UI/UX',
                'Phase 2: Development of the App and Backend',
                'Phase 3: Deployment & Testing',
                'Phase 4: Delivery and 30 Days Free Trial'
            ],
            'mobile' => [
                'Phase 1: Information Gathering & Design UI/UX',
                'Phase 2: Development of the App and Backend',
                'Phase 3: Deployment & Testing',
                'Phase 4: Delivery and 30 Days Free Trial'
            ],
            'uiux' => [
                'Phase 1: Information Gathering & Design Wireframe',
                'Phase 2: Design High Fidelity',
                'Phase 3: Feedback and Revision Session',
                'Phase 4: Prepare Deliverables and Delivery'
            ],
            'branding' => [
                'Phase 1: Gather Information About the Brand and Kickstart the Project',
                'Phase 2: Delivery'
            ],
            default => [
                'Phase 1: Information Gathering & Design UI/UX',
                'Phase 2: Development of the App and Backend',
                'Phase 3: Deployment & Testing',
                'Phase 4: Delivery and 30 Days Free Trial'
            ]
        };
    }

    protected function prepareProjectDetails(Lead $lead): string
    {
        $details = "Project Type: " . ucfirst($lead->project_type) . "\n";
        $details .= "Client: {$lead->name} (" . ($lead->company ?: 'Individual') . ")\n\n";
        $details .= "Project Description:\n{$lead->project_description}\n\n";

        if (!empty($lead->requirements) && is_array($lead->requirements)) {
            $details .= "Key Requirements:\n";
            foreach ($lead->requirements as $req) {
                $details .= "- {$req}\n";
            }
            $details .= "\n";
        }

        if ($lead->timeline_weeks) {
            $details .= "Client Desired Timeline: {$lead->timeline_weeks} weeks\n";
        }

        return $details;
    }

    protected function formatAnalysis(array $aiResponse, Lead $lead): array
    {
        // Validate phases structure
        $expectedPhases = $this->getPhaseStructure($lead->project_type);
        $aiPhases = $aiResponse['phases'] ?? [];
        
        // Check if AI returned correct number of phases and correct phase names
        $phaseNamesCorrect = true;
        if (count($aiPhases) === count($expectedPhases)) {
            foreach ($aiPhases as $index => $phase) {
                $expectedName = $expectedPhases[$index];
                $actualName = $phase['name'] ?? '';
                // Check if phase name matches (case-insensitive and trimmed)
                if (strcasecmp(trim($actualName), trim($expectedName)) !== 0) {
                    $phaseNamesCorrect = false;
                    \Log::warning("AI returned wrong phase name. Expected: '{$expectedName}', Got: '{$actualName}'");
                    break;
                }
            }
        } else {
            $phaseNamesCorrect = false;
            \Log::warning("AI returned wrong number of phases. Expected: " . count($expectedPhases) . ", Got: " . count($aiPhases));
        }
        
        // If phases are incorrect, use default phases but keep AI's other content
        if (!$phaseNamesCorrect) {
            \Log::warning("Using default phases for {$lead->project_type} due to AI phase mismatch");
            $aiResponse['phases'] = $this->getDefaultPhases($lead->project_type);
        }
        
        return [
            'executive_summary' => $aiResponse['executive_summary'] ?? 'Thank you for considering Ryven Global LLC for your project. We understand your needs and are committed to delivering exceptional results.',
            'objectives' => $aiResponse['objectives'] ?? [
                'main_objectives' => [
                    'Deliver a high-quality solution that meets all requirements',
                    'Ensure excellent user experience and performance',
                    'Provide comprehensive documentation and training',
                    'Maintain clear communication throughout the project'
                ],
                'outcome_statement' => 'Achieving these objectives will ensure your project success and deliver measurable business value.'
            ],
            'project_scope' => $aiResponse['project_scope'] ?? [
                'core_features' => ['Feature development', 'Quality assurance', 'Deployment'],
                'deliverables_summary' => ['Complete source code', 'Documentation', 'Training'],
                'out_of_scope' => ['Third-party service fees', 'Major scope changes during development']
            ],
            'client_problem' => $aiResponse['client_problem'] ?? 'Based on your requirements, we recognize the importance of delivering a high-quality solution.',
            'solution_overview' => $aiResponse['solution_overview'] ?? 'Our comprehensive approach ensures quality, efficiency, and results that exceed expectations.',
            'phases' => $aiResponse['phases'] ?? $this->getDefaultPhases($lead->project_type),
            'total_deliverables' => $aiResponse['total_deliverables'] ?? ['Complete project source code', 'Documentation', 'Deployment support'],
            'timeline_overview' => $aiResponse['timeline_overview'] ?? 'The project will be delivered in structured phases with clear milestones.',
            'support_maintenance' => $aiResponse['support_maintenance'] ?? [
                'included_support' => '30 days of post-launch support included at no extra cost',
                'support_details' => [
                    'Bug fixes and performance optimization',
                    'Configuration assistance and minor adjustments',
                    'Technical support during business hours',
                    'Knowledge transfer and training sessions'
                ],
                'extended_support' => 'Extended maintenance plans available after the initial period'
            ],
            'assumptions' => $aiResponse['assumptions'] ?? [
                'Client will provide necessary access to servers and infrastructure',
                'All content and requirements will be provided in a timely manner',
                'Client will review and approve deliverables within agreed timelines',
                'Reliable internet connectivity will be available for development and testing'
            ],
            'exclusions' => $aiResponse['exclusions'] ?? [
                'Third-party service fees and subscriptions',
                'Major scope changes beyond approved specifications',
                'Extended support beyond the included 30-day period'
            ],
            'why_ryven' => $aiResponse['why_ryven'] ?? [
                'Over 25+ successful projects delivered across multiple industries',
                'Expert team with average 5+ years of professional experience',
                'Quality-focused development process with best practices',
                'Transparent communication and regular progress updates',
                'Ongoing support and maintenance services',
                '100% client satisfaction track record'
            ],
            'payment_terms' => $aiResponse['payment_terms'] ?? [
                'upfront_percentage' => 40,
                'upfront_amount' => 0,
                'final_percentage' => 60,
                'final_amount' => 0,
                'payment_schedule' => '40% upfront before each milestone, 60% upon milestone completion',
                'payment_policy' => 'Invoices are payable within 7 calendar days of issue'
            ],
            'project_policies' => $aiResponse['project_policies'] ?? [
                'change_request_policy' => 'All scope changes require formal documentation and approval with revised cost and timeline',
                'warranty_policy' => '1-month limited warranty covers defects and performance optimization at no extra cost',
                'confidentiality_policy' => 'All project data and intellectual property are kept strictly confidential. Client owns all deliverables upon final payment',
                'source_code_policy' => 'Full source code ownership transfers to client upon project completion and final payment'
            ],
            'terms_and_conditions' => $aiResponse['terms_and_conditions'] ?? [
                'Two rounds of revisions included per phase',
                'All intellectual property rights transfer to client upon final payment',
                '30 days of free support and bug fixes included after delivery',
                'All project information is kept strictly confidential',
                'Complete source code and assets delivered upon project completion',
                'Regular progress updates and milestone reviews included'
            ],
            'next_steps' => $aiResponse['next_steps'] ?? [
                'Review this proposal and confirm your interest',
                'Schedule a kickoff call to discuss project details and timeline',
                'Sign the project contract and service agreement',
                'Submit the initial 40% payment to begin work',
                'We will begin Phase 1 within 3 business days of payment receipt'
            ],
            'total' => $aiResponse['total_cost'] ?? 0,
            'total_timeline' => $aiResponse['total_timeline'] ?? 0,
        ];
    }

    protected function getDefaultPhases(string $projectType): array
    {
        $basePhases = match($projectType) {
            'mobile', 'web' => [
                [
                    'name' => 'Phase 1: Information Gathering & Design UI/UX',
                    'description' => 'We gather requirements and create user-friendly designs.',
                    'weeks' => 2,
                    'deliverables' => ['Wireframes', 'UI/UX Designs', 'Project Plan'],
                    'cost' => 2000
                ],
                [
                    'name' => 'Phase 2: Development of the App and Backend',
                    'description' => 'Core development and feature implementation.',
                    'weeks' => 6,
                    'deliverables' => ['Functional Application', 'Backend API', 'Database'],
                    'cost' => 8000
                ],
                [
                    'name' => 'Phase 3: Deployment & Testing',
                    'description' => 'Quality assurance and production deployment.',
                    'weeks' => 2,
                    'deliverables' => ['Testing Reports', 'Deployed Application', 'Performance Optimization'],
                    'cost' => 2000
                ],
                [
                    'name' => 'Phase 4: Delivery and 30 Days Free Trial',
                    'description' => 'Final handover with free support period.',
                    'weeks' => 1,
                    'deliverables' => ['Complete Documentation', 'Training', '30 Days Free Support'],
                    'cost' => 1000
                ]
            ],
            'uiux' => [
                [
                    'name' => 'Phase 1: Information Gathering & Design Wireframe',
                    'description' => 'Understanding your brand and creating initial wireframes.',
                    'weeks' => 1,
                    'deliverables' => ['Wireframes', 'User Flow Diagrams', 'Sitemap'],
                    'cost' => 1500
                ],
                [
                    'name' => 'Phase 2: Design High Fidelity',
                    'description' => 'Creating polished, pixel-perfect designs.',
                    'weeks' => 2,
                    'deliverables' => ['High Fidelity Mockups', 'Design System', 'Interactive Prototype'],
                    'cost' => 3000
                ],
                [
                    'name' => 'Phase 3: Feedback and Revision Session',
                    'description' => 'Incorporating your feedback and refining designs.',
                    'weeks' => 1,
                    'deliverables' => ['Revised Designs', 'Final Mockups'],
                    'cost' => 1000
                ],
                [
                    'name' => 'Phase 4: Prepare Deliverables and Delivery',
                    'description' => 'Final asset preparation and handover.',
                    'weeks' => 1,
                    'deliverables' => ['All Design Files', 'Asset Export', 'Style Guide'],
                    'cost' => 500
                ]
            ],
            'branding' => [
                [
                    'name' => 'Phase 1: Gather Information About the Brand and Kickstart the Project',
                    'description' => 'Deep dive into your brand identity, values, and goals.',
                    'weeks' => 1,
                    'deliverables' => ['Brand Strategy', 'Creative Brief', 'Mood Board'],
                    'cost' => 1500
                ],
                [
                    'name' => 'Phase 2: Delivery',
                    'description' => 'Complete brand identity package delivery.',
                    'weeks' => 2,
                    'deliverables' => ['Logo & Variations', 'Brand Guidelines', 'Marketing Collateral', 'Brand Assets'],
                    'cost' => 3500
                ]
            ],
            default => [
                [
                    'name' => 'Phase 1: Information Gathering & Design UI/UX',
                    'description' => 'We gather requirements and create user-friendly designs.',
                    'weeks' => 2,
                    'deliverables' => ['Wireframes', 'UI/UX Designs', 'Project Plan'],
                    'cost' => 2000
                ],
                [
                    'name' => 'Phase 2: Development of the App and Backend',
                    'description' => 'Core development and feature implementation.',
                    'weeks' => 6,
                    'deliverables' => ['Functional Application', 'Backend API', 'Database'],
                    'cost' => 8000
                ],
                [
                    'name' => 'Phase 3: Deployment & Testing',
                    'description' => 'Quality assurance and production deployment.',
                    'weeks' => 2,
                    'deliverables' => ['Testing Reports', 'Deployed Application', 'Performance Optimization'],
                    'cost' => 2000
                ],
                [
                    'name' => 'Phase 4: Delivery and 30 Days Free Trial',
                    'description' => 'Final handover with free support period.',
                    'weeks' => 1,
                    'deliverables' => ['Complete Documentation', 'Training', '30 Days Free Support'],
                    'cost' => 1000
                ]
            ]
        };

        return $basePhases;
    }

    protected function generateFallbackEstimate(Lead $lead): array
    {
        // Comprehensive fallback if OpenAI is unavailable
        $phases = $this->getDefaultPhases($lead->project_type);
        $totalCost = array_sum(array_column($phases, 'cost'));
        $totalWeeks = array_sum(array_column($phases, 'weeks'));
        $projectTypeName = ucfirst($lead->project_type);

        return [
            'executive_summary' => "Thank you for your interest in working with Ryven Global LLC. Based on your {$projectTypeName} project requirements, we have prepared this comprehensive proposal tailored to your needs. Our team is committed to delivering exceptional results that exceed your expectations.",
            'objectives' => [
                'main_objectives' => [
                    'Deliver a high-quality ' . $projectTypeName . ' solution that meets all specified requirements',
                    'Ensure excellent user experience, performance, and reliability',
                    'Maintain transparent communication and regular progress updates',
                    'Provide comprehensive documentation, training, and knowledge transfer',
                    'Complete the project on time and within budget',
                    'Ensure client satisfaction through quality-focused development'
                ],
                'outcome_statement' => 'Achieving these objectives will ensure your project success, deliver measurable business value, and establish a strong foundation for future growth.'
            ],
            'project_scope' => [
                'core_features' => [
                    'Complete ' . $projectTypeName . ' development following industry best practices',
                    'Quality assurance and comprehensive testing',
                    'Production deployment and configuration',
                    'Documentation and user training'
                ],
                'deliverables_summary' => array_merge(...array_column($phases, 'deliverables')),
                'out_of_scope' => [
                    'Third-party service fees and subscription costs',
                    'Major scope changes or feature additions beyond approved specifications',
                    'Extended support beyond the included 30-day period'
                ]
            ],
            'client_problem' => 'We understand you need a professional ' . $projectTypeName . ' solution that meets your business objectives and delivers real value to your users.',
            'solution_overview' => 'Our team will work closely with you to deliver a high-quality ' . $projectTypeName . ' solution following our proven development process, ensuring quality, efficiency, and results that exceed expectations.',
            'phases' => $phases,
            'total_deliverables' => array_merge(...array_column($phases, 'deliverables')),
            'timeline_overview' => "The project will be completed in {$totalWeeks} weeks, divided into structured phases with clear milestones and deliverables. Each phase includes specific outcomes and client review points to ensure alignment with your goals.",
            'support_maintenance' => [
                'included_support' => '30 days of comprehensive post-launch support included at no extra cost',
                'support_details' => [
                    'Bug fixes and performance optimization',
                    'Configuration assistance and minor adjustments',
                    'Technical support during business hours (Sun-Thu, 9 AM - 6 PM)',
                    'Knowledge transfer and training sessions for your team'
                ],
                'extended_support' => 'Extended maintenance plans available after the initial 30-day period for continued support, updates, and enhancements.'
            ],
            'assumptions' => [
                'Client will provide necessary access to servers, hosting, and infrastructure',
                'All content, assets, and requirements will be provided in a timely manner',
                'Client will review and approve deliverables within agreed timelines',
                'Reliable internet connectivity will be available for development and testing',
                'Client has appropriate decision-making authority to approve project milestones'
            ],
            'exclusions' => [
                'Third-party service fees, licenses, and subscription costs',
                'Major scope changes or new features beyond approved specifications',
                'Extended support and maintenance beyond the included 30-day period',
                'Data migration from legacy systems (unless explicitly included)'
            ],
            'why_ryven' => [
                'Over 25+ successful projects delivered across multiple industries',
                'Expert team with average 5+ years of professional experience in ' . $projectTypeName,
                'Quality-focused development process with industry best practices',
                'Transparent communication with regular progress updates',
                '30 days of free post-launch support and maintenance',
                '100% client satisfaction track record with proven results'
            ],
            'payment_terms' => [
                'upfront_percentage' => 40,
                'upfront_amount' => $totalCost * 0.4,
                'final_percentage' => 60,
                'final_amount' => $totalCost * 0.6,
                'payment_schedule' => '40% upfront before each milestone begins, 60% upon successful milestone completion and delivery',
                'payment_policy' => 'Invoices are payable within 7 calendar days of issue. Payment confirmation required before next milestone begins.'
            ],
            'project_policies' => [
                'change_request_policy' => 'All scope changes require formal Change Request Form documentation with mutual approval. Revised cost and timeline will be provided before implementation.',
                'warranty_policy' => '1-month limited warranty covers verified defects and performance optimization at no extra cost. Does not cover client-side infrastructure changes.',
                'confidentiality_policy' => 'All project data, source code, and intellectual property are kept strictly confidential. Client owns all deliverables upon final payment. Both parties maintain strict NDA compliance.',
                'source_code_policy' => 'Full source code ownership and intellectual property rights transfer to client upon project completion and final payment receipt.'
            ],
            'terms_and_conditions' => [
                'Two rounds of revisions included per phase at no additional cost',
                'All intellectual property rights transfer to client upon final payment',
                '30 days of free support and bug fixes included after project delivery',
                'All project information is kept strictly confidential under NDA',
                'Complete source code and assets delivered upon project completion',
                'Regular progress updates and milestone reviews included throughout project',
                'Client approval required at each milestone before proceeding to next phase'
            ],
            'next_steps' => [
                'Review this proposal thoroughly and confirm your interest',
                'Schedule a kickoff call to discuss project details, timeline, and expectations',
                'Sign the project contract and service agreement',
                'Submit the initial 40% payment to begin work',
                'We will begin Phase 1 within 3 business days of payment receipt'
            ],
            'total' => $totalCost,
            'total_timeline' => $totalWeeks,
        ];
    }
}


