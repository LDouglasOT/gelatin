import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    /* ── basic server-side validation ── */
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
// romy@genesisbiotech.net
    const { error } = await resend.emails.send({
      from:    'Genesis Biotech Website <noreply@genesisbiotech.net>',  // must be a verified domain in Resend
      to:      ['romy@genesisbiotech.net'],
      replyTo: email,                                                    // reply goes straight back to the visitor
      subject: `[Gelatin Enquiry] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #080f09;">
          <div style="background: #2877A7; padding: 24px 32px;">
            <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 600;">
              New Enquiry — Genesis Biotech
            </h1>
          </div>

          <div style="padding: 32px; background: #f7f4ee; border: 1px solid #e8dfc8;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #555; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}" style="color: #2877A7;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #555; vertical-align: top;">Phone</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #555; vertical-align: top;">Subject</td>
                <td style="padding: 8px 0; font-weight: 600;">${subject}</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e8dfc8; margin: 20px 0;" />

            <p style="color: #555; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.1em;">
              Message
            </p>
            <p style="font-size: 15px; line-height: 1.7; white-space: pre-wrap; margin: 0;">
              ${message}
            </p>
          </div>

          <div style="padding: 16px 32px; background: #080f09; text-align: center;">
            <p style="color: rgba(255,255,255,.4); font-size: 11px; margin: 0;">
              Genesis Biotech · genesisbiotech.net
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}