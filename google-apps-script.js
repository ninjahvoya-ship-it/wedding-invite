const SPREADSHEET_ID = '1S4rnRzNb7lkTAQ11L6IAaY6OTUkDCBgHpiiDSJvhvrk';
const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    return saveResponse(JSON.parse(body));
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.payload) {
    try {
      return saveResponse(JSON.parse(e.parameter.payload));
    } catch (error) {
      return jsonResponse({ ok: false, error: String(error) });
    }
  }

  return jsonResponse({ ok: true, service: 'wedding-rsvp' });
}

function saveResponse(data) {
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
