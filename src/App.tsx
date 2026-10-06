import { Routes, Route, NavLink, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Map as MapIcon, Swords, Sparkles, User, Trophy, Award, Star, ArrowUpCircle, KeyRound } from 'lucide-react'
import { useStore } from './store'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import MapPage from './pages/MapPage'
import Challenges from './pages/Challenges'
import Guide from './pages/Guide'
import Profile from './pages/Profile'
const nav=[['/','Home',Home],['/map','Map',MapIcon],['/challenges','Challenges',Swords],['/guide','Guide',Sparkles],['/profile','Profile',User]] as const
const icons={xp:Star,badge:Award,secret:KeyRound,level:ArrowUpCircle,discover:Trophy}
function RewardOverlay(){const r=useStore(s=>s.rewards[0]);const dismiss=useStore(s=>s.dismiss)
 const Ic=r?icons[r.kind]:Star
 return <AnimatePresence>{r&&<motion.div key={r.id} role="alertdialog" aria-modal="true" aria-live="assertive" className={`reward-backdrop reward-${r.kind} fixed inset-0 z-50 grid place-items-center p-4`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
  <motion.div className="reward-card card relative max-w-sm w-full p-8 text-center overflow-hidden" initial={{scale:.75,y:28,rotateX:10}} animate={{scale:1,y:0,rotateX:0}} transition={{type:'spring',stiffness:180,damping:16}}>
   <div className="reward-orbit" aria-hidden><i/><i/><i/><i/></div>
   <motion.div initial={{scale:.4,rotate:-25}} animate={{scale:1,rotate:0}} transition={{delay:.12,type:'spring',stiffness:220}} className="relative mx-auto grid place-items-center w-20 h-20 rounded-full border border-gold/40 bg-gold/10">
    <Ic className="text-gold" size={42}/></motion.div>
   <p className="relative mt-4 text-xs tracking-[.24em] text-gold uppercase">{r.kind==='badge'?'Badge unlocked':r.kind==='secret'?'Secret discovered':r.kind==='level'?'Level up':r.kind==='xp'?'Experience gained':'Reward'}</p>
   <h2 className="relative text-4xl font-bold mt-1">{r.kind==='secret'?'Secret Discovered':r.title}</h2><p className="relative mt-2 text-slate-300">{r.body}</p>
   {r.kind==='xp'&&<motion.div className="mx-auto mt-5 h-1 w-32 rounded-full bg-gold" initial={{scaleX:0,opacity:0}} animate={{scaleX:1,opacity:1}} transition={{delay:.18,duration:.5}}/>}
   <button autoFocus className="btn btn-gold mt-6" onClick={dismiss}>Continue</button></motion.div></motion.div>}</AnimatePresence>}
export default function App(){const loc=useLocation();const xp=useStore(s=>s.xp)
 return <div className="min-h-screen pb-20 md:pb-0">
  <header className="sticky top-0 z-40 bg-night/90 backdrop-blur border-b border-gold/20"><div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
   <Link to="/" className="serif text-xl font-bold tracking-wide text-gold">Hogwarts Explorer</Link>
   <nav className="hidden md:flex gap-6 text-sm" aria-label="Main">{nav.map(([to,l])=><NavLink key={to} to={to} end className={({isActive})=>isActive?'text-gold':'text-slate-300 hover:text-white'}>{l}</NavLink>)}</nav>
   <span className="text-xs text-slate-400">{xp} XP</span></div></header>
  <AnimatePresence mode="wait"><motion.main key={loc.pathname} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.25}}>
   <Routes location={loc}><Route path="/" element={<Landing/>}/><Route path="/quiz" element={<Quiz/>}/>
   <Route path="/map" element={<MapPage/>}/><Route path="/challenges" element={<Challenges/>}/>
    <Route path="/guide" element={<Guide/>}/><Route path="/profile" element={<Profile/>}/><Route path="*" element={<Landing/>}/></Routes></motion.main></AnimatePresence>
  <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-night border-t border-gold/30 grid grid-cols-5" aria-label="Mobile">
   {nav.map(([to,l,Ic])=><NavLink key={to} to={to} end className={({isActive})=>`flex flex-col items-center justify-center min-h-[56px] text-[11px] ${isActive?'text-gold':'text-slate-400'}`}><Ic size={20}/>{l}</NavLink>)}</nav>
  <RewardOverlay/></div>}
