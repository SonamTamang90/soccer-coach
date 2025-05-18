import type { StatusEvent } from "@/components/dashboard/JobDetailsModal";

export interface EmailSettings {
  enabled: boolean;
  emailAddress: string;
  followUpDays: {
    afterApplied: number;
    afterInterview: number;
  };
  notifications: {
    applicationReminders: boolean;
    interviewReminders: boolean;
    statusChanges: boolean;
  };
}

export interface FollowUpEmail {
  id: string;
  jobId: string;
  triggerDate: string; // ISO date
  emailType: "follow_up_application" | "follow_up_interview" | "status_change";
  sent: boolean;
  subject?: string;
  body?: string;
  jobTitle?: string;
  companyName?: string;
}

// Default email settings
export const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  enabled: false,
  emailAddress: "",
  followUpDays: {
    afterApplied: 7,
    afterInterview: 5,
  },
  notifications: {
    applicationReminders: true,
    interviewReminders: true,
    statusChanges: true,
  },
};

/**
 * Get email settings from localStorage
 */
export const getEmailSettings = (): EmailSettings => {
  if (typeof window === "undefined") {
    return DEFAULT_EMAIL_SETTINGS;
  }

  const settings = localStorage.getItem("emailSettings");
  return settings ? JSON.parse(settings) : DEFAULT_EMAIL_SETTINGS;
};

/**
 * Save email settings to localStorage
 */
export const saveEmailSettings = (settings: EmailSettings): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("emailSettings", JSON.stringify(settings));
};

/**
 * Get scheduled follow-up emails
 */
export const getScheduledEmails = (): FollowUpEmail[] => {
  if (typeof window === "undefined") return [];

  const emails = localStorage.getItem("scheduledEmails");
  return emails ? JSON.parse(emails) : [];
};

/**
 * Save scheduled follow-up emails
 */
export const saveScheduledEmails = (emails: FollowUpEmail[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("scheduledEmails", JSON.stringify(emails));
};

/**
 * Generate a follow-up email based on job status event
 */
export const createFollowUpEmail = (
  jobId: string,
  event: StatusEvent,
  jobTitle: string,
  companyName: string
): FollowUpEmail | null => {
  const settings = getEmailSettings();
  if (!settings.enabled) return null;

  // Only create follow-up emails for specific event types
  let emailType: FollowUpEmail["emailType"] | null = null;
  let daysToAdd = 0;
  let subject = "";
  let body = "";

  if (event.type === "applied" && settings.notifications.applicationReminders) {
    emailType = "follow_up_application";
    daysToAdd = settings.followUpDays.afterApplied;
    subject = `Follow up on your ${jobTitle} application at ${companyName}`;
    body = `It&apos;s been ${daysToAdd} days since you applied for the ${jobTitle} position at ${companyName}. Consider following up if you haven&apos;t heard back.`;
  } else if (
    (event.type === "interview_completed" ||
      event.type === "technical_interview") &&
    settings.notifications.interviewReminders
  ) {
    emailType = "follow_up_interview";
    daysToAdd = settings.followUpDays.afterInterview;
    subject = `Follow up after your ${companyName} interview`;
    body = `It&apos;s been ${daysToAdd} days since your interview for the ${jobTitle} position at ${companyName}. Consider sending a follow-up email.`;
  } else {
    return null;
  }

  // Calculate trigger date
  const eventDate = new Date(event.date);
  const triggerDate = new Date(eventDate);
  triggerDate.setDate(eventDate.getDate() + daysToAdd);

  return {
    id: `email_${jobId}_${Date.now()}`,
    jobId,
    triggerDate: triggerDate.toISOString(),
    emailType,
    sent: false,
    subject,
    body,
    jobTitle,
    companyName,
  };
};

/**
 * Schedule a follow-up email
 */
export const scheduleFollowUpEmail = (email: FollowUpEmail): void => {
  const emails = getScheduledEmails();
  saveScheduledEmails([...emails, email]);
};

/**
 * Mark email as sent
 */
export const markEmailAsSent = (emailId: string): void => {
  const emails = getScheduledEmails();
  const updatedEmails = emails.map((email) =>
    email.id === emailId ? { ...email, sent: true } : email
  );
  saveScheduledEmails(updatedEmails);
};

/**
 * Send an email (mock implementation)
 */
export const sendEmail = async (
  to: string,
  subject: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  body: string
): Promise<boolean> => {
  console.log("Email would be sent:", { to, subject });

  // Show a browser notification instead of actually sending an email
  if (
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "granted"
  ) {
    new Notification("Email Notification (Demo)", {
      body: subject,
    });
    return true;
  }

  return false;
};

/**
 * Check and process due emails
 * Uses browser notifications only in this frontend-only demo
 */
export const processScheduledEmails = async (): Promise<void> => {
  const settings = getEmailSettings();
  if (!settings.enabled || !settings.emailAddress) return;

  const emails = getScheduledEmails();
  const now = new Date();
  let updated = false;

  for (const email of emails) {
    if (email.sent) continue;

    const triggerDate = new Date(email.triggerDate);
    if (triggerDate <= now) {
      console.log(`Processing email: ${email.subject}`);

      // Use browser notifications only
      if (
        email.subject &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("Job Application Reminder", {
          body: email.subject,
        });
      }

      // Mark as sent
      email.sent = true;
      updated = true;
    }
  }

  if (updated) {
    saveScheduledEmails(emails);
  }
};

/**
 * Initialize email service
 */
export const initEmailService = (): void => {
  if (typeof window === "undefined") return;

  // Request notification permission for demo purposes
  if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
  }

  // Check for emails that need to be sent every minute
  setInterval(processScheduledEmails, 60000);

  // Also process immediately
  processScheduledEmails();
};
