import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TEAM_EMAILS } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { propertyType, fullAddress, averageEnergyBill, firstName, lastName, phone, email, homeowner } = data;
    if (!propertyType || !fullAddress || !averageEnergyBill || !firstName || !lastName || !phone || !email || !homeowner) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const projectDescription = data.projectDescription || 'None provided';

    // Send confirmation email to the lead
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'We received your solar quote request — Electrum Solar',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="background-color: #f59e0b; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Electrum Solar</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1f2937; margin-top: 0;">Thanks for your interest, ${firstName}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              We've received your solar quote request and a member of our team will be in touch within 24 hours to discuss your project.
            </p>
            <h3 style="color: #1f2937; margin-top: 24px;">What you submitted:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; width: 40%;">Property Type</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${propertyType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Address</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${fullAddress}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Avg. Energy Bill</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${averageEnergyBill}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Homeowner</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${homeowner}</td>
              </tr>
            </table>
            <p style="color: #4b5563; line-height: 1.6; margin-top: 24px;">
              If you have any questions in the meantime, simply reply to this email.
            </p>
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
      subject: `New Lead: ${fullName} — ${propertyType} in ${fullAddress}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="background-color: #1f2937; padding: 24px; text-align: center;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 24px;">New Quote Request</h1>
          </div>
          <div style="padding: 32px 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; width: 40%;">Name</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #d97706;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Phone</td>
                <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #d97706;">${phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Property Type</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${propertyType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Address</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${fullAddress}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Avg. Energy Bill</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${averageEnergyBill}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280;">Homeowner</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600;">${homeowner}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Project Description</td>
                <td style="padding: 10px 0; color: #1f2937;">${projectDescription}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
              Source page: ${data.sourcePage || 'N/A'}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: { leadId: Date.now(), message: 'Quote request received successfully' },
    });
  } catch (err) {
    console.error('Quote submission error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
