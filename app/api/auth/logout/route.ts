import {NextResponse} from 'next/server';
import {cookieName,sameOrigin} from '../../../owner';
export async function POST(request:Request){
  if(!sameOrigin(request))return new Response('Forbidden',{status:403});
  const response=NextResponse.redirect(new URL('/',request.url),303);
  response.cookies.set(cookieName,'',{httpOnly:true,secure:new URL(request.url).protocol==='https:',sameSite:'strict',path:'/',maxAge:0});
  return response;
}
