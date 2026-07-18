import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import type { sheets_v4 } from 'googleapis';

export const dynamic = 'force-dynamic';

const SHEET_NAME = 'Comments';
const RANGE = `${SHEET_NAME}!A:E`;

function getSheetsClient() {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  privateKey = privateKey.replace(/\\n/g, '\n');
  privateKey = privateKey.replace(/\\\\n/g, '\n');

  if (!privateKey || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SHEET_ID) {
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

async function ensureCommentsSheet(sheets: sheets_v4.Sheets, spreadsheetId: string) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = meta.data.sheets?.some(
    (s) => s.properties?.title === SHEET_NAME
  );
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
      },
    });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['timestamp', 'slug', 'name', 'comment', 'status']],
      },
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const sheets = getSheetsClient();
    if (!sheets) {
      return NextResponse.json({ comments: [] });
    }
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    let rows: string[][] = [];
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: RANGE,
      });
      rows = (res.data.values as string[][]) || [];
    } catch {
      // Comments tab doesn't exist yet — no comments.
      return NextResponse.json({ comments: [] });
    }

    const comments = rows
      .filter(
        (r) =>
          r[1] === slug &&
          ['approved', 'true', 'yes'].includes((r[4] || '').trim().toLowerCase())
      )
      .map((r) => ({ date: r[0], name: r[2], comment: r[3] }));

    return NextResponse.json({ comments });
  } catch (error: unknown) {
    console.error('Error reading comments:', (error as Error).message);
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, name, comment, website } = body;

    // Honeypot: real readers never fill this hidden field.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (
      typeof slug !== 'string' ||
      typeof name !== 'string' ||
      typeof comment !== 'string' ||
      !slug.trim() ||
      !name.trim() ||
      !comment.trim()
    ) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }
    if (name.length > 80 || comment.length > 2000 || slug.length > 200) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const sheets = getSheetsClient();
    if (!sheets) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    await ensureCommentsSheet(sheets, spreadsheetId);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          slug.trim(),
          name.trim(),
          comment.trim(),
          'PENDING',
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error saving comment:', (error as Error).message);
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}
