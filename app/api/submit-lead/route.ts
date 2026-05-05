import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

function escape(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json()

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const safeName = escape(String(name))
    const safeEmail = escape(String(email))
    const safePhone = escape(String(phone))

    // Notify Bob
    const { error: ownerError } = await resend.emails.send({
      from: 'Bob\'s Bald Barber <hello@grpc.biz>',
      to: process.env.OWNER_EMAIL!,
      subject: `New Lead: ${safeName}`,
      html: `
        <h2>New lead from your website</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
      `,
    })

    if (ownerError) {
      console.error('Owner email error:', ownerError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Confirm to the lead — runs independently so a bad lead email doesn't block Bob's notification
    await resend.emails.send({
      from: 'Bob\'s Bald Barber <hello@grpc.biz>',
      to: String(email),
      subject: 'You\'re on Bob\'s list!',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out to Bob's Bald Barber! Bob will be in touch shortly to book your visit.</p>
        <p><strong>Get Ready to GET BALD - Because BALD is Beautiful!</strong></p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: 'Unexpected error', detail: msg }, { status: 500 })
  }
}
