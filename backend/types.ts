export interface ProjectInquiryData {
  services: string[];
  budget: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  submittedAt?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  clientEmailSent?: boolean;
  adminEmailSent?: boolean;
}
