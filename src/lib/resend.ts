import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = 'Electrum Solar <noreply@electrum.solar>';
export const TEAM_EMAILS = ['kitch@electrum.solar', 'rodolfov@dmragency.com'];
