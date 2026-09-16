'use client';
import { useEffect, useState } from 'react';
import { kinds, type Entry } from '../content';
const blank = (): Entry => ({ id: crypto.randomUUID(), kind: 'notes', title: '', summary: '', body: '', url: '', attachment: '', published: 0, updated: new Date().toISOString() });
export default function Editor() {
    const [list, setList] = useState<Entry[]>([]), [current, setCurrent] = useState<Entry | null>(null), [message, setMessage] = useState(''), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [preview, setPreview] = useState(false), [dirty, setDirty] = useState(false);
    async function reload() { setLoading(true); try {
        const r = await fetch('/api/entries?all=1');
        const d = await r.json() as {
            entries: Entry[];
            error?: string;
        };
        if (!r.ok)
            throw new Error(d.error);
        setList(d.entries);
        setMessage('');
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : 'Could not load entries.');
    }
    finally {
        setLoading(false);
    } }
    useEffect(() => { void reload(); }, []);
    useEffect(() => { const warn = (e: BeforeUnloadEvent) => { if (dirty) {
        e.preventDefault();
        e.returnValue = '';
    } }; window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, [dirty]);
    function choose(e: Entry) { if (dirty && !window.confirm('Discard the unsaved changes to this entry?'))
        return; setCurrent({ ...e }); setDirty(false); setPreview(false); setMessage(''); }
    function update(field: keyof Entry, value: string | number) { setCurrent(old => old ? { ...old, [field]: value } : old); setDirty(true); }
    async function save() { if (!current)
        return; setBusy(true); setMessage(''); try {
        const r = await fetch('/api/entries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(current) });
        const d = await r.json() as {
            error?: string;
        };
        if (!r.ok)
            throw new Error(d.error);
        await reload();
        setDirty(false);
        setMessage(current.published ? 'Published. Visitors can now read this entry.' : 'Draft saved. Only you can see it.');
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : 'Could not save. Your text is still here.');
    }
    finally {
        setBusy(false);
    } }
    async function upload(file?: File) { if (!file)
        return; if (file.size > 4 * 1024 * 1024) {
        setMessage('The attachment limit is 4 MB. Link to larger files instead.');
        return;
    } setBusy(true); setMessage('Uploading…'); try {
        const r = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
        const d = await r.json() as {
            error?: string;
            url: string;
        };
        if (!r.ok)
            throw new Error(d.error);
        update('attachment', d.url);
        setMessage('Attachment ready. Save the entry to attach it.');
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : 'Upload failed.');
    }
    finally {
        setBusy(false);
    } }
    useEffect(() => { const context = (document as Document & {
        modelContext?: {
            registerTool: (tool: unknown, options: unknown) => void;
        };
    }).modelContext; if (!context)
        return; const abort = new AbortController(); try {
        context.registerTool({ name: 'stage_notebook_entry', description: 'Stage a new unpublished entry in the editor for review. Does not save or publish.', inputSchema: { type: 'object', properties: { title: { type: 'string' }, kind: { type: 'string', enum: Object.keys(kinds) } }, required: ['title', 'kind'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute: (input: unknown) => { const e = input as {
                title: string;
                kind: string;
            }; if (!e || typeof e.title !== 'string' || !e.title.trim() || e.title.length > 180 || !Object.hasOwn(kinds, e.kind))
                throw new Error('Valid title and section required.'); if (dirty)
                throw new Error('Save or discard the current changes first.'); setCurrent({ ...blank(), title: e.title, kind: e.kind }); setDirty(true); setPreview(false); return { staged: true, published: false }; } }, { signal: abort.signal });
    }
    catch { } return () => abort.abort(); }, [dirty]);
    return <main className="editor"><div className="editor-heading"><div><span className="eyebrow">PRIVATE / YOUR WORKING SPACE</span><h1>The editor<span className="orange">.</span></h1></div><form action="/api/auth/logout" method="post"><button className="quiet" type="submit">Sign out</button></form></div><p className="editor-intro">Add an article, experiment, book, video, hobby update, or social link. Save privately or publish when it is ready.</p><div className="editor-grid"><aside><button className="solid" onClick={() => choose(blank())} disabled={busy}>+ New entry</button><button className="quiet" onClick={reload} disabled={loading || busy}>Refresh entries</button>{loading ? <p>Loading your notebook…</p> : list.map(e => <button key={e.id} disabled={busy} className={'editor-item ' + (current?.id === e.id ? 'selected' : '')} onClick={() => choose(e)}><small>{kinds[e.kind]?.title} / {e.published ? 'PUBLISHED' : 'DRAFT'}</small><strong>{e.title}</strong></button>)}</aside><section className="editor-form">{message && <p className="notice" role="status">{message}</p>}{!current ? <div className="empty"><h2>Make room<br />for an <em>idea.</em></h2><p>Choose an entry to edit or start something new.</p></div> : <><div className="editor-actions"><button className="quiet" onClick={() => setPreview(!preview)}>{preview ? 'Back to editing' : 'Preview entry'}</button><span>{dirty ? 'Unsaved changes' : 'Saved state'}</span><button className="solid" disabled={busy || loading} onClick={save}>{busy ? 'Working…' : current.published ? 'Save & publish' : 'Save draft'}</button></div>{preview ? <article className="draft-preview"><span className="eyebrow">PREVIEW / {kinds[current.kind].title}</span><h2>{current.title || 'Untitled'}</h2><p className="lede">{current.summary}</p><div className="article-body">{current.body.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>{current.url && <p>Reference: {current.url}</p>}{current.attachment && <a href={current.attachment} target="_blank" rel="noopener noreferrer">Open attachment ↗</a>}</article> : <fieldset disabled={busy}><div className="form-columns"><label>Section<select value={current.kind} onChange={e => update('kind', e.target.value)}>{Object.entries(kinds).map(([k, v]) => <option value={k} key={k}>{v.title}</option>)}</select></label><label>Visibility<select value={current.published} onChange={e => update('published', Number(e.target.value))}><option value={0}>Draft — only me</option><option value={1}>Published — visitors</option></select></label></div><label>Title<input required maxLength={180} value={current.title} onChange={e => update('title', e.target.value)} placeholder="Give the idea a name"/></label><label>Short introduction<textarea rows={3} maxLength={600} value={current.summary} onChange={e => update('summary', e.target.value)} placeholder="What will someone discover here?"/></label><label>Entry<textarea className="body-input" rows={16} maxLength={100000} value={current.body} onChange={e => update('body', e.target.value)} placeholder="Write freely. Separate paragraphs with a blank line."/></label><label>{current.kind === 'social' ? 'Social profile URL' : 'Reference, video, or external link'}<input type="url" value={current.url} onChange={e => update('url', e.target.value)} placeholder="https://"/></label><label>Attachment · up to 4 MB<input type="file" accept="image/jpeg,image/png,image/webp,application/pdf,audio/mpeg,audio/wav,video/mp4,video/webm" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }}/></label>{current.attachment && <div className="attachment"><a href={current.attachment} target="_blank" rel="noopener noreferrer">Open attached file ↗</a><button type="button" className="quiet" onClick={() => update('attachment', '')}>Remove attachment</button></div>}<p className="small">To unpublish an entry, change its visibility to Draft and save. For larger videos, use an external link.</p></fieldset>}</>}</section></div></main>;
}
