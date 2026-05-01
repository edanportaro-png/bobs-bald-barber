import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

function escape(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json()

  if (!name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const safeName = escape(String(name))
  const safeEmail = escape(String(email))
  const safePhone = escape(String(phone))

  const { error } = await resend.emails.send({
    from: 'Bob\'s Bald Barber <onboarding@resend.dev>',
    to: process.env.OWNER_EMAIL!,
    subject: `New Lead: ${safeName}`,
    html: `
      <h2>New lead from your website</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email', detail: error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
