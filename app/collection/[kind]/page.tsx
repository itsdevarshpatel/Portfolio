import { notFound } from 'next/navigation';
import { entries } from '../../store';
import { kinds } from '../../content';
import { Header, Footer } from '../../chrome';
export const dynamic = 'force-dynamic';
export default async function Collection({ params }: {
    params: Promise<{
        kind: string;
    }>;
}) { const { kind } = await params; const info = kinds[kind]; if (!info || kind === 'social')
    notFound(); let items: Awaited<ReturnType<typeof entries>> = []; let error = false; try {
    items = (await entries()).filter(e => e.kind === kind);
}
catch {
    error = true;
} return <><Header /><main className="collection"><a className="eyebrow" href="/#notebook">← BACK TO THE NOTEBOOK</a><h1>{info.title}<span className="orange">.</span></h1><p className="lede">{info.description}</p>{kind === 'studio' && <div className="practice"><span>CONTENT & TECHNICAL WRITING</span><span>DAVINCI RESOLVE</span><span>SOUND DESIGN</span><a className="textlink" href="mailto:pateldevarsh43@gmail.com?subject=Creative%20project">Discuss a creative project ↗</a></div>}{error ? <p role="alert" className="empty">The notebook is temporarily unavailable. Please try again shortly.</p> : items.length ? items.map((e, i) => <a className="entry-row" key={e.id} href={'/entry/' + e.id}><span className="eyebrow">{String(i + 1).padStart(2, '0')}</span><div><h2>{e.title}</h2><p>{e.summary}</p></div><span aria-hidden>↗</span></a>) : <div className="empty"><span className="eyebrow">A LITTLE ROOM FOR WHAT'S NEXT</span><h2>{kind === 'shelf' ? 'The first entry is still ahead.' : kind === 'studio' ? 'The work will live here.' : 'Nothing published just yet.'}</h2><p>{kind === 'shelf' ? 'Reading notes, papers, and the ideas that stay with me.' : kind === 'studio' ? 'For writing, editing, or sound design inquiries, get in touch.' : 'This corner of the notebook is waiting for its first entry.'}</p><a className="textlink" href="/collection/lab">Meanwhile, explore the Lab ↗</a></div>}<div className="collection-links">{Object.entries(kinds).filter(([key]) => key !== kind && key !== 'social' && key !== 'work').map(([key, v]) => <a href={'/collection/' + key} key={key}>{v.title} ↗</a>)}</div></main><Footer /></>; }
