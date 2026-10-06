import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BADGES, CHALLENGES, LOCATIONS, levelOf } from './data'
export type Reward={id:number;kind:'xp'|'badge'|'secret'|'level'|'discover';title:string;body:string}
export type Entry={id:string;cat:string;title:string;text:string}
type St={name:string;affinity:string|null;xp:number;visited:string[];done:string[];secrets:string[];badges:string[];journal:Entry[];streak:number;lastDay:string;dailyDone:string;rewards:Reward[]
 setAffinity:(a:string)=>void;explore:(id:string)=>void;complete:(id:string)=>void;findSecret:()=>void;dismiss:()=>void;reset:()=>void}
const today=()=>new Date().toISOString().slice(0,10)
const init={name:'Explorer',affinity:null,xp:0,visited:[],done:[],secrets:[],badges:[],journal:[],streak:0,lastDay:'',dailyDone:'',rewards:[]} as Partial<St>
let rid=1
export const useStore=create<St>()(persist((set,get)=>{
 const grant=(amount:number,entries:Entry[],extra:Partial<St>)=>{
  const s=get();const before=levelOf(s.xp).n
  const next={...s,...extra,xp:s.xp+amount} as St
  const rewards:Reward[]=[]
  if(amount)rewards.push({id:rid++,kind:'xp',title:`+${amount} XP`,body:'Knowledge discovered.'})
  const journal=[...s.journal];entries.forEach(e=>{if(!journal.find(j=>j.id===e.id))journal.push(e)})
  const badges=[...s.badges]
  BADGES.forEach(b=>{if(!badges.includes(b.id)&&b.test(next)){badges.push(b.id);rewards.push({id:rid++,kind:'badge',title:b.name,body:'Added to your magical collection.'})}})
  const lv=levelOf(next.xp);if(lv.n>before)rewards.push({id:rid++,kind:'level',title:`Level ${lv.n}`,body:lv.name})
  let streak=s.streak,lastDay=s.lastDay
  if(lastDay!==today()){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);streak=lastDay===y?streak+1:1;lastDay=today()}
  set({...extra,xp:next.xp,journal,badges,streak,lastDay,rewards:[...s.rewards,...rewards]})}
 return {...init as St,
 setAffinity:a=>{set({affinity:a});grant(20,[{id:'aff',cat:'Facts',title:'Magical affinity',text:`You are drawn to ${a}.`}],{})},
 explore:id=>{const s=get();if(s.visited.includes(id))return;const l=LOCATIONS.find(x=>x.id===id)!
  grant(l.xp*2,[{id:'loc-'+id,cat:'Locations',title:l.name,text:l.desc},{id:'fact-'+id,cat:'Facts',title:l.name+' fact',text:l.fact}],{visited:[...s.visited,id]})},
 complete:id=>{const s=get();if(s.done.includes(id))return;const c=CHALLENGES.find(x=>x.id===id)!
  const daily=s.dailyDone!==today();grant(c.xp+(daily?30:0),[{id:'ch-'+id,cat:'Challenges',title:c.title,text:c.explain}],{done:[...s.done,id],dailyDone:today()})},
 findSecret:()=>{const s=get();if(s.secrets.includes('symbol'))return
  grant(50,[{id:'sec',cat:'Secrets',title:'The courtyard symbol',text:'A hidden symbol opened the Whispering Passage.'}],{secrets:['symbol']})
 set(x=>({rewards:[...x.rewards,{id:rid++,kind:'secret',title:'Secret Discovered',body:'A hidden passage has opened on the map.'}]}))},
 dismiss:()=>set(s=>({rewards:s.rewards.slice(1)})),
 reset:()=>set({...init as St})}},{name:'hogwarts-explorer-v1',partialize:s=>({...s,rewards:[]})}))
