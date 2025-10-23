# Ryven Estimation Calculator - Setup Guide

## Environment Configuration

### Required Environment Variables

Add the following to your `.env` file:

```env
# OpenAI Configuration (Required for AI-powered estimates)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ORGANIZATION=your_openai_organization_id  # Optional
```

### Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key and add it to your `.env` file

### Queue Configuration

For processing estimates, ensure your queue worker is running:

```bash
php artisan queue:work
```

Or for development with auto-reload:

```bash
php artisan queue:listen
```

### Email Configuration

Update your `.env` with mail settings:

```env
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@ryven.com
MAIL_FROM_NAME="${APP_NAME}"
```

## Installation Steps

1. **Install PHP dependencies:**
   ```bash
   composer install
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Run migrations:**
   ```bash
   php artisan migrate
   ```

4. **Build frontend assets:**
   ```bash
   npm run build
   ```

5. **Create storage link:**
   ```bash
   php artisan storage:link
   ```

6. **Start queue worker:**
   ```bash
   php artisan queue:work
   ```

7. **Start development server:**
   ```bash
   php artisan serve
   ```

## Features

### AI-Powered Estimate Generation

The system uses OpenAI's GPT-4 to:
- Analyze project requirements
- Generate detailed project phases with timelines
- Provide accurate cost estimates
- Include risk assessments and mitigation strategies
- Suggest next steps

### PDF Generation

Professional PDF estimates include:
- Executive summary
- Project approach and methodology
- Phase-by-phase breakdown with deliverables
- Cost structure and timeline
- Assumptions and risks
- Next steps

### Email Delivery

Clients receive a professional email with:
- Personalized greeting
- Overview of what's included
- PDF attachment with full estimate
- Call to action for next steps

## Testing

To test the estimate generation locally:

1. Fill out the form at the homepage
2. Check the queue is processing: `php artisan queue:work`
3. Monitor logs: `tail -f storage/logs/laravel.log`
4. Check generated PDFs in: `storage/app/public/estimates/`

## Production Considerations

1. **Queue Workers:** Use Supervisor to keep queue workers running
2. **OpenAI Limits:** Monitor API usage and set rate limits
3. **Email:** Configure a reliable SMTP service (SendGrid, Mailgun, etc.)
4. **Storage:** Ensure sufficient disk space for PDF storage
5. **Backup:** Regularly backup the database and storage folder

## Troubleshooting

### OpenAI API Errors

- **401 Unauthorized:** Check your API key is correct
- **429 Rate Limit:** You've exceeded your OpenAI quota
- **500 Error:** Check logs for detailed error messages

### PDF Generation Issues

- **Blank PDF:** Check the Blade template syntax
- **Missing Fonts:** Ensure DejaVu Sans is available
- **Large Files:** Optimize images in PDF template

### Email Delivery

- **Not sending:** Verify SMTP credentials
- **Spam folder:** Configure SPF/DKIM records
- **Attachment missing:** Check file permissions on storage folder

## Support

For issues or questions, contact: support@ryven.com

