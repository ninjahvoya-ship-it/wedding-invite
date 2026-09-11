# Wedding Invite

Static wedding invitation for GitHub Pages with RSVP collection in Google Sheets.

## Google Apps Script setup

1. Open <https://script.google.com/>.
2. Create a new project.
3. Replace the default code with the contents of `google-apps-script.js`.
4. Click **Deploy** -> **New deployment**.
5. Select **Web app**.
6. Set **Execute as** to **Me**.
7. Set **Who has access** to **Anyone**.
8. Deploy and authorize the script.
9. Copy the Web app URL.
10. In `index.html`, replace `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.

RSVP responses are written to:
https://docs.google.com/spreadsheets/d/1S4rnRzNb7lkTAQ11L6IAaY6OTUkDCBgHpiiDSJvhvrk
