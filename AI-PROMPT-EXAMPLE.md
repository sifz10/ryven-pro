# 🤖 AI Prompt Structure

This document shows the exact prompts sent to OpenAI GPT-4o for proposal generation.

---

## System Prompt

```
You are a senior project manager and proposal writer at Ryven Global LLC, a professional development agency with 25+ successful projects. Your expertise includes mobile apps, web development, UI/UX design, and branding. You create persuasive, client-focused proposals that address client pain points, demonstrate value, and follow professional proposal structure. Always be specific, realistic, and tailored to the client's needs.
```

---

## User Prompt Template

```
Generate a comprehensive project proposal for the following client:

Project Type: {project_type}
Client: {client_name} ({company_name})

Project Description:
{project_description}

Key Requirements:
{requirements_list}

Client Desired Timeline: {timeline_weeks} weeks

IMPORTANT: Follow this EXACT phase structure for {project_type}:
{phase_structure}

Payment Terms (MUST INCLUDE):
- 40% upfront payment before starting Phase 1
- 60% payment after project completion

Provide a response in JSON format with these fields:

1. executive_summary: A compelling 2-3 paragraph summary that:
   - Shows understanding of client's goals and pain points
   - Highlights the value and outcome they'll achieve
   - Builds confidence in Ryven's ability to deliver
   
2. client_problem: Clear description of the client's current challenges or goals based on their project description

3. solution_overview: Brief overview of how Ryven will solve their problem

4. phases: Array matching the structure above. For each phase include:
   - name: (use exact names from structure)
   - description: Detailed explanation of what happens in this phase
   - weeks: Realistic duration in weeks
   - deliverables: Array of specific, tangible deliverables
   - cost: Realistic cost in USD for this phase
   
5. total_deliverables: Array of ALL final deliverables the client will receive

6. timeline_overview: A brief paragraph explaining the overall timeline and key milestones

7. why_ryven: Array of 4-5 compelling reasons to choose Ryven (include specific credentials, experience, process advantages)

8. payment_terms: Object with:
   - upfront_percentage: 40
   - upfront_amount: (calculate 40% of total)
   - final_percentage: 60
   - final_amount: (calculate 60% of total)
   - payment_schedule: Brief description of when payments are due

9. terms_and_conditions: Array of important terms (revisions policy, IP rights, support terms, confidentiality)

10. next_steps: Array of clear action items for the client to proceed

11. total_cost: Total project investment in USD
12. total_timeline: Total weeks from start to delivery

Make the proposal:
- Client-focused (use "you" and "your business")
- Specific and detailed
- Professional and persuasive
- Realistic in pricing and timeline
- Tailored to their exact project type and requirements
```

---

## Phase Structures by Project Type

### Mobile App & Web App
```json
[
  "Phase 1: Information Gathering & Design UI/UX",
  "Phase 2: Development of the App and Backend",
  "Phase 3: Deployment & Testing",
  "Phase 4: Delivery and 30 Days Free Trial"
]
```

### UI/UX Design
```json
[
  "Phase 1: Information Gathering & Design Wireframe",
  "Phase 2: Design High Fidelity",
  "Phase 3: Feedback and Revision Session",
  "Phase 4: Prepare Deliverables and Delivery"
]
```

### Branding
```json
[
  "Phase 1: Gather Information About the Brand and Kickstart the Project",
  "Phase 2: Delivery"
]
```

---

## Example Request (Mobile App)

```
Generate a comprehensive project proposal for the following client:

Project Type: mobile-app
Client: John Doe (Tech Startup Inc)

Project Description:
We need a mobile app for both iOS and Android that allows users to book fitness classes, track their workouts, and connect with trainers. The app should have real-time notifications, payment processing, and social features.

Key Requirements:
- User authentication and profiles
- Class booking system
- Real-time push notifications
- Payment gateway integration (Stripe)
- Workout tracking with charts
- Social feed and messaging
- Trainer dashboard
- Admin panel

Client Desired Timeline: 12 weeks

IMPORTANT: Follow this EXACT phase structure for mobile-app:
[
  "Phase 1: Information Gathering & Design UI/UX",
  "Phase 2: Development of the App and Backend",
  "Phase 3: Deployment & Testing",
  "Phase 4: Delivery and 30 Days Free Trial"
]

Payment Terms (MUST INCLUDE):
- 40% upfront payment before starting Phase 1
- 60% payment after project completion

[... rest of prompt structure ...]
```

---

## Expected AI Response Structure

