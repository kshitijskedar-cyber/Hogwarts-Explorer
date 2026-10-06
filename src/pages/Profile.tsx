import { Link } from 'react-router-dom'
import { AFFINITIES, BADGES, LOCATIONS, CHALLENGES, levelOf, nextLevel } from '../data'
import { useStore } from '../store'
import { nextSteps } from '../services/guide'
const CATS=['Locations','Facts','Secrets','Challenges']
export default function Profile(){const s=useStore();const lv=levelOf(s.xp);const nl=nextLevel(s.xp);const pct=nl?((s.xp-lv.min)/(nl.min-lv.min))*100:100;const a=s.affinity?AFFINITIES[s.affinity]:null
 const total=LOCATIONS.length+CHALLENGES.length+LOCATIONS.length+2
 const stat=[['Locations',s.visited.length],['Challenges',s.done.length],['Badges',s.badges.length],['Streak',s.streak]]
 const progress=[['Castle explored',s.visited.length,LOCATIONS.length-(s.secrets.length?0:1)],['Challenges complete',s.done.length,CHALLENGES.length],['Badges earned',s.badges.length,BADGES.length]] as const
 return <div className="max-w-5xl mx-auto px-4 py-8 space-y-6"><h1 className="text-4xl font-bold">My Magical Journey</h1>
  <div className="card p-5"><p className="text-sm text-gold">{a?`${a.name} · ${a.trait}`:'Affinity not yet discovered'}</p><h2 className="text-3xl font-bold">Level {lv.n}: {lv.name}</h2>
   <div className="h-2 bg-night rounded mt-2" role="progressbar" aria-valuenow={Math.round(pct)}><div className="h-full bg-gold rounded" style={{width:pct+'%'}}/></div>
   <p className="text-xs text-slate-400 mt-1">{s.xp} XP{nl?` · ${nl.min-s.xp} to ${nl.name}`:' · max level'}</p>
   {!a&&<Link to="/quiz" className="btn btn-gold mt-3">Discover your affinity</Link>}</div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{stat.map(([k,v])=><div key={k} className="card p-4 text-center"><p className="text-3xl font-bold text-gold">{v}</p><p className="text-xs">{k}</p></div>)}</div>
  <section className="card p-5" aria-label="Dashboard progress"><h2 className="text-2xl font-bold">Journey progress</h2><div className="grid md:grid-cols-3 gap-5 mt-4">{progress.map(([label,value,max])=><div key={label}><div className="flex justify-between gap-3 text-sm"><span>{label}</span><span className="text-gold">{Math.min(value,max)} / {max}</span></div><div className="h-2 bg-night rounded-full mt-2 overflow-hidden" role="progressbar" aria-label={label} aria-valuenow={Math.min(value,max)} aria-valuemin={0} aria-valuemax={max}><div className="h-full bg-gold rounded-full transition-all duration-500" style={{width:`${max?Math.min(100,value/max*100):0}%`}}/></div></div>)}</div></section>
  <div className="card p-5"><h2 className="text-2xl font-bold">Your next adventure</h2><ol className="list-decimal ml-5 mt-2 space-y-1 text-sm">{nextSteps().map(t=><li key={t}>{t}</li>)}</ol></div>
  <div className="card p-5"><h2 className="text-2xl font-bold">Badges</h2><div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3">{BADGES.map(b=>{const on=s.badges.includes(b.id);return <div key={b.id} className={`p-3 rounded-lg border ${on?'border-gold bg-gold/10':'border-slate-700 opacity-60'}`}><p className="font-semibold">{b.name}</p><p className="text-xs">{on?'Unlocked':b.req}</p></div>})}</div></div>
  <div className="card p-5"><h2 className="text-2xl font-bold">Discovery journal <span className="text-sm text-gold">{s.journal.length} / {total}</span></h2>
   {s.journal.length===0?<p className="text-sm text-slate-400 mt-2">Nothing yet. <Link className="text-gold underline" to="/map">Explore the map</Link> to fill these pages.</p>:CATS.map(c=>{const e=s.journal.filter(j=>j.cat===c);return e.length>0&&<div key={c} className="mt-3"><h3 className="text-xl text-gold">{c}</h3>{e.map(j=><p key={j.id} className="text-sm"><b>{j.title}.</b> {j.text}</p>)}</div>})}</div>
  <button className="btn btn-ghost" onClick={()=>{if(confirm('Reset all progress?'))s.reset()}}>Reset progress</button></div>}
