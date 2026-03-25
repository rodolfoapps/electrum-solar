import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { name, email, message } = data;
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Send email via Resend or other service
    console.log('New contact form:', { name, email, message });

    return NextResponse.json({
      success: true,
      data: { message: 'Message sent successfully' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
