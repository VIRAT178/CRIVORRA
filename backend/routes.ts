import { Router, Request, Response } from 'express';
import { sendProjectInquiryEmails } from './brevo.js';
import { ProjectInquiryData } from './types.js';

export const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'CRIVORRA Digitals Backend',
    timestamp: new Date().toISOString(),
  });
});

// Brevo Configuration Status Check (Safe, does not leak key)
apiRouter.get('/brevo/status', (req: Request, res: Response) => {
  const isConfigured = Boolean(process.env.BREVO_API_KEY || process.env.BRAVO_API_KEY);
  res.json({
    brevoConfigured: isConfigured,
    adminEmail: process.env.ADMIN_EMAIL || 'vishalsinghvicky95@gmail.com',
    senderEmail: process.env.BREVO_SENDER_EMAIL || 'notifications@crivorradigitals.com',
  });
});

// Handle Project Planner Inquiry Form Submission
apiRouter.post('/project-inquiry', async (req: Request, res: Response) => {
  try {
    const {
      services,
      budget,
      name,
      email,
      phone,
      company,
      website,
      message,
    } = req.body as Partial<ProjectInquiryData>;

    // Basic Validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
      });
      return;
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'A contact name is required.',
      });
      return;
    }

    const sanitizedData: ProjectInquiryData = {
      services: Array.isArray(services) ? services : [],
      budget: budget || 'Custom / Flexible',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      company: company ? String(company).trim() : undefined,
      website: website ? String(website).trim() : undefined,
      message: message ? String(message).trim() : undefined,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    console.log(`[API /project-inquiry] Received inquiry from ${sanitizedData.name} (${sanitizedData.email})`);

    // Dispatch emails through Brevo
    const emailResult = await sendProjectInquiryEmails(sanitizedData);

    res.status(200).json({
      success: true,
      message: 'Your inquiry has been successfully received.',
      data: {
        adminEmailSent: emailResult.adminEmailSent,
        clientEmailSent: emailResult.clientEmailSent,
        simulated: !process.env.BREVO_API_KEY && !process.env.BRAVO_API_KEY,
      },
    });
  } catch (error: any) {
    console.error('[API /project-inquiry] Internal error:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to process project inquiry.',
    });
  }
});
