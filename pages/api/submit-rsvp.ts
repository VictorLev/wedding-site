import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      adults,
      dietaryRestrictions,
      favoriteSong,
      comments,
      stayingOnsite,
      accommodations,
      plusOneFirstName,
      plusOneLastName,
    } = body;

    const auth = await google.auth.getClient({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:A',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            firstName,
            lastName,
            adults,
            plusOneFirstName,
            plusOneLastName,
            dietaryRestrictions,
            favoriteSong,
            comments,
            stayingOnsite,
            accommodations,
          ],
        ],
      },
    });

    return Response.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('RSVP ERROR:', error);

    return Response.json(
      { message: 'Failed to submit form', error: String(error) },
      { status: 500 }
    );
  }
}