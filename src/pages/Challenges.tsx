import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CHALLENGES, Ch, LOCATIONS } from '../data'
import { useStore } from '../store'
function Runner({c,onClose}:{c:Ch;onClose:()=>void}){const complete=useStore(s=>s.complete);const [res,setRes]=useState<null|boolean>(null);const [txt,setTxt]=useState('');const [m,setM]=useState<Record<string,string>>({});const [pickL,setPickL]=useState('')
 const finish=(ok:boolean)=>{setRes(ok);if(ok)complete(c.id)}
 const opts=c.type==='tf'?['True','False']:c.options||[]
 const right=c.type==='tf'?(c.answer?0:1):c.answer
 const rights=c.pairs?c.pairs.map(p=>p[1]).sort():[]
 return <div className="card p-6 max-w-xl mx-auto"><p className="text-xs text-gold">{c.type} · {c.difficulty} · +{c.xp} XP</p><h2 className="text-3xl font-bold">{c.title}</h2><p className="mt-2">{c.q}</p>
  {res===null?<div className="mt-4 grid gap-2">
   {opts.map((o,i)=><button key={o} className="card p-3 text-left min-h-[48px] hover:border-gold" onClick={()=>finish(i===right)}>{o}</button>)}
   {c.type==='riddle'&&<form className="flex gap-2" onSubmit={e=>{e.preventDefault();finish(txt.trim().toLowerCase()===c.answer)}}><input aria-label="Your answer" className="flex-1 bg-deep border border-gold/30 rounded-lg px-3 min-h-[44px]" value={txt} onChange={e=>setTxt(e.target.value)}/><button className="btn btn-gold">Answer</button></form>}
   {c.type==='match'&&c.pairs&&<div className="space-y-2">{c.pairs.map(([a])=><div key={a} className="flex items-center gap-2"><span className="w-28 text-sm">{a}</span><select aria-label={a} className="flex-1 bg-deep border border-gold/30 rounded-lg min-h-[44px] px-2" value={m[a]||''} onChange={e=>setM({...m,[a]:e.target.value})}><option value="">Choose...</option>{rights.map(r=><option key={r}>{r}</option>)}</select></div>)}
    <button className="btn btn-gold" disabled={Object.keys(m).length<c.pairs.length} onClick={()=>finish(c.pairs!.every(([a,b])=>m[a]===b))}>Check</button></div>}
  </div>:<motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} className="mt-4 text-center">
   <h3 className={`text-5xl font-bold ${res?'text-gold':'text-wine'}`}>{res?'Correct!':'Not quite'}</h3>
   {res&&<p className="text-xl text-gold mt-1">+{c.xp} XP</p>}<p className="mt-2 text-slate-300">{c.explain}</p>
   <div className="flex gap-2 justify-center mt-4">{!res&&<button className="btn btn-gold" onClick={()=>{setRes(null);setM({});setTxt('')}}>Try again</button>}<button className="btn btn-ghost" onClick={onClose}>Back to challenges</button></div></motion.div>}</div>}
export default function Challenges(){const s=useStore();const [sp,setSp]=useSearchParams();const cur=CHALLENGES.find(c=>c.id===sp.get('c'))
 if(cur&&s.visited.includes(cur.locId))return <div className="px-4 py-8"><Runner key={cur.id} c={cur} onClose={()=>setSp({})}/></div>
 const daily=s.dailyDone!==new Date().toISOString().slice(0,10)
 return <div className="max-w-3xl mx-auto px-4 py-8"><h1 className="text-4xl font-bold">Challenges</h1>
  <div className="card p-4 mt-4 border-gold/60"><p className="text-xs text-gold">Today's magical challenge</p><p>{daily?'Complete one exploration challenge for +30 XP.':'Done for today. Come back tomorrow.'}</p><p className="text-sm text-slate-400">Streak: {s.streak} day{s.streak===1?'':'s'} (goals: 3 and 7)</p></div>
  <div className="grid gap-3 mt-4">{CHALLENGES.map(c=>{const open=s.visited.includes(c.locId);const done=s.done.includes(c.id);const l=LOCATIONS.find(x=>x.id===c.locId)!
   return <div key={c.id} className="card p-4 flex items-center justify-between gap-3"><div><p className="font-semibold">{c.title}</p><p className="text-xs text-slate-400">{l.name} · {c.type} · {c.difficulty} · +{c.xp} XP</p></div>
    <button className="btn btn-ghost" disabled={!open} onClick={()=>setSp({c:c.id})}>{done?'Replay':open?'Start':'Explore first'}</button></div>})}</div></div>}
