const SPREADSHEET_ID = '1S4rnRzNb7lkTAQ11L6IAaY6OTUkDCBgHpiiDSJvhvrk';
const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(body);
    const guests = Array.isArray(data.guests) ? data.guests : [];
    const guest1 = guests[0] || {};
    const guest2 = guests[1] || {};

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      guest1.name || '',
      formatAttendance(guest1.attending),
      guest2.name || '',
      formatAttendance(guest2.attending),
      data.comment || '',
      data.source || 'wedding-invite'
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'wedding-rsvp' });
}

function formatAttendance(value) {
  if (value === 'yes') return 'Да';
  if (value === 'no') return 'Нет';
  return '';
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
