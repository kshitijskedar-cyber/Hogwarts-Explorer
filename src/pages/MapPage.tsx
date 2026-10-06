import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Lock, MapPin, Search, Sparkles, ZoomIn, ZoomOut, X } from 'lucide-react'
import { LOCATIONS, CHALLENGES, Loc } from '../data'
import { useStore } from '../store'
export default function MapPage(){const s=useStore();const nav=useNavigate()
 const [sel,setSel]=useState<Loc|null>(null);const [q,setQ]=useState('');const [cat,setCat]=useState('All');const [z,setZ]=useState(1)
 const shown=LOCATIONS.filter(l=>!l.secret||s.secrets.length)
 const status=(l:Loc)=>l.secret&&!s.secrets.includes('symbol')?'Secret':s.done.includes(l.challengeId)?'Discovered':s.visited.includes(l.id)?'Visited':l.secret?'Discovered':l.requires&&!s.visited.includes(l.requires)?'Locked':'Available'
 const cats=['All',...Array.from(new Set(shown.map(l=>l.cat)))]
 const match=(l:Loc)=>(cat==='All'||l.cat===cat)&&l.name.toLowerCase().includes(q.toLowerCase())
 const col:Record<string,string>={Locked:'#64748b',Available:'#e6c878',Visited:'#62d7a5',Discovered:'#b39aff',Secret:'#f08b67'}
 return <div className="max-w-7xl mx-auto px-4 py-6 md:py-9">
  <div className="flex flex-wrap gap-3 items-end justify-between"><div><p className="text-xs tracking-[.24em] uppercase text-gold">The grounds & hidden places</p><h1 className="text-4xl md:text-5xl font-bold mt-1">Hogwarts Castle</h1></div>
   <p className="text-sm text-gold bg-gold/10 border border-gold/20 rounded-full px-4 py-2">{s.visited.length} / {LOCATIONS.length-(s.secrets.length?0:1)} explored</p></div>
  <p className="text-slate-300 mt-2 max-w-2xl">Choose a glowing landmark to uncover its story. New paths open as you explore.</p>
  <div className="flex flex-wrap gap-2 mt-3"><label className="relative"><Search size={14} className="absolute left-3 top-3.5 text-slate-400"/><input aria-label="Search locations" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="pl-8 bg-deep border border-gold/30 rounded-lg min-h-[44px] px-3"/></label>
   <select aria-label="Filter" value={cat} onChange={e=>setCat(e.target.value)} className="bg-deep border border-gold/30 rounded-lg min-h-[44px] px-3">{cats.map(c=><option key={c}>{c}</option>)}</select>
   <button className="btn btn-ghost" aria-label="Zoom in" onClick={()=>setZ(Math.min(1.6,z+.2))}><ZoomIn size={16}/></button><button className="btn btn-ghost" aria-label="Zoom out" onClick={()=>setZ(Math.max(1,z-.2))}><ZoomOut size={16}/></button></div>
  <div className="mt-5">
   <div className="map-board relative overflow-hidden rounded-2xl border border-gold/35 aspect-[1/1] sm:aspect-[4/3] lg:aspect-[16/9]">
    <div className="absolute inset-0 transition-transform origin-center" style={{transform:`scale(${z})`}}>
     <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="map-art absolute inset-0 w-full h-full" aria-hidden>
      <defs><pattern id="mapGrid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="#d7c58d" strokeOpacity=".08" strokeWidth=".12"/></pattern>
       <radialGradient id="mapGlow"><stop stopColor="#a98745" stopOpacity=".2"/><stop offset="1" stopColor="#11192d" stopOpacity="0"/></radialGradient></defs>
      <rect width="100" height="100" fill="url(#mapGrid)"/><ellipse cx="52" cy="49" rx="48" ry="46" fill="url(#mapGlow)"/>
      <path d="M0 100V88c10-6 20-2 30-6s20 2 30-2 25 4 40-2v22z" fill="#0f493655"/>
      <path d="M5 93Q27 88 50 80T94 66M11 20Q30 31 50 52T81 69M48 12Q52 31 50 52T67 80" fill="none" stroke="#d3bb7a" strokeOpacity=".18" strokeDasharray="1.1 1" strokeWidth=".55"/>
      <g className="map-castle" fill="#b99b5a" fillOpacity=".13" stroke="#ddc889" strokeOpacity=".34" strokeWidth=".35">
       <path d="M39 34h7v-5h4v5h5v-8h4v8h5v9h4v13h-5v8H40v-8h-5V43h4z"/>
       <path d="M43 34v-7l2-3 2 3v7m12-1v-9l2-3 2 3v9M41 44h4v5h-4zm9 0h4v5h-4zm9 0h4v5h-4zM48 56h7v8h-7z"/>
       <path d="M32 38l4-4 4 4m28 0 4-4 4 4M35 58h-5v-9l2-3 3 3zm35 0h5v-9l-2-3-3 3z"/>
      </g>
      <g fill="none" stroke="#d8c386" strokeOpacity=".16" strokeWidth=".22"><circle cx="52" cy="50" r="32"/><circle cx="52" cy="50" r="42"/></g>
      <g fill="#e5cd92" opacity=".4"><path d="M8 47l.7 2.3L11 50l-2.3.7L8 53l-.7-2.3L5 50l2.3-.7zM88 27l.6 1.8 1.9.7-1.9.6-.6 1.9-.7-1.9-1.8-.6 1.8-.7zM81 91l.6 1.7 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/></g>
      <g stroke="#dfc97d88" strokeDasharray="1.5 1.5" fill="none" strokeWidth=".4">{shown.filter(l=>l.requires).map(l=>{const f=LOCATIONS.find(x=>x.id===l.requires)!;return <line key={l.id} x1={f.x} y1={f.y} x2={l.x} y2={l.y}/>})}</g>
     </svg>
     {shown.map(l=>{const st=status(l);const dim=!match(l);return <button key={l.id} onClick={()=>setSel(l)} aria-label={`${l.name}, ${st}`} aria-pressed={sel?.id===l.id} className={`map-marker absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center group ${dim?'opacity-15 pointer-events-none':''}`} style={{left:l.x+'%',top:l.y+'%',minWidth:52,minHeight:52,'--marker-color':col[st]} as React.CSSProperties}>
      <motion.span whileHover={{scale:1.22}} className={`map-pin w-8 h-8 rounded-full border grid place-items-center ${st==='Available'?'map-pin-pulse':''} ${st==='Locked'?'opacity-70':''}`}>{st==='Locked'?<Lock size={14}/>:<MapPin size={17}/>}</motion.span>
      <span className="map-label text-[10px] sm:text-xs mt-0.5 text-parch whitespace-nowrap px-1.5 py-0.5 rounded">{l.name}</span></button>})}
     {!s.secrets.includes('symbol')&&<button onClick={()=>s.findSecret()} aria-label="Reveal the hidden courtyard symbol" title="An unusual glimmer by the courtyard..." className="secret-glimmer absolute grid place-items-center text-gold/35 hover:text-gold text-xl" style={{left:'42%',top:'69%',minWidth:48,minHeight:48}}><Sparkles size={18}/></button>}</div>
    <Compass className="absolute top-4 right-4 text-gold/80 drop-shadow" size={34}/>
    <div className="absolute bottom-3 left-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] sm:text-xs bg-night/85 border border-gold/20 p-2.5 rounded-xl backdrop-blur">{Object.entries(col).map(([k,c])=><span key={k} className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full" style={{background:c,boxShadow:`0 0 7px ${c}`}}/>{k}</span>)}</div>
    <span className="absolute top-4 left-4 text-[10px] tracking-[.2em] uppercase text-parch/60">The Marauder's Chart · First Year Edition</span>
   </div>
   <aside className="card p-5 md:p-6 mt-4 min-h-[220px]"><AnimatePresence mode="wait">{sel?<motion.div key={sel.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}>
    <div className="flex justify-between"><span className="text-xs text-gold">{sel.cat} · {status(sel)}</span><button aria-label="Close" onClick={()=>setSel(null)}><X size={16}/></button></div>
    <h2 className="text-3xl font-bold">{sel.name}</h2><p className="text-sm text-slate-300 mt-1">{sel.desc}</p>
    {s.visited.includes(sel.id)&&<p className="text-sm italic text-parch mt-2">{sel.fact}</p>}
    <p className="text-xs mt-3">Difficulty: {sel.difficulty} · Exploration: +{sel.xp*2} XP · Challenge: +{CHALLENGES.find(c=>c.id===sel.challengeId)!.xp} XP</p>
    <p className="text-xs text-slate-400">Discovery progress: {(Number(s.visited.includes(sel.id))+Number(s.done.includes(sel.challengeId)))}/2</p>
    <div className="flex gap-2 mt-4 flex-wrap">
     {status(sel)==='Locked'?<p className="text-sm text-slate-400">Explore {LOCATIONS.find(l=>l.id===sel.requires)?.name ?? 'another location'} first.</p>:<>
      <button className="btn btn-gold" disabled={s.visited.includes(sel.id)} onClick={()=>s.explore(sel.id)}>{s.visited.includes(sel.id)?'Explored':'Explore'}</button>
      <button className="btn btn-ghost" disabled={!s.visited.includes(sel.id)} onClick={()=>nav('/challenges?c='+sel.challengeId)}>Start challenge</button></>}</div>
   </motion.div>:<p className="text-slate-400 text-sm">Select a landmark to explore its story. Look closely: not everything on this map is labelled.</p>}</AnimatePresence></aside></div></div>}
