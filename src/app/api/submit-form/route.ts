import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      company,
      role,
      website,
      projectDescription,
      outcomeMetric,
      currentStack,
      channels,
      timeline,
      budget,
      readyToStart,
    } = body;

    // Validate required fields
    if (!fullName || !email || !company || !role || !projectDescription || !timeline) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Configure Google Sheets API
    let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
    privateKey = privateKey.replace(/\\n/g, '\n');
    privateKey = privateKey.replace(/\\\\n/g, '\n');

    if (!privateKey || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SHEET_ID) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Append row to spreadsheet
    const timestamp = new Date().toISOString();
    const values = [[
      timestamp,
      fullName,
      email,
      company,
      role,
      website || '',
      projectDescription,
      outcomeMetric || '',
      currentStack || '',
      Array.isArray(channels) ? channels.join(', ') : '',
      timeline,
      budget || '',
      readyToStart ? 'Yes' : 'No',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:M',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error saving to Google Sheets:', err.message);
    return NextResponse.json(
      { error: 'Failed to save form data' },
      { status: 500 }
    );
  }
}
