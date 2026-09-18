import { ProjectInquiryData, SendEmailResult } from './types.js';

/**
 * Brevo (formerly Sendinblue) Transactional Email Service
 * Uses the Brevo REST API v3: https://api.brevo.com/v3/smtp/email
 */
export async function sendProjectInquiryEmails(data: ProjectInquiryData): Promise<SendEmailResult> {
  const apiKey = process.env.BREVO_API_KEY || process.env.BRAVO_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'vishalsinghvicky95@gmail.com';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SENDER_EMAIL || 'notifications@crivorradigitals.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'CRIVORRA Digitals';

  // Validate API key
  if (!apiKey) {
    console.warn(
      '[Brevo Backend] BREVO_API_KEY environment variable is not configured. Email will not be dispatched to external SMTP, but inquiry data has been logged.'
    );
    console.log('[Brevo Backend] Captured Inquiry Dossier:', JSON.stringify(data, null, 2));

    return {
      success: true,
      error: 'BREVO_API_KEY not configured. Simulation mode active.',
      adminEmailSent: false,
      clientEmailSent: false,
    };
  }

  const timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Prepare Admin Email Template
  const servicesListHtml = data.services && data.services.length > 0
    ? data.services.map((s) => `<span style="display:inline-block;padding:6px 12px;margin:3px;background-color:#EBF5FF;color:#0066FF;font-weight:600;font-size:13px;border-radius:20px;border:1px solid #BFDBFE;">${s}</span>`).join(' ')
    : '<span style="color:#64748B;">None selected</span>';

  const adminHtmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Project Inquiry - CRIVORRA</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #0F172A;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); text-align: left;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: 2px;">CRIVORRA<span style="color: #FF4500;">.</span></h1>
                    <p style="color: #94A3B8; font-size: 11px; font-family: monospace; letter-spacing: 1.5px; margin: 4px 0 0 0; text-transform: uppercase;">PROJECT INITIATION • INCOMING LEAD</p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(0, 210, 255, 0.15); border: 1px solid rgba(0, 210, 255, 0.4); color: #00D2FF; font-size: 11px; font-weight: 700; border-radius: 999px;">NEW INQUIRY</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">Client Submission Overview</h2>

              <!-- Highlight Box: Monthly Budget -->
              <div style="background: linear-gradient(to right, #F0FDF4, #ECFDF5); border: 1px solid #BBF7D0; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 1px;">Target Monthly Budget</p>
                <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: 800; color: #15803D;">${data.budget || 'Custom / Flexible'}</p>
              </div>

              <!-- Client Details Table -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: separate; border-spacing: 0;">
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #64748B; width: 35%; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">Client Name:</td>
                  <td style="padding: 12px 14px; font-size: 14px; font-weight: 700; color: #0F172A; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">${data.name || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Email Address:</td>
                  <td style="padding: 12px 14px; font-size: 14px; font-weight: 600; color: #0066FF; border-bottom: 1px solid #E2E8F0;">
                    <a href="mailto:${data.email}" style="color: #0066FF; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Phone / WhatsApp:</td>
                  <td style="padding: 12px 14px; font-size: 14px; font-weight: 700; color: #0F172A; border-bottom: 1px solid #E2E8F0;">
                    ${data.phone ? `<a href="tel:${data.phone}" style="color: #0F172A; text-decoration: none;">${data.phone}</a>` : '<span style="color:#94A3B8;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Company / Brand:</td>
                  <td style="padding: 12px 14px; font-size: 14px; color: #334155; font-weight: 600; border-bottom: 1px solid #E2E8F0;">${data.company || '<span style="color:#94A3B8;">Not provided</span>'}</td>
                </tr>
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Website / Handle:</td>
                  <td style="padding: 12px 14px; font-size: 14px; color: #334155; border-bottom: 1px solid #E2E8F0;">
                    ${data.website ? `<a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank" style="color: #0066FF; text-decoration: underline;">${data.website}</a>` : '<span style="color:#94A3B8;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #E2E8F0;">Timestamp:</td>
                  <td style="padding: 12px 14px; font-size: 12px; color: #64748B; font-family: monospace; border-bottom: 1px solid #E2E8F0;">${timestamp}</td>
                </tr>
              </table>

              <!-- Selected Services -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Requested Services</p>
                <div>${servicesListHtml}</div>
              </div>

              <!-- Message / Brief -->
              <div style="margin-bottom: 28px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Project Brief & Objectives</p>
                <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1E293B; white-space: pre-wrap;">
                  ${data.message ? data.message : '<em style="color:#94A3B8;">No additional message specified.</em>'}
                </div>
              </div>

              <!-- Action button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Your Project Inquiry with CRIVORRA Digitals" style="display: inline-block; background-color: #0066FF; color: #FFFFFF; padding: 14px 28px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 14px rgba(0, 102, 255, 0.3);">
                      Reply Directly to Client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: #F1F5F9; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748B;">This notification was dispatched automatically by the CRIVORRA Digitals Brevo Engine.</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // 2. Prepare Client Confirmation Email Template
  const clientHtmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>We Received Your Project Inquiry - CRIVORRA Digitals</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #0F172A;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 28px; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); text-align: center;">
              <h1 style="color: #FFFFFF; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: 2px;">CRIVORRA<span style="color: #FF4500;">.</span></h1>
              <p style="color: #94A3B8; font-size: 12px; letter-spacing: 1px; margin: 6px 0 0 0;">DIGITAL GROWTH ARCHITECTURE • TECHNOLOGY • AI</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0F172A; margin: 0 0 12px 0;">Hello ${data.name ? data.name.split(' ')[0] : 'there'},</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
                Thank you for reaching out to <strong>CRIVORRA Digitals</strong>. We have successfully logged your project inquiry into our intake engine.
              </p>

              <!-- Recap Box -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 1px;">Summary of Your Submission</p>
                <div style="font-size: 14px; margin-bottom: 8px;">
                  <strong style="color: #334155;">Target Monthly Budget:</strong>
                  <span style="color: #0066FF; font-weight: 700;"> ${data.budget || 'Custom / Flexible'}</span>
                </div>
                ${data.services && data.services.length > 0 ? `
                  <div style="font-size: 14px; margin-bottom: 8px;">
                    <strong style="color: #334155;">Services:</strong>
                    <span style="color: #475569;"> ${data.services.join(', ')}</span>
                  </div>
                ` : ''}
                ${data.company ? `
                  <div style="font-size: 14px; margin-bottom: 8px;">
                    <strong style="color: #334155;">Company:</strong>
                    <span style="color: #475569;"> ${data.company}</span>
                  </div>
                ` : ''}
              </div>

              <h3 style="font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 8px 0;">What happens next?</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                Our digital growth strategists are reviewing your goals and market landscape. We will reach out within <strong>24 business hours</strong> with initial recommendations and an executive roadmap.
              </p>

              <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 13px; color: #64748B;">
                <p style="margin: 0;">Best regards,</p>
                <p style="margin: 4px 0 0 0; font-weight: 700; color: #0F172A;">CRIVORRA Digitals Strategy Team</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 28px; background-color: #F1F5F9; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94A3B8;">&copy; ${new Date().getFullYear()} CRIVORRA Digitals. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  let adminSent = false;
  let clientSent = false;
  let lastError: string | undefined;

  // Helper to make Brevo API call
  const sendBrevoEmail = async (payload: {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
    replyTo?: { email: string; name?: string };
  }) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: payload.to,
        subject: payload.subject,
        htmlContent: payload.htmlContent,
        ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brevo API responded with ${response.status}: ${errorText}`);
    }

    return await response.json();
  };

  // 1. Send Email to Admin
  try {
    await sendBrevoEmail({
      to: [{ email: adminEmail, name: 'CRIVORRA Admin' }],
      subject: `🚨 New Lead [${data.budget || 'Custom Budget'}]: ${data.name || 'Anonymous'} (${data.company || 'Personal'})`,
      htmlContent: adminHtmlContent,
      replyTo: data.email ? { email: data.email, name: data.name || 'Client' } : undefined,
    });
    adminSent = true;
    console.log(`[Brevo Backend] Admin notification successfully sent to ${adminEmail}`);
  } catch (err: any) {
    console.error('[Brevo Backend] Error sending admin notification via Brevo:', err?.message || err);
    lastError = err?.message || String(err);
  }

  // 2. Send Confirmation Email to Client (if valid email provided)
  if (data.email && data.email.includes('@')) {
    try {
      await sendBrevoEmail({
        to: [{ email: data.email, name: data.name || 'Valued Client' }],
        subject: `Your Project Inquiry has been received • CRIVORRA Digitals`,
        htmlContent: clientHtmlContent,
      });
      clientSent = true;
      console.log(`[Brevo Backend] Client confirmation email successfully sent to ${data.email}`);
    } catch (err: any) {
      console.error('[Brevo Backend] Error sending client confirmation via Brevo:', err?.message || err);
      // Non-fatal if client email fails but admin passed
      if (!lastError) lastError = err?.message || String(err);
    }
  }

  return {
    success: adminSent || clientSent,
    adminEmailSent: adminSent,
    clientEmailSent: clientSent,
    error: lastError,
  };
}
