# OpenAI Integration - Quick Setup

## 🚀 Quick Start

### 1. Add Your OpenAI API Key

Open your `.env` file and add:

```env
OPENAI_API_KEY=sk-your-actual-openai-key-here
```

Get your API key at: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 2. Start the Queue Worker

The AI estimate generation happens in the background. Start the queue worker:

```bash
php artisan queue:work
```

**That's it!** Your form is now fully functional and will generate AI-powered estimates.

---

## 📋 How It Works

### When a Client Fills the Form:

1. **Form Submission** → Client fills out the multi-step form on your homepage
2. **Lead Saved** → Data is saved to the database
3. **Queue Job** → A background job is dispatched to process the estimate
4. **AI Analysis** → OpenAI GPT-4o analyzes the project requirements and generates:
   - Executive summary
   - Project approach and methodology
   - Detailed phase breakdown with timelines and costs
   - Deliverables for each phase
   - Assumptions and risk assessments
   - Next steps
5. **PDF Generation** → A professional, branded PDF is created
6. **Email Sent** → Client receives a beautiful email with the PDF attached

### Typical Processing Time:
- **AI Generation**: 5-15 seconds
- **PDF Creation**: 1-2 seconds
- **Email Delivery**: 1-3 seconds
- **Total**: ~10-20 seconds

---

## 💰 Cost Estimation

Using GPT-4o:
- **Simple projects**: $0.01 - $0.02 per estimate
- **Complex projects**: $0.03 - $0.05 per estimate
- **Average**: ~$0.02 per estimate

For 100 estimates/month: **~$2/month**

---

## 🎨 What Clients Receive

### Professional Email
- Branded header with Ryven logo
- Personalized greeting
- Overview of what's included
- PDF attachment

### Comprehensive PDF (2-3 pages)
- **Page 1**: Project overview, description, executive summary, approach
- **Page 2**: Detailed phase breakdown with:
  - Phase names and descriptions
  - Duration in weeks
  - Specific deliverables
  - Cost per phase
  - Total investment
- **Additional**: Assumptions, risks, next steps

---

## 🔧 Configuration

### OpenAI Model Settings

Located in: `app/Services/EstimateGenerator.php`

```php
'model' => 'gpt-4o',           // Model to use
'temperature' => 0.7,          // Creativity (0-1)
'response_format' => ['type' => 'json_object'],  // Structured output
```

### Fallback System

If OpenAI fails (network issue, rate limit, etc.), the system automatically falls back to a template-based estimate. No errors shown to the client!

---

## 🧪 Testing

### Test Locally:

1. Fill out the form on the homepage
2. Watch the queue worker terminal for processing
3. Check `storage/app/public/estimates/` for generated PDFs
4. Check your email for the delivery

### Monitor Queue:

```bash
# See all jobs
php artisan queue:monitor

# Watch queue in real-time
php artisan queue:work --verbose
```

---

## 📊 What Gets Analyzed

The AI receives:
- **Project Type**: web-app, mobile-app, design
- **Description**: Client's full description
- **Requirements**: All key requirements listed
- **Timeline**: Client's desired timeline
- **Company Info**: For context

The AI then:
- Understands project scope
- Breaks down into logical phases
- Estimates realistic timelines
- Calculates fair market pricing
- Identifies risks and assumptions
- Suggests next steps

---

## 🎯 Prompt Engineering

The AI system prompt emphasizes:
- Professional project management expertise
- Accurate, realistic estimates
- Industry-standard practices
- Client-ready, presentation-quality output
- Detailed but concise communication

---

## 🔒 Security & Best Practices

### Environment Variables
- ✅ Never commit `.env` to git
- ✅ Keep API keys secret
- ✅ Rotate keys periodically

### Rate Limiting
- System handles OpenAI rate limits gracefully
- Automatic fallback to template estimates
- Error logging for monitoring

### Data Privacy
- Client data used only for estimate generation
- No data sent to OpenAI beyond project details
- PDFs stored securely on your server

---

## 🐛 Troubleshooting

### "Queue not processing"
**Solution**: Make sure queue worker is running:
```bash
php artisan queue:work
```

### "OpenAI 401 Error"
**Solution**: Check your API key in `.env` is correct

### "OpenAI 429 Error"
**Solution**: Rate limit exceeded. System will use fallback. Check your OpenAI quota.

### "PDF not generating"
**Solution**: Check storage permissions:
```bash
chmod -R 775 storage/
```

### "Email not sending"
**Solution**: Configure SMTP in `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
```

---

## 📈 Production Deployment

### 1. Queue Workers (Required!)

Use **Supervisor** to keep queue workers running:

```ini
[program:ryven-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
numprocs=2
user=www-data
```

### 2. Cron Job (Recommended)

Add to crontab:
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

### 3. Environment Variables

Ensure production `.env` has:
- ✅ `OPENAI_API_KEY` set
- ✅ `QUEUE_CONNECTION=database` (or redis)
- ✅ Mail configuration
- ✅ `APP_ENV=production`

---

## 🎉 You're All Set!

Your lead generation system is now fully functional with AI-powered estimates!

**Next steps:**
1. Add your OpenAI API key to `.env`
2. Start the queue worker: `php artisan queue:work`
3. Test the form on your homepage
4. Watch the magic happen! ✨

---

**Questions?** Check `SETUP.md` for detailed configuration or contact support.

