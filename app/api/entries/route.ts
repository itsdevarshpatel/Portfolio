import { entries, database } from '../../store';
import { isOwner, sameOrigin } from '../../owner';
import { kinds } from '../../content';
export async function GET(request: Request) { const all = new URL(request.url).searchParams.get('all') === '1'; if (all && !await isOwner())
    return Response.json({ error: 'Editor access required.' }, { status: 403 }); try {
    return Response.json({ entries: await entries(all) }, { headers: { 'Cache-Control': 'no-store' } });
}
catch (error) {
    console.error(error);
    return Response.json({ error: 'The notebook is temporarily unavailable. Please try again.' }, { status: 503 });
} }
export async function POST(request: Request) { if (!await isOwner() || !sameOrigin(request))
    return Response.json({ error: 'Editor access required.' }, { status: 403 }); try {
    const raw = await request.text();
    if (raw.length > 120000)
        return Response.json({ error: 'This entry is too long.' }, { status: 413 });
    const e = JSON.parse(raw);
    if (!e || typeof e !== 'object' || Array.isArray(e))
        throw new Error('Invalid entry');
    for (const k of ['id', 'kind', 'title', 'summary', 'body', 'url', 'attachment'])
        if (typeof e[k] !== 'string')
            throw new Error('Invalid ' + k);
    if (!/^[a-zA-Z0-9-]{1,80}$/.test(e.id) || !Object.hasOwn(kinds, e.kind) || !e.title.trim() || e.title.length > 180 || e.summary.length > 600 || e.body.length > 100000 || e.url.length > 2000 || ![0, 1].includes(e.published))
        throw new Error('Please check the title, section, and entry length.');
    if (e.kind === 'social' && !e.url)
        throw new Error('Add a social profile URL.');
    if (e.url && new URL(e.url).protocol !== 'https:')
        throw new Error('External links must use https://');
    if (e.attachment && !/^\/api\/media\/[a-f0-9-]{36}$/.test(e.attachment))
        throw new Error('Please use an uploaded attachment.');
    await database().prepare('INSERT INTO entries (id,kind,title,summary,body,url,attachment,published,updated) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET kind=excluded.kind,title=excluded.title,summary=excluded.summary,body=excluded.body,url=excluded.url,attachment=excluded.attachment,published=excluded.published,updated=excluded.updated').bind(e.id, e.kind, e.title.trim(), e.summary, e.body, e.url, e.attachment, e.published, new Date().toISOString()).run();
    return Response.json({ ok: true });
}
catch (error) {
    console.error(error);
    return Response.json({ error: error instanceof SyntaxError ? 'Invalid entry.' : error instanceof Error && !error.message.includes('D1') ? error.message : 'Could not save. Your text is still here; please try again.' }, { status: 400 });
} }
