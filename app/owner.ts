import {cookies} from 'next/headers';
import {createHash,createHmac,timingSafeEqual} from 'node:crypto';

export const cookieName='portfolio_editor';
export const sessionSeconds=8*60*60;
export function adminConfigured(){return (process.env.PORTFOLIO_ADMIN_TOKEN?.length??0)>=32}
function signingKey(){return process.env.PORTFOLIO_ADMIN_TOKEN??''}
export function validToken(token:string){
  if(!adminConfigured()||token.length>256)return false;
  return timingSafeEqual(createHash('sha256').update(token).digest(),createHash('sha256').update(signingKey()).digest());
}
export function issueSession(){const expires=String(Math.floor(Date.now()/1000)+sessionSeconds);return `${expires}.${createHmac('sha256',signingKey()).update('portfolio-session:'+expires).digest('hex')}`}
export function validSession(session:string){
  if(!adminConfigured()||!/^\d{10}\.[a-f0-9]{64}$/.test(session))return false;
  const [expires,signature]=session.split('.');
  const expiry=Number(expires),now=Math.floor(Date.now()/1000);
  if(expiry<=now||expiry>now+sessionSeconds)return false;
  const expected=createHmac('sha256',signingKey()).update('portfolio-session:'+expires).digest();
  return timingSafeEqual(Buffer.from(signature,'hex'),expected);
}
export async function isOwner(){return validSession((await cookies()).get(cookieName)?.value??'')}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin}
