/**
 * Appends portfolio site enquiries to the "enquiry" tab.
 *
 * SETUP
 *  1. Open the sheet:
 *     https://docs.google.com/spreadsheets/d/1dI8RCeMnG_bjtaLp1hzNVLlyKztdDcm8WXuKu-L8FB0/edit
 *  2. Extensions -> Apps Script. Delete whatever is there, paste this whole file, Save.
 *  3. Deploy -> New deployment -> gear icon -> Web app.
 *       Description:      enquiry capture
 *       Execute as:       Me
 *       Who has access:   Anyone            <-- must be "Anyone", not "Anyone with Google account"
 *  4. Deploy, then Authorize access and accept the "unsafe" warning (it is your own script).
 *  5. Copy the Web app URL. It ends in /exec — the /dev URL will NOT work for the site.
 *  6. Put that URL in the site's .env as:
 *       VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/..../exec
 *
 * After ANY edit to this file you must Deploy -> Manage deployments -> edit -> New version,
 * otherwise the live URL keeps running the old code.
 */

var SHEET_NAME = 'enquiry';

var HEADERS = [
  'Timestamp',
  'Form',
  'Name',
  'Email',
  'Phone',
  'Company',
  'Interest',
  'Timeline',
  'Message',
  'Source',
  'Page URL',
];

function doPost(e) {
  // Serialise concurrent submissions so two visitors cannot claim the same row.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return json({ ok: false, error: 'busy' });
  }

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter; // form-encoded fallback
    }

    // Honeypot: real visitors never see this field, so anything in it is a bot.
    // Return ok so the bot does not learn it was filtered.
    if (data.trap) {
      return json({ ok: true, skipped: 'trap' });
    }

    if (!data.name && !data.email) {
      return json({ ok: false, error: 'empty submission' });
    }

    var sheet = getSheet();

    sheet.appendRow([
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      str(data.form),
      str(data.name),
      str(data.email),
      str(data.phone),
      str(data.company),
      str(data.interest),
      str(data.timeline),
      str(data.message),
      str(data.source),
      str(data.pageUrl),
    ]);

    return json({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you confirm the deployment is live by opening the /exec URL in a browser. */
function doGet() {
  return json({ ok: true, status: 'enquiry endpoint live' });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function str(v) {
  return v === undefined || v === null ? '' : String(v);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Run once from the editor to write the header row without waiting for a submission. */
function setupHeaders() {
  getSheet();
}
