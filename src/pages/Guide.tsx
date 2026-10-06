import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { ask, PROMPTS } from '../services/guide'
export default function Guide(){const [msgs,setM]=useState<{u:boolean;t:string}[]>([{u:false,t:'Welcome, young explorer. Ask me anything about the castle.'}]);const [v,setV]=useState('');const [busy,setB]=useState(false);const end=useRef<HTMLDivElement>(null)
 useEffect(()=>end.current?.scrollIntoView({behavior:'smooth'}),[msgs])
 const send=(t:string)=>{if(!t.trim()||busy)return;setM(m=>[...m,{u:true,t}]);setV('');setB(true);setTimeout(()=>{setM(m=>[...m,{u:false,t:ask(t)}]);setB(false)},500)}
 return <div className="max-w-2xl mx-auto px-4 py-8"><h1 className="text-4xl font-bold">Magical Guide</h1><p className="text-slate-400 text-sm">Here for you, always.</p>
  <div className="card mt-4 p-4 h-[50vh] overflow-y-auto space-y-3" aria-live="polite">{msgs.map((m,i)=><div key={i} className={`max-w-[85%] p-3 rounded-lg text-sm ${m.u?'ml-auto bg-wine/60':'bg-deep border border-gold/20'}`}>{m.t}</div>)}{busy&&<div className="text-gold text-sm">The Guide is thinking...</div>}<div ref={end}/></div>
  <div className="flex flex-wrap gap-2 mt-3">{PROMPTS.map(p=><button key={p} className="btn btn-ghost !min-h-[40px] text-xs" onClick={()=>send(p)}>{p}</button>)}</div>
  <form className="flex gap-2 mt-3" onSubmit={e=>{e.preventDefault();send(v)}}><input value={v} onChange={e=>setV(e.target.value)} placeholder="Ask something magical..." aria-label="Ask the Guide" className="flex-1 bg-deep border border-gold/30 rounded-lg px-3 min-h-[44px]"/><button className="btn btn-gold" aria-label="Send"><Send size={16}/></button></form></div>}
