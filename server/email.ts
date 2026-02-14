import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

interface ContactEmailData {
  name: string;
  email: string;
  projectType: string;
  websiteUrl?: string | null;
  details: string;
}

export async function sendNewsletterNotification(email: string) {
  const { client, fromEmail } = await getUncachableResendClient();

  await client.emails.send({
    from: fromEmail,
    to: 'robdavis@darkbloomdigital.com',
    subject: `New Newsletter Subscriber — ${email}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #18181b; color: #ffffff; border-radius: 12px;">
        <h2 style="color: #e61e50; margin-bottom: 24px;">New Newsletter Subscriber</h2>
        <p style="color: #a1a1aa; margin: 0 0 8px 0;">Email</p>
        <p style="color: #ffffff; margin: 0;"><a href="mailto:${email}" style="color: #e61e50;">${email}</a></p>
      </div>
    `,
  });
}

export async function sendContactNotification(data: ContactEmailData) {
  const { client, fromEmail } = await getUncachableResendClient();

  await client.emails.send({
    from: fromEmail,
    to: 'robdavis@darkbloomdigital.com',
    subject: `New Inquiry from ${data.name} — ${data.projectType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #18181b; color: #ffffff; border-radius: 12px;">
        <h2 style="color: #e61e50; margin-bottom: 24px;">New Contact Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #a1a1aa; width: 140px;">Name</td>
            <td style="padding: 8px 0; color: #ffffff;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a1a1aa;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #e61e50;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a1a1aa;">Project Type</td>
            <td style="padding: 8px 0; color: #ffffff;">${data.projectType}</td>
          </tr>
          ${data.websiteUrl ? `<tr>
            <td style="padding: 8px 0; color: #a1a1aa;">Website URL</td>
            <td style="padding: 8px 0;"><a href="${data.websiteUrl}" style="color: #e61e50;">${data.websiteUrl}</a></td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #27272a; border-radius: 8px;">
          <p style="color: #a1a1aa; margin: 0 0 8px 0; font-size: 14px;">Details</p>
          <p style="color: #ffffff; margin: 0; white-space: pre-wrap;">${data.details}</p>
        </div>
      </div>
    `,
  });
}
