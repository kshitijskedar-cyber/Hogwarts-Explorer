import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AFFINITIES, LOCATIONS, QUIZ } from '../data'
import { useStore } from '../store'
export default function Quiz(){const [i,setI]=useState(0);const [tally,setTally]=useState<Record<string,number>>({});const [res,setRes]=useState<string|null>(null)
 const setAff=useStore(s=>s.setAffinity)
 const pick=(k:string)=>{const t={...tally,[k]:(tally[k]||0)+1};setTally(t)
  if(i+1<QUIZ.length){setI(i+1);return}
  const w=Object.entries(t).sort((a,b)=>b[1]-a[1])[0][0];setRes(w);setAff(w)}
 if(res){const a=AFFINITIES[res];return <div className="max-w-xl mx-auto px-4 py-12 text-center">
  <motion.div initial={{scale:.85,opacity:0}} animate={{scale:1,opacity:1}} className="card p-8" style={{boxShadow:`0 0 60px ${a.color}55`}}>
   <p className="text-xs tracking-widest text-gold uppercase">Your magical affinity</p>
   <h1 className="text-6xl font-bold mt-2" style={{color:a.color}}>{a.name}</h1><p className="serif text-2xl">{a.trait}</p>
   <p className="mt-4 text-slate-300">{a.desc}</p>
   <p className="mt-4 text-sm"><b>Recommended places:</b> {a.locs.map(id=>LOCATIONS.find(l=>l.id===id)!.name).join(', ')}</p>
   <p className="text-sm"><b>Recommended subjects:</b> {a.subjects.join(', ')}</p>
   <p className="mt-3 text-gold">Starting reward: +20 XP</p>
   <Link to="/map" className="btn btn-gold mt-6">Open the castle map</Link></motion.div></div>}
 return <div className="max-w-xl mx-auto px-4 py-10"><div className="h-1.5 bg-deep rounded" role="progressbar" aria-valuenow={i+1} aria-valuemax={QUIZ.length}><motion.div className="h-full bg-gold rounded" animate={{width:`${(i/QUIZ.length)*100}%`}}/></div>
  <p className="text-sm text-slate-400 mt-3">Question {i+1} of {QUIZ.length}</p>
  <AnimatePresence mode="wait"><motion.div key={i} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}>
   <h1 className="text-3xl font-bold my-4">{QUIZ[i].q}</h1>
   <div className="grid gap-3">{QUIZ[i].a.map(([t,k])=><button key={t} onClick={()=>pick(k)} className="card p-4 text-left min-h-[56px] hover:border-gold hover:-translate-y-0.5 transition">{t}</button>)}</div></motion.div></AnimatePresence></div>}
