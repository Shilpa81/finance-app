import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendSmsNotification(phone: string, name: string) {
  const apiKey = process.env.TEXTBELT_API_KEY?.trim();

  if (!apiKey || !phone) {
    return { sent: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        message: `New lead from ${name}. Please review the form submission.`,
        key: apiKey,
      }),
    });

    const payload = await response.json().catch(() => ({}));

    return {
      sent: response.ok && payload?.success !== false,
      reason: response.ok && payload?.success !== false ? 'sent' : payload?.error || 'failed',
    };
  } catch (error) {
    console.warn('[contact] SMS notification failed', error);
    return { sent: false, reason: 'failed' };
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json().catch(() => ({}))) as ContactPayload;
    const name = String(payload.name ?? '').trim();
    const email = String(payload.email ?? '').trim();
    const phone = String(payload.phone ?? '').trim();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const normalizedPhone = phone.replace(/[^\d+]/g, '').trim();
    if (phone && normalizedPhone.length < 8) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    const ownerEmail = process.env.NOTIFY_EMAIL?.trim() || process.env.GMAIL_USER?.trim();
    const hasSmtpConfig = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && ownerEmail);

    if (!hasSmtpConfig) {
      console.info('[contact] Gmail SMTP is not configured. Skipping email delivery.');
      const smsResult = phone ? await sendSmsNotification(normalizedPhone || phone, name) : { sent: false, reason: 'no-phone' };

      return NextResponse.json({
        success: true,
        emailSent: false,
        sms: smsResult,
        message: 'Your details were received. Configure Gmail SMTP in your environment to send email notifications.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"ProsperPath Form" <${process.env.GMAIL_USER}>`,
      to: ownerEmail,
      subject: `📬 New Lead: ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;background:#f5f8ff;border-radius:12px;overflow:hidden;border:1px solid #d0dff0;">
          <div style="background:#0d1e3a;padding:24px 28px;">
            <h2 style="color:#e0ecff;margin:0;font-size:20px;">🏦 New Contact Form Submission</h2>
            <p style="color:#5a7ab5;margin:6px 0 0;font-size:13px;">ProsperPath — nainfinancials.com</p>
          </div>
          <div style="padding:28px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #dde8f5;color:#666;font-size:13px;width:120px;font-weight:600;">Full Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #dde8f5;color:#111;font-size:14px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #dde8f5;color:#666;font-size:13px;font-weight:600;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #dde8f5;font-size:14px;">
                  <a href="mailto:${escapeHtml(email)}" style="color:#378ADD;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666;font-size:13px;font-weight:600;">Phone</td>
                <td style="padding:10px 0;color:#111;font-size:14px;">${escapeHtml(phone || '—')}</td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:10px 22px;background:#378ADD;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
                Reply to ${escapeHtml(name)} →
              </a>
            </div>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"ProsperPath" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;background:#f5f8ff;border-radius:12px;overflow:hidden;border:1px solid #d0dff0;">
          <div style="background:#0d1e3a;padding:24px 28px;">
            <h2 style="color:#e0ecff;margin:0;font-size:20px;">🏦 ProsperPath</h2>
          </div>
          <div style="padding:28px;">
            <h3 style="color:#1a1a2e;margin:0 0 12px;">Hi ${escapeHtml(name.split(' ')[0])},</h3>
            <p style="color:#444;line-height:1.7;margin:0 0 16px;">
              Thank you for reaching out to ProsperPath. We have received your information and a licensed advisor will contact you shortly.
            </p>
            <p style="color:#444;line-height:1.7;margin:0 0 24px;">
              In the meantime, feel free to explore our product guide to learn more about what we offer.
            </p>
            <a href="https://nainfinancials.com/products" style="display:inline-block;padding:10px 22px;background:#378ADD;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
              Explore Products →
            </a>
            <p style="margin-top:28px;font-size:12px;color:#aaa;">
              ProsperPath · If you did not submit this form, please ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    const smsResult = phone ? await sendSmsNotification(normalizedPhone || phone, name) : { sent: false, reason: 'no-phone' };

    return NextResponse.json({
      success: true,
      emailSent: true,
      sms: smsResult,
    });
  } catch (error: unknown) {
    console.error('[contact route error]', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
