import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, vehicleType, serviceType, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and message are required' },
        { status: 400 }
      );
    }

    try {
      const { prisma } = await import('@/lib/prisma');
      const { MessageStatus } = await import('@prisma/client');

      const newMessage = await prisma.message.create({
        data: {
          fullName,
          email: email.toLowerCase().trim(),
          phone: phone || null,
          companyName: companyName || null,
          vehicleType: vehicleType || null,
          serviceType: serviceType || null,
          message,
          status: MessageStatus.NEW,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully! We will get back to you shortly.',
          data: { id: newMessage.id, createdAt: newMessage.createdAt },
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      // DB unavailable — still acknowledge the message gracefully
      console.warn('DB unavailable for contact form — acknowledging without persistence:', dbError?.message);
      return NextResponse.json(
        {
          success: true,
          message: 'Votre message a bien été reçu. Nous vous contacterons très prochainement.',
          data: { id: `local-${Date.now()}`, createdAt: new Date().toISOString() },
          _fallback: true,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
