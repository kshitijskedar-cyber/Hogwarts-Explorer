import { AFFINITIES, CHALLENGES, LOCATIONS, levelOf, nextLevel } from '../data'
import { useStore } from '../store'
export const PROMPTS=['Where should I explore?','Give me a challenge.','How do I earn XP?','What should I learn next?']
export const nextSteps=()=>{const s=useStore.getState();const out:string[]=[]
 const pref=s.affinity?AFFINITIES[s.affinity].locs:[]
 const open=LOCATIONS.filter(l=>!l.secret&&!s.visited.includes(l.id)&&(!l.requires||s.visited.includes(l.requires)))
 open.sort((a,b)=>Number(pref.includes(b.id))-Number(pref.includes(a.id)))
 open.slice(0,2).forEach(l=>out.push(`Visit ${l.name}`))
 const ch=CHALLENGES.find(c=>s.visited.includes(c.locId)&&!s.done.includes(c.id));if(ch)out.push(`Complete "${ch.title}"`)
 if(!s.secrets.length)out.push('Find the hidden clue in the Courtyard')
 const nl=nextLevel(s.xp);if(nl)out.push(`Earn ${nl.min-s.xp} XP to reach ${nl.name}`)
 return out.length?out:['Revisit your journal. You have explored it all.']}
export const ask=(t:string):string=>{const s=useStore.getState();const q=t.toLowerCase();const n=nextSteps()
 if(/xp|level|earn/.test(q))return `Exploring gives +20 XP, challenges +25 to +50, secrets +50, and the daily challenge +30. You are level ${levelOf(s.xp).n} with ${s.xp} XP.`
 if(/challenge|quiz|test/.test(q)){const c=CHALLENGES.find(c=>s.visited.includes(c.locId)&&!s.done.includes(c.id));return c?`Try "${c.title}" (${c.difficulty}, +${c.xp} XP). Open it from the Challenges tab.`:'Explore a new place on the map first, then a challenge will be waiting.'}
 if(/secret|hidden|clue/.test(q))return s.secrets.length?'You found the courtyard symbol. The Whispering Passage is open.':'Linger in the Courtyard. An unusual symbol waits for sharp eyes.'
 if(/house|affinity/.test(q))return s.affinity?`Your affinity is ${AFFINITIES[s.affinity].name}: ${AFFINITIES[s.affinity].trait}.`:'Take the Affinity Quiz to discover yours.'
 if(/where|explore|go|new|first|learn|next|library/.test(q))return `Welcome, young explorer. ${n[0]}. Then ${n[1]??n[0]}. A fine start.`
 return `I am not sure about that one, but here is a suggestion: ${n[0]}.`}
