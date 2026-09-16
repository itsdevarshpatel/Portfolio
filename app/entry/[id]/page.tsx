import { notFound } from 'next/navigation';
import { entries } from '../../store';
import { kinds } from '../../content';
import { Header, Footer } from '../../chrome';
export const dynamic = 'force-dynamic';
export default async function EntryPage({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const { id } = await params; let all; try {
    all = await entries();
}
catch {
    return <><Header /><main className="collection"><h1>Back shortly.</h1><p>The notebook is temporarily unavailable. Please try again.</p><a href="/">Return home</a></main></>;
} const e = all.find(x => x.id === id); if (!e || e.kind === 'social')
    notFound(); const related = all.filter(x => x.id !== id && x.kind !== 'social').slice(0, 2); return <><Header /><main className="article"><a className="eyebrow" href={'/collection/' + e.kind}>← {kinds[e.kind].title.toUpperCase()}</a><h1>{e.title}</h1><p className="lede">{e.summary}</p><div className="byline">DEVARSH PATEL · {new Date(e.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {Math.max(1, Math.ceil(e.body.split(/\s+/).length / 200))} MIN READ</div><div className="article-body">{e.body.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>{e.url && <a className="textlink" href={e.url} target="_blank" rel="noopener noreferrer">Open the reference ↗</a>}{e.attachment && <p><a className="textlink" href={e.attachment} target="_blank" rel="noopener noreferrer">Open attachment ↗</a></p>}<aside className="read-next"><span className="eyebrow">KEEP THE THREAD GOING</span>{related.map(r => <a key={r.id} href={'/entry/' + r.id}>{r.title} ↗</a>)}</aside></main><Footer /></>; }
