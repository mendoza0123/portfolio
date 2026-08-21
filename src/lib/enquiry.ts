import { SHEETS_WEBHOOK_URL, isEnquiryCaptureConfigured } from '../config';

/**
 * One row in the "enquiry" sheet. Both site forms post this same shape so they
 * share a single tab — `form` is what tells them apart.
 */
export interface EnquiryPayload {
  form: 'Architecture Audit' | 'Growth Audit';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  timeline?: string;
  message?: string;
  /** Which CTA opened the form, when the visitor arrived via one. */
  source?: string;
  /** Honeypot. Bots fill hidden inputs; humans never see them. */
  trap?: string;
}

export type EnquiryResult =
  | { ok: true; confirmed: boolean }
  | { ok: false; reason: 'unconfigured' | 'network' };

/**
 * Appends the enquiry to the Google Sheet.
 *
 * Apps Script has no CORS preflight handler, so the body goes as text/plain —
 * a "simple request" the browser sends without an OPTIONS probe. When the
 * redirected response comes back readable we get real confirmation; when CORS
 * blocks reading it we retry opaquely, which still delivers the row but cannot
 * report back. `confirmed` says which of the two happened.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (!isEnquiryCaptureConfigured) {
    console.warn(
      '[enquiry] No VITE_SHEETS_WEBHOOK_URL configured — this submission was not recorded. See src/config.ts.'
    );
    return { ok: false, reason: 'unconfigured' };
  }

  const body = JSON.stringify({
    ...payload,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
  });

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      redirect: 'follow',
    });
    // The response was readable, so its status is the real verdict.
    return res.ok ? { ok: true, confirmed: true } : { ok: false, reason: 'network' };
  } catch {
    // Reading the response was blocked. Send it again opaquely so the row still
    // lands, and report success without confirmation.
    try {
      await fetch(SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      });
      return { ok: true, confirmed: false };
    } catch {
      return { ok: false, reason: 'network' };
    }
  }
}
