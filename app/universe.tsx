'use client';

import {useEffect, useRef, useState} from 'react';
import './universe.css';
import './universe-fixes.css';

type Signal={code:string;name:string;verb:string;color:string;intro:string;detail:string;proof:string[];link?:{label:string;href:string}};
const signals:Signal[]=[
 {code:'01',name:'ABOUT',verb:'follow',color:'#ff5a36',intro:'I build things. Then I need to know why they work.',detail:'I’m Devarsh Patel—a software engineer with a habit of following questions across disciplines. Code is my craft; curiosity is the operating system.',proof:['Los Angeles ↔ Ahmedabad','M.S. Computer Science','Open to remote work']},
 {code:'02',name:'ENGINEERING + AI',verb:'build',color:'#c8ff3d',intro:'Systems should make complexity feel simple.',detail:'I work across interfaces, APIs, cloud infrastructure, data pipelines, and applied machine learning. I care about the entire path from an idea to a useful product.',proof:['React · Node.js · Python','AWS · ETL · Data','Predictive modeling'],link:{label:'See selected work',href:'/entry/streaming-platform'}},
 {code:'03',name:'CREATIVE WORK',verb:'shape',color:'#8db8ff',intro:'Some ideas need rhythm, not code.',detail:'Content creation, writing, video editing in DaVinci Resolve, and sound design are another way I make sense of things.',proof:['Words','Frames','Frequencies']},
 {code:'04',name:'WRITING + IDEAS',verb:'write',color:'#ffc2df',intro:'A place for thoughts that refuse to stay quiet.',detail:'Essays, observations, field notes, and unfinished ideas. This section will grow as I publish what I’m thinking through.',proof:['Essays','Field notes','Ideas in progress']},
 {code:'05',name:'INTERESTS',verb:'chase',color:'#ffcf55',intro:'The rabbit holes are part of the work.',detail:'Astronomy, Stoic philosophy, longevity, psychology, and human behavior. I like subjects that change the scale of the question.',proof:['Space + time','Mind + behavior','Living well']},
 {code:'06',name:'FLIGHT RECORD',verb:'learn from',color:'#9d8cff',intro:'Experience is a trail, not a title.',detail:'From internships in Ahmedabad to full-stack ownership in Los Angeles, each role expanded the size of the systems I could understand and build.',proof:['GEOFLIXZ+','KPITENG','LMU · Indus University'],link:{label:'Open résumé',href:'/resume.pdf'}},
 {code:'07',name:'CONNECT',verb:'share',color:'#72e6c5',intro:'Good things begin when two curious minds meet.',detail:'I’m looking for remote AI and software roles, and I’m open to thoughtful creative collaborations.',proof:['AI engineering','Software development','Creative projects'],link:{label:'Start a conversation',href:'mailto:pateldevarsh43@gmail.com'}}
];

