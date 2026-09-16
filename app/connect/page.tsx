import { entries } from '../store';
import { Header, Footer } from '../chrome';
export const dynamic = 'force-dynamic';
export default async function Connect() { let socials: Awaited<ReturnType<typeof entries>>; try {
    socials = (await entries()).filter(x => x.kind === 'social');
}
catch {
    socials = [];
} return <><Header /><main className="collection"><span className="eyebrow">AROUND THE INTERNET</span><h1>Let's <em>connect.</em></h1><p className="lede">For remote engineering opportunities, creative projects,<br />or a conversation worth having.</p><a className="entry-row" href="mailto:pateldevarsh43@gmail.com"><span className="eyebrow">01</span><div><h2>Email</h2><p>pateldevarsh43@gmail.com</p></div><span>↗</span></a>{socials.map((s, i) => <a className="entry-row" key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"><span className="eyebrow">{String(i + 2).padStart(2, '0')}</span><div><h2>{s.title}</h2><p>{s.summary}</p></div><span>↗</span></a>)}<p><a className="textlink" href="/resume.pdf">Download my resume ↗</a></p></main><Footer /></>; }
