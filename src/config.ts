/**
 * Google Apps Script Web App URL that appends enquiries to the "enquiry" tab of
 * https://docs.google.com/spreadsheets/d/1dI8RCeMnG_bjtaLp1hzNVLlyKztdDcm8WXuKu-L8FB0
 *
 * Deploy scripts/google-sheet-enquiry.gs (see its header for steps), then either:
 *   - put the /exec URL in .env as VITE_SHEETS_WEBHOOK_URL, or
 *   - paste it into FALLBACK_WEBHOOK_URL below.
 *
 * This URL ships in the client bundle either way, so it is not a secret. The
 * Apps Script is append-only and never reads the sheet back.
 */
const FALLBACK_WEBHOOK_URL = '';

export const SHEETS_WEBHOOK_URL: string =
  import.meta.env.VITE_SHEETS_WEBHOOK_URL?.trim() ||
  FALLBACK_WEBHOOK_URL.trim();

export const isEnquiryCaptureConfigured = SHEETS_WEBHOOK_URL.length > 0;
