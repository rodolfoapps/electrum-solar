import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TEAM_EMAILS } from '@/lib/resend';

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

    // Send confirmation email to the sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'We received your message — Electrum Solar',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="background-color: #f59e0b; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Electrum Solar</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1f2937; margin-top: 0;">Thanks for reaching out, ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              We've received your message and will get back to you as soon as possible.
            </p>
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Your message:</p>
              <p style="color: #1f2937; margin: 0; line-height: 1.5;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af;">
            Electrum Solar &mdash; electrum.solar
          </div>
        </div>
      `,
    });

    // Send notification email to the team
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TEAM_EMAILS,
      subject: `New Contact: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="background-color: #1f2937; padding: 24px; text-align: center;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 24px;">New Contact Message</h1>
          </div>
          <div style="padding: 32px 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; width: 30%;">Name</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #d97706;">${email}</a></td>
              </tr>
            </table>
            <div style="margin-top: 20px; background-color: #f9fafb; border-radius: 8px; padding: 16px;">
              <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message:</p>
              <p style="color: #1f2937; margin: 0; line-height: 1.5;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Message sent successfully' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
