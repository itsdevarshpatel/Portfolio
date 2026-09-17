import './editorial.css';

export default function Home() {
  return (
    <div className="folio">
      <a className="folio-skip" href="#main-content">Skip to content</a>
      <header className="folio-nav">
        <a className="folio-name" href="#">Devarsh Patel<span aria-hidden="true">✳</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a>
          <a className="folio-pill" href="mailto:pateldevarsh43@gmail.com">Say hello <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="main-content">
        <section className="folio-hero" aria-labelledby="intro-title">
          <p className="folio-label">SOFTWARE ENGINEER · CREATIVE MIND</p>
          <h1 id="intro-title">Built with logic.<br />Led by <em>curiosity.</em></h1>
          <p className="folio-lede">I’m Devarsh. I build software, explore AI, and make room for the unexpected.</p>
          <a className="folio-pill folio-primary" href="#work">A little of my work <span aria-hidden="true">↓</span></a>
        </section>
        <figure className="folio-landscape">
          <img src="/editorial-meadow.png" alt="Wind moving through a sunlit meadow beneath a distant tree." width="1536" height="1024" fetchPriority="high" />
          <svg className="folio-thread" viewBox="0 0 1200 340" aria-hidden="true"><defs><path id="curiosity-path" d="M -40 230 C 250 40 420 360 700 200 S 1050 10 1270 100" /></defs><text><textPath href="#curiosity-path" startOffset="8%">follow a question · find a connection · make something meaningful ·</textPath></text></svg>
          <figcaption>A little space to think.</figcaption>
        </figure>
        <section className="folio-work" id="work" aria-labelledby="work-title">
          <div className="folio-section-heading"><p className="folio-label">01 / SELECTED WORK</p><span>Engineering, from end to end.</span></div>
          <div className="folio-project">
            <div><p className="folio-label">GEOFLIXZ+ · FULL-STACK DEVELOPMENT</p><h2 id="work-title">Behind the<br /><em>play button.</em></h2></div>
            <div className="folio-project-copy"><p>A streaming experience, from the interface people see to the APIs, cloud infrastructure, and data behind it.</p><p className="folio-tools">React / Node.js / Python / AWS</p><a className="folio-text-link" href="/entry/streaming-platform">Read the short story <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
        <section className="folio-about" id="about" aria-labelledby="about-title">
          <p className="folio-label">02 / A LITTLE ABOUT ME</p>
          <div><h2 id="about-title">Technical by trade.<br /><em>Curious</em> by nature.</h2><p>I work across software, data, and AI. Away from code, that same curiosity finds its way into writing, video editing, and sound design.</p><a className="folio-text-link" href="/resume.pdf" target="_blank" rel="noreferrer">My résumé <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>
      <footer className="folio-footer">
        <div className="folio-footer-top"><div><p className="folio-label">OPEN TO REMOTE AI & SOFTWARE ROLES</p><h2>Something in mind?<br /><em>Let’s talk.</em></h2></div><a className="folio-pill folio-primary" href="mailto:pateldevarsh43@gmail.com">Say hello <span aria-hidden="true">↗</span></a></div>
        <div className="folio-footer-bottom"><span>© {new Date().getFullYear()} Devarsh Patel</span><div><a href="https://www.linkedin.com/in/devarsh-p-3b005b22a/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/itsdevarshpatel" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:pateldevarsh43@gmail.com">Email ↗</a></div></div>
      </footer>
    </div>
  );
}
