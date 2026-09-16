import {NextResponse} from 'next/server';
import {cookieName,issueSession,sameOrigin,sessionSeconds,validToken} from '../../../owner';
export async function POST(request:Request){
  if(!sameOrigin(request))return new Response('Forbidden',{status:403});
  if(Number(request.headers.get('content-length'))>2048)return new Response('Request too large',{status:413});
  const data=await request.formData();
  const token=data.get('token');
  if(typeof token!=='string'||!validToken(token))return NextResponse.redirect(new URL('/admin?error=1',request.url),303);
  const response=NextResponse.redirect(new URL('/admin',request.url),303);
  response.cookies.set(cookieName,issueSession(),{httpOnly:true,secure:new URL(request.url).protocol==='https:',sameSite:'strict',path:'/',maxAge:sessionSeconds});
  response.headers.set('Cache-Control','no-store');
  return response;
}
