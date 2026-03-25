import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { firstName, lastName, email, phone, zipCode } = data;
    if (!firstName || !lastName || !email || !phone || !zipCode) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Store lead in database and/or send to CRM
    // For now, log and return success
    console.log('New quote request:', {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      zipCode,
      state: data.state,
      propertyType: data.propertyType,
      monthlyBill: data.monthlyBill,
      roofType: data.roofType,
      timeline: data.timeline,
      sourcePage: data.sourcePage,
    });

    return NextResponse.json({
      success: true,
      data: { leadId: Date.now(), message: 'Quote request received successfully' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