export default function Universe(){
 const canvasRef=useRef<HTMLCanvasElement>(null),dialogRef=useRef<HTMLDialogElement>(null);
 const fieldRef=useRef<{focus:(index:number|null)=>void;freeze:(value:boolean)=>void;destroy:()=>void}|null>(null);
 const [active,setActive]=useState<number|null>(null),[hovered,setHovered]=useState<number|null>(null),[paused,setPaused]=useState(false),[loaded,setLoaded]=useState(false);
 const current=signals[hovered??active??0];
 useEffect(()=>{let cancelled=false;import('./restless-field').then(({createRestlessField})=>{if(cancelled||!canvasRef.current)return;fieldRef.current=createRestlessField(canvasRef.current,index=>setHovered(index));setLoaded(true);if(matchMedia('(prefers-reduced-motion: reduce)').matches){fieldRef.current.freeze(true);setPaused(true)}}).catch(()=>setLoaded(true));return()=>{cancelled=true;fieldRef.current?.destroy()}},[]);
 function inspect(index:number){setActive(index);setHovered(null);fieldRef.current?.focus(index);fieldRef.current?.freeze(true);dialogRef.current?.showModal()}
 function close(){dialogRef.current?.close();fieldRef.current?.focus(null);fieldRef.current?.freeze(paused)}
 return <div className="index-page">
  <canvas ref={canvasRef} className="index-field" aria-hidden="true"/><a className="index-skip" href="#signal-list">Skip animation</a>
  <header className="index-header"><a className="index-mark" href="/" aria-label="Devarsh Patel, home"><span>DP</span><small>THE RESTLESS<br/>MIND INDEX</small></a><p className="index-status"><i/>{loaded?'FIELD ONLINE':'CALIBRATING'}</p><nav><a href="/resume.pdf" target="_blank" rel="noreferrer">RÉSUMÉ ↗</a><a href="mailto:pateldevarsh43@gmail.com">CONTACT ↗</a></nav></header>
  <main className="index-main">
   <section className="index-thesis" aria-labelledby="index-title"><p className="index-kicker">DEVARSH PATEL / SOFTWARE ENGINEER / PERPETUALLY CURIOUS</p><h1 id="index-title">I collect<br/><em>questions.</em></h1><p className="index-declaration">Then I <strong style={{color:current.color}}>{current.verb}</strong> them<br/>until they become something.</p><button className="index-enter" onClick={()=>inspect(0)}>BEGIN WITH ME <span>↗</span></button></section>
   <section className="signal-orbit" id="signal-list" aria-label="Portfolio categories"><p className="orbit-note">MOVE THROUGH THE FIELD<br/>SELECT A SIGNAL TO DECODE</p>{signals.map((signal,index)=><button key={signal.code} className={`signal signal-${index+1}`} style={{'--signal':signal.color} as React.CSSProperties} onPointerEnter={()=>{setHovered(index);fieldRef.current?.focus(index)}} onPointerLeave={()=>{setHovered(null);fieldRef.current?.focus(null)}} onFocus={()=>{setHovered(index);fieldRef.current?.focus(index)}} onBlur={()=>{setHovered(null);fieldRef.current?.focus(null)}} onClick={()=>inspect(index)}><span>{signal.code}</span><strong>{signal.name}</strong><i>+</i></button>)}</section>
   <aside className="index-readout" aria-live="polite" style={{'--signal':current.color} as React.CSSProperties}><span>{current.code} / SIGNAL DETECTED</span><strong>{current.name}</strong><p>{current.intro}</p></aside>
  </main>
  <footer className="index-footer"><p>THE FIELD RESPONDS TO YOU.</p><button aria-pressed={paused} onClick={()=>{const next=!paused;setPaused(next);fieldRef.current?.freeze(next)}}>{paused?'PLAY FIELD':'PAUSE FIELD'} {paused?'▶':'Ⅱ'}</button><p>LOS ANGELES ↔ AHMEDABAD <span>© 2026</span></p></footer>
  <dialog ref={dialogRef} className="evidence" onClose={close} onClick={event=>{if(event.target===dialogRef.current)close()}}>{active!==null&&<div style={{'--signal':signals[active].color} as React.CSSProperties}><button className="evidence-close" onClick={close} aria-label="Close signal">CLOSE ×</button><p className="evidence-code">SIGNAL {signals[active].code} / DECODED</p><h2>{signals[active].name}</h2><blockquote>{signals[active].intro}</blockquote><p className="evidence-detail">{signals[active].detail}</p><div className="evidence-proof">{signals[active].proof.map(item=><span key={item}>{item}</span>)}</div>{signals[active].link&&<a className="evidence-link" href={signals[active].link.href}>{signals[active].link.label} <span>↗</span></a>}<div className="evidence-nav"><button disabled={active===0} onClick={()=>{const next=active-1;setActive(next);fieldRef.current?.focus(next)}}>← PREVIOUS</button><b>{String(active+1).padStart(2,'0')} / 07</b><button disabled={active===6} onClick={()=>{const next=active+1;setActive(next);fieldRef.current?.focus(next)}}>NEXT →</button></div></div>}</dialog>
 </div>
}
