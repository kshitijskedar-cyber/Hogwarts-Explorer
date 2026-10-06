import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../store'
const stars=Array.from({length:60},(_,i)=>({l:(i*37)%100,t:(i*53)%100,d:(i%9)*.5}))
export default function Landing(){const aff=useStore(s=>s.affinity)
 return <section className="relative overflow-hidden min-h-[calc(100vh-56px)] grid place-items-center text-center px-6" style={{background:'radial-gradient(ellipse at 50% 100%,#6b1d2e66,transparent 60%),radial-gradient(ellipse at 50% 0%,#1b2a5a,#0b1020 70%)'}}>
  {stars.map((s,i)=><span key={i} className="star" style={{left:s.l+'%',top:s.t+'%',animationDelay:s.d+'s'}}/>)}
  <svg className="absolute bottom-0 w-full h-48 opacity-40" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden><path d="M0 20V14h6v-4h2V6h2v4h3v6h5V8l2-4 2 4v8h6V9h3V3l2-3 2 3v6h3v7h8V11h4V5l2-3 2 3v6h5v9z" fill="#050810"/></svg>
  <motion.div className="relative max-w-2xl" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:1}}>
   <p className="text-gold tracking-widest text-xs uppercase">A new chapter awaits</p>
   <h1 className="text-5xl md:text-7xl font-bold mt-3 leading-none" style={{textShadow:'0 0 40px #c9a65b55'}}>Hogwarts Explorer</h1>
   <p className="serif text-2xl mt-4 text-parch">Your magical journey begins here.</p>
   <p className="mt-3 text-slate-300">Find your affinity, learn your first spell, uncover hidden rooms, and write a story that is yours alone.</p>
   <div className="mt-8 flex flex-wrap gap-3 justify-center">
    <Link to={aff?'/map':'/quiz'} className="btn btn-gold">{aff?'Continue your journey':'Begin your journey'}</Link>
    <Link to="/map" className="btn btn-ghost">Explore the castle</Link></div></motion.div></section>}
