import {adminConfigured,isOwner} from '../owner';
import {storageConfigured} from '../store';
import Editor from './editor';
import {Header} from '../chrome';
export const dynamic='force-dynamic';
export default async function Admin({searchParams}:{searchParams:Promise<{error?:string}>}){
  const params=await searchParams;
  if(!adminConfigured())return <><Header/><main className="collection"><h1>A private<br/>working space.</h1><p>The owner must finish configuring editor access before sign-in is available.</p><a className="textlink" href="/">Back to the notebook ↗</a></main></>;
  if(!await isOwner())return <><Header/><main className="collection"><span className="eyebrow">PRIVATE / NOTEBOOK EDITOR</span><h1>Welcome back.</h1><p>Use your private editor access key to continue.</p>{params.error&&<p role="alert">That access key was not accepted.</p>}<form action="/api/auth/login" method="post" className="editor-form" style={{maxWidth:480}}><label>Editor access key<input type="password" name="token" required minLength={32} maxLength={256} autoComplete="current-password"/></label><button className="solid" type="submit">Open the editor</button></form></main></>;
  if(!storageConfigured())return <><Header/><main className="collection"><h1>One connection<br/>left.</h1><p>Connect a private Vercel Blob store to this project to save entries and attachments.</p><a href="/">Back to the notebook</a></main></>;
  return <><Header/><Editor/></>;
}
