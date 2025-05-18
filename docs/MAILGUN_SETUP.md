# Email Functionality (Frontend Only Demo)

This application implements a frontend-only demo of email follow-ups for job applications. Instead of sending actual emails, the system will:

1. Store scheduled email notifications in your browser's localStorage
2. Display browser notifications when follow-up reminders are due
3. Simulate the email flow without actually sending emails

## How It Works

When you add job applications or interviews to the tracker, the system will automatically schedule follow-up reminders based on your settings. When these reminders are due, you'll receive browser notifications instead of actual emails.

## Enabling Browser Notifications

To get the most out of this demo:

1. When prompted, allow the application to send browser notifications
2. Make sure you're using a browser that supports notifications (most modern browsers do)
3. Enable notifications in your browser settings if they're currently disabled

## Email Settings

The Email Settings page allows you to:

1. Enable/disable notification reminders
2. Set your preferred timing for follow-ups
3. Configure which types of events should generate reminders

## Email Templates

The application includes templates for:

1. **Application Follow-up**: Reminds you to follow up after submitting a job application
2. **Interview Follow-up**: Reminds you to follow up after completing an interview

## Testing the Functionality

1. Enable notifications in the Email Settings page
2. Enter your email address (not used for actual sending in this demo)
3. Add a job application or record an interview
4. The system will schedule reminders based on your settings
5. You'll receive browser notifications when reminders are due

## Note for Production Use

In a production environment, you would integrate a real email service like SendGrid or Mailgun to send actual emails. This would require:

1. Setting up an account with an email service provider
2. Configuring API keys in your environment
3. Implementing server-side email sending functionality

For this demo, everything is handled client-side with browser notifications.
