import nodemailer from "nodemailer"

interface SendOptions {
  to: string
  subject: string
  html: string
  from?: string
}

async function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  // If SMTP env vars are present, use them. Otherwise fall back to Ethereal test account for dev.
  if (host && user && pass) {
    // Improve defaults for common providers (Gmail): prefer secure when port 465
    const isGmail = host.includes("gmail") || host.includes("googlemail")
    const secure = port === 465 || isGmail
    const transportOptions: any = {
      host,
      port: port || (secure ? 465 : 587),
      secure,
      auth: { user, pass },
    }

    // For STARTTLS (port 587) require TLS
    if (!secure) transportOptions.requireTLS = true

    return nodemailer.createTransport(transportOptions)
  }

  // Create ethereal test account for development if SMTP not configured
  const testAccount = await nodemailer.createTestAccount()
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  })
}

export async function sendMail({ to, subject, html, from }: SendOptions) {
  try {
    const transporter = await createTransporter()

    const defaultFrom = process.env.FROM_EMAIL || (process.env.SMTP_USER ? `"Audiophile" <${process.env.SMTP_USER}>` : `"No Reply" <no-reply@${process.env.SMTP_HOST || "example.com"}>`)

    const info = await transporter.sendMail({ from: from || defaultFrom, to, subject, html })

    // If using ethereal, expose preview URL for debugging
    const previewUrl = (nodemailer.getTestMessageUrl && nodemailer.getTestMessageUrl(info)) || null
    return { success: true, info, previewUrl }
  } catch (err) {
    console.error('sendMail error:', err)
    return { success: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export default sendMail
