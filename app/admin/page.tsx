import { requireChatGPTUser } from '../chatgpt-auth';
import { isOwner } from '../owner';
import Editor from './editor';
import { Header } from '../chrome';
export const dynamic = 'force-dynamic';
export default async function Admin() { await requireChatGPTUser('/admin'); if (!await isOwner())
    return <><Header /><main className="collection"><h1>Private notebook.</h1><p>The editor is available only to Devarsh's authorized account.</p><a className="textlink" href="/signout-with-chatgpt?return_to=/admin" target="_top">Switch account</a></main></>; return <><Header /><Editor /></>; }
