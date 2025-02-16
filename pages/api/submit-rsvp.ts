import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

const sheets = google.sheets('v4');

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, activities, adults, children, dietaryRestrictions, favoriteSong, comments, stayingOnsite, accommodations, arrivalDate, departureDate } = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    try {
      const client = await auth.getClient();
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      await sheets.spreadsheets.values.append({
        auth: client,
        spreadsheetId,
        range: 'Sheet1!A:A', // Adjust the range as needed
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [
            [firstName, lastName, activities.join(', '), adults, children, dietaryRestrictions, favoriteSong, comments, stayingOnsite, accommodations, arrivalDate, departureDate],
          ],
        },
      });

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit form' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;