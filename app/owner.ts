import { getChatGPTUser } from './chatgpt-auth';
import { env } from 'cloudflare:workers';
export async function isOwner() { const user = await getChatGPTUser(); if (!user)
    return false; return user.email.toLowerCase() === (env.OWNER_EMAIL ?? 'pateldevarsh43@gmail.com').toLowerCase() || (process.env.NODE_ENV === 'development' && user.userId === 'local_seedy'); }
export function sameOrigin(request: Request) { const origin = request.headers.get('origin'); return !!origin && origin === new URL(request.url).origin; }
