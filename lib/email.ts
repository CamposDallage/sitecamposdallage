// @ts-ignore
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  secure: false,
  auth: { user: 'resend', pass: process.env.RESEND_API_KEY || '' }
});

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    if (process.env.EMAIL_ENABLED === 'false') return true;
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL || 'CamposDallage <contact@camposdallage.com>',
      to, subject, html
    });
    return true;
  } catch (e) {
    console.error('[EMAIL]', e);
    return false;
  }
}

export async function sendQuoteEmail(prospect: any, quote: any, url: string) {
  const html = '<div style="font-family:sans-serif;max-width:600px;margin:0 auto">' +
    '<div style="background:#2d384b;color:white;padding:30px;text-align:center"><h1>CamposDallage</h1></div>' +
    '<div style="padding:30px">' +
    '<p>Bonjour ' + prospect.firstName + ',</p>' +
    '<p>Votre estimation provisoire :</p>' +
    '<div style="background:#f5f7f9;padding:20px;margin:20px 0">' +
    '<p><strong>Prestation :</strong> ' + quote.prestation + '</p>' +
    '<p><strong>Surface :</strong> ' + quote.surface + ' m²</p>' +
    '<p style="font-size:24px;color:#c27a30;font-weight:bold">Total TTC : ' + quote.totalTtc.toFixed(2) + ' €</p>' +
    '</div>' +
    '<p style="background:#fef3c7;padding:15px">Estimation indicative. Prix définitif confirmé après étude du projet.</p>' +
    '<a href="' + url + '" style="display:inline-block;background:#c27a30;color:white;padding:14px 28px;text-decoration:none;border-radius:6px">Consulter mon estimation</a>' +
    '</div></div>';
  return sendEmail(prospect.email, 'Votre estimation CamposDallage', html);
}

export async function sendAdminNotification(prospect: any, quote: any) {
  const html = '<h2>NOUVELLE DEMANDE DE DEVIS</h2>' +
    '<p><strong>Client :</strong> ' + prospect.firstName + ' ' + prospect.lastName + '</p>' +
    '<p><strong>Téléphone :</strong> ' + prospect.phone + '</p>' +
    '<p><strong>Email :</strong> ' + prospect.email + '</p>' +
    '<p><strong>Prestation :</strong> ' + quote.prestation + '</p>' +
    '<p><strong>Surface :</strong> ' + quote.surface + ' m²</p>' +
    '<p><strong>Estimation TTC :</strong> ' + quote.totalTtc.toFixed(2) + ' €</p>';
  return sendEmail(process.env.ADMIN_EMAIL || 'admin@camposdallage.com', 'Nouveau devis - ' + prospect.firstName, html);
}