```json
{
  "executive_summary": "We understand that Tech Startup Inc is looking to revolutionize the fitness industry with a comprehensive mobile solution...",
  
  "client_problem": "Your current challenge is providing fitness enthusiasts with a seamless way to discover, book, and track fitness classes...",
  
  "solution_overview": "Ryven Global LLC will develop a feature-rich, cross-platform mobile application that addresses all your requirements...",
  
  "phases": [
    {
      "name": "Phase 1: Information Gathering & Design UI/UX",
      "description": "We'll conduct detailed discovery sessions to understand your users, create wireframes, and design intuitive interfaces...",
      "weeks": 3,
      "deliverables": [
        "Complete wireframes for all app screens",
        "High-fidelity UI designs",
        "Interactive prototype",
        "Design system and style guide",
        "User flow diagrams"
      ],
      "cost": 4500
    },
    {
      "name": "Phase 2: Development of the App and Backend",
      "description": "Our development team will build the iOS and Android apps using React Native, along with a robust Node.js backend...",
      "weeks": 7,
      "deliverables": [
        "Fully functional iOS app",
        "Fully functional Android app",
        "RESTful API backend",
        "Database architecture",
        "Payment integration",
        "Push notification system",
        "Admin dashboard"
      ],
      "cost": 18000
    },
    {
      "name": "Phase 3: Deployment & Testing",
      "description": "Comprehensive QA testing across devices, performance optimization, and deployment to app stores...",
      "weeks": 2,
      "deliverables": [
        "QA testing reports",
        "Bug fixes and optimizations",
        "App Store submission",
        "Google Play submission",
        "Production server setup"
      ],
      "cost": 3500
    },
    {
      "name": "Phase 4: Delivery and 30 Days Free Trial",
      "description": "Final handover with complete documentation, training, and 30 days of free technical support...",
      "weeks": 1,
      "deliverables": [
        "Complete source code",
        "Technical documentation",
        "User manuals",
        "Video tutorials",
        "30 days free support"
      ],
      "cost": 2000
    }
  ],
  
  "total_deliverables": [
    "Complete source code for iOS and Android apps",
    "Backend API and database",
    "Admin dashboard",
    "Complete documentation",
    "Design files and assets",
    "App Store and Google Play listings",
    "30 days of free technical support"
  ],
  
  "timeline_overview": "The complete project will be delivered in 13 weeks, divided into four structured phases. Each phase has clear milestones and deliverables, with regular check-ins to ensure alignment with your vision.",
  
  "why_ryven": [
    "Over 25+ mobile apps successfully delivered to the App Store and Google Play",
    "Expert team with average 5+ years of experience in React Native and backend development",
    "Proven track record in fitness and wellness app development",
    "Quality-focused agile development process with weekly progress updates",
    "30 days of free support and ongoing maintenance options available"
  ],
  
  "payment_terms": {
    "upfront_percentage": 40,
    "upfront_amount": 11200,
    "final_percentage": 60,
    "final_amount": 16800,
    "payment_schedule": "40% ($11,200) upfront before Phase 1 begins. Remaining 60% ($16,800) due upon successful project completion and delivery of all deliverables."
  },
  
  "terms_and_conditions": [
    "Two rounds of revisions included per phase, additional revisions billed hourly",
    "All intellectual property rights transfer to client upon final payment receipt",
    "30 days of free bug fixes and technical support included after delivery",
    "All project information kept strictly confidential under mutual NDA",
    "Complete source code and assets delivered upon project completion",
    "Weekly progress updates and milestone reviews scheduled",
    "App Store and Google Play developer accounts must be provided by client"
  ],
  
  "next_steps": [
    "Review this proposal and confirm your interest to proceed",
    "Schedule a kickoff call within 3 business days to discuss technical details",
    "Sign the project contract and service level agreement",
    "Submit the initial 40% payment ($11,200) to begin work",
    "Phase 1 begins immediately upon payment receipt (within 24 hours)"
  ],
  
  "total_cost": 28000,
  "total_timeline": 13
}
```

---

## Model Configuration

```php
'model' => 'gpt-4o',
'temperature' => 0.7,
'response_format' => ['type' => 'json_object']
```

- **Model**: GPT-4o (latest optimized version)
- **Temperature**: 0.7 (balanced between creativity and consistency)
- **Format**: JSON (ensures structured, parseable output)

---

## Why This Prompt Works

### ✅ Clear Structure
The prompt explicitly defines the exact JSON structure needed, preventing format errors.

### ✅ Context-Rich
Provides all necessary client information and project details for personalization.

### ✅ Constraint-Driven
Specifies exact phase names and payment terms to ensure consistency.

### ✅ Quality Guidelines
Includes specific instructions for tone, language, and professionalism.

### ✅ Client-Focused
Emphasizes addressing client needs and using persuasive, value-driven language.

### ✅ Realistic Expectations
Asks for industry-standard pricing and realistic timelines.

---

## Testing the Prompt

You can test the AI generation using:

```bash
# Submit a test form through the UI
# Or use the test email route
GET /test-email
```

Check the generated PDF in `storage/app/public/estimates/` and review the structure.

---

**Pro Tip**: The AI adapts its output based on:
- Project complexity (from requirements)
- Client timeline expectations
- Project type (mobile vs web vs design vs branding)
- Specific features mentioned

More detailed input = More customized and accurate proposal! 🎯

---

**Last Updated:** October 22, 2025  
**Ryven Global LLC** - AI-Powered Estimation System
