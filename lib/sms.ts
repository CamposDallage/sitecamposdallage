import twilio from 'twilio';

let client: any = null;
function getClient() {
  if (!client && process.env.TWILIO_ACCOUNT_SID) {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return client;
}

export async function sendSms(to: string, body: string): Promise<boolean> {
  try {
    if (process.env.SMS_ENABLED === 'false') return true;
    const c = getClient();
    if (!c) return false;
    await c.messages.create({ body, from: process.env.TWILIO_PHONE_NUMBER, to });
    return true;
  } catch (e) {
    console.error('[SMS]', e);
    return false;
  }
}

export async function sendQuoteSms(firstName: string, phone: string, url: string) {
  return sendSms(phone, 'Bonjour ' + firstName + ', votre estimation CamposDallage est prête : ' + url);
}

export async function sendAppointmentSms(firstName: string, phone: string, date: Date, type: string) {
  const d = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(date);
  return sendSms(phone, 'Bonjour ' + firstName + ', votre ' + type + ' CamposDallage est confirmé le ' + d + '.');
}
