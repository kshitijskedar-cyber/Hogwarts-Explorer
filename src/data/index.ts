export type Loc={id:string;name:string;cat:string;desc:string;fact:string;difficulty:'Easy'|'Medium'|'Hard';xp:number;x:number;y:number;requires?:string;secret?:boolean;challengeId:string}
export const LOCATIONS:Loc[]=[
{id:'hall',name:'Great Hall',cat:'Gathering',desc:'Four long tables beneath a ceiling that mirrors the sky.',fact:'The candles hover with no strings. Nobody admits to hanging them.',difficulty:'Easy',xp:10,x:50,y:52,challengeId:'c-hall'},
{id:'library',name:'Grand Library',cat:'Knowledge',desc:'Some stories live on shelves. Others hide between them.',fact:'One shelf rearranges itself whenever a first year gets lost.',difficulty:'Easy',xp:10,x:30,y:35,requires:'hall',challengeId:'c-lib'},
{id:'potions',name:'Potions Chamber',cat:'Lessons',desc:'Copper cauldrons and a cellar chill that smells of mint and smoke.',fact:'Stirring clockwise and counter-clockwise are never interchangeable.',difficulty:'Medium',xp:10,x:22,y:68,requires:'hall',challengeId:'c-pot'},
{id:'herbology',name:'Herbology Gardens',cat:'Lessons',desc:'Glasshouses where the plants have opinions.',fact:'Moonpetal blooms only after sunset and closes if watched too closely.',difficulty:'Medium',xp:10,x:72,y:70,requires:'hall',challengeId:'c-herb'},
{id:'astro',name:'Astronomy Tower',cat:'Lessons',desc:'The highest room in the castle, open to every star.',fact:'The brass telescope is aligned to a constellation that has no name yet.',difficulty:'Hard',xp:10,x:68,y:18,requires:'library',challengeId:'c-astro'},
{id:'courtyard',name:'Courtyard',cat:'Outdoors',desc:'Worn flagstones and an old fountain at the castle heart.',fact:'Travelers swear the fountain hums a different note each morning.',difficulty:'Easy',xp:10,x:50,y:80,requires:'hall',challengeId:'c-court'},
{id:'training',name:'Training Hall',cat:'Lessons',desc:'Echoing stone where first spells are practiced, and mostly fizzle.',fact:'The floor is scorched in exactly one corner. Nobody will say why.',difficulty:'Medium',xp:10,x:85,y:42,requires:'courtyard',challengeId:'c-train'},
{id:'forest',name:'Enchanted Forest',cat:'Wilds',desc:'Beyond the gates, trees lean closer than they should.',fact:'Paths here change if you stop walking to read the map.',difficulty:'Hard',xp:10,x:10,y:20,requires:'herbology',challengeId:'c-forest'},
{id:'passage',name:'Whispering Passage',cat:'Secret',desc:'A corridor that appeared only when someone looked for it.',fact:'It is on no map, including this one, until you find the symbol.',difficulty:'Hard',xp:10,x:38,y:62,secret:true,challengeId:'c-pass'}]
export type Ch={id:string;type:'mcq'|'tf'|'riddle'|'match'|'knowledge';title:string;q:string;options?:string[];answer:string|number|boolean;pairs?:[string,string][];explain:string;difficulty:'Easy'|'Medium'|'Hard';xp:number;locId:string}
export const CHALLENGES:Ch[]=[
{id:'c-hall',type:'mcq',title:'Welcome feast',q:'What do the floating candles teach new students?',options:['Wonder is part of daily life','Never look up','Candles are dangerous'],answer:0,explain:'The hall invites curiosity from the first moment.',difficulty:'Easy',xp:25,locId:'hall'},
{id:'c-lib',type:'tf',title:'Quiet shelves',q:'True or false: the library shelf that moves helps lost first years.',answer:true,explain:'It nudges wanderers toward the right aisle.',difficulty:'Easy',xp:25,locId:'library'},
{id:'c-pot',type:'riddle',title:'The cellar riddle',q:'I am stirred but never eaten, bubble but never boil dry. Drink me wisely. What am I?',answer:'potion',explain:'A potion rewards patience and care.',difficulty:'Medium',xp:25,locId:'potions'},
{id:'c-herb',type:'match',title:'Match the plants',q:'Match each plant with its trait.',pairs:[['Moonpetal','Blooms after dark'],['Whisperfern','Hums when touched'],['Emberthorn','Warm to the touch']],answer:'ok',explain:'Every plant has habits worth learning.',difficulty:'Medium',xp:25,locId:'herbology'},
{id:'c-astro',type:'knowledge',title:'Read the night sky',q:'To find a constellation, you should first...',options:['Find a bright anchor star','Close your eyes','Wait for noon'],answer:0,explain:'Anchor stars let you trace the shapes around them.',difficulty:'Hard',xp:50,locId:'astro'},
{id:'c-court',type:'tf',title:'Fountain note',q:'True or false: the courtyard fountain hums the same note every day.',answer:false,explain:'It changes each morning.',difficulty:'Easy',xp:25,locId:'courtyard'},
{id:'c-train',type:'mcq',title:'First flick',q:'What matters most when practicing a first charm?',options:['Focus and a steady wrist','Shouting loudly','Speed'],answer:0,explain:'Focus beats force.',difficulty:'Medium',xp:25,locId:'training'},
{id:'c-forest',type:'riddle',title:'Forest path',q:'I have many rings but never wear jewelry, and I grow old in silence. What am I?',answer:'tree',explain:'Rings mark a tree\'s years.',difficulty:'Hard',xp:50,locId:'forest'},
{id:'c-pass',type:'tf',title:'Hidden door',q:'True or false: the passage only appears to those who look for it.',answer:true,explain:'Curiosity is the key.',difficulty:'Hard',xp:50,locId:'passage'}]
export const QUIZ=[
{q:'A hidden door appears. What do you do first?',a:[['Open it slowly and peek','ember'],['Call a friend over','grove'],['Think about the story behind it','gale'],['Look for a rule or a teacher','tide']]},
{q:'Which lesson sounds most exciting?',a:[['Charms in the training hall','ember'],['Herbology in the glasshouse','grove'],['Astronomy at night','gale'],['Potions in the cellar','tide']]},
{q:'Your favourite place to rest?',a:[['By a roaring fire','ember'],['A sunny garden bench','grove'],['A tower window with a book','gale'],['A quiet, tidy corner','tide']]},
{q:'What would you most like to be known for?',a:[['Bravery','ember'],['Loyalty','grove'],['Wisdom','gale'],['Ambition','tide']]},
{q:'You are lost in the castle. You...',a:[['Charge ahead','ember'],['Ask someone kind','grove'],['Study the walls for clues','gale'],['Make a plan and retrace steps','tide']]}]
export const AFFINITIES:Record<string,{name:string;trait:string;desc:string;locs:string[];subjects:string[];color:string}>={
ember:{name:'Ember',trait:'Courage',desc:'You leap first and learn along the way. Warm, bold, and hard to discourage.',locs:['training','hall','forest'],subjects:['Charms','Defense'],color:'#d9573a'},
grove:{name:'Grove',trait:'Loyalty',desc:'You grow things: friendships, gardens, trust. Patient and steadfast.',locs:['herbology','courtyard','hall'],subjects:['Herbology','Creatures'],color:'#3fae85'},
gale:{name:'Gale',trait:'Wisdom',desc:'You chase questions across the sky. Curious, quick, and thoughtful.',locs:['library','astro','passage'],subjects:['Astronomy','Charms'],color:'#6e93e8'},
tide:{name:'Tide',trait:'Ambition',desc:'You shape your path with care. Precise, driven, and resourceful.',locs:['potions','library','training'],subjects:['Potions','Runes'],color:'#9a7fe0'}}
export const LEVELS=[{n:1,name:'First-Year',min:0},{n:2,name:'Explorer',min:100},{n:3,name:'Apprentice',min:250},{n:4,name:'Advanced Explorer',min:450},{n:5,name:'Master Explorer',min:700}]
export const levelOf=(xp:number)=>[...LEVELS].reverse().find(l=>xp>=l.min)!
export const nextLevel=(xp:number)=>LEVELS.find(l=>l.min>xp)
export type S={xp:number;visited:string[];done:string[];secrets:string[]}
export const BADGES:{id:string;name:string;req:string;test:(s:S)=>boolean}[]=[
{id:'first',name:'First Steps',req:'Explore your first location',test:s=>s.visited.length>=1},
{id:'castle',name:'Castle Explorer',req:'Explore 5 locations',test:s=>s.visited.length>=5},
{id:'knowledge',name:'Knowledge Seeker',req:'Complete 3 challenges',test:s=>s.done.length>=3},
{id:'path',name:'Pathfinder',req:'Explore 8 locations',test:s=>s.visited.length>=8},
{id:'master',name:'Challenge Master',req:'Complete 6 challenges',test:s=>s.done.length>=6},
{id:'scholar',name:'Magical Scholar',req:'Reach 250 XP',test:s=>s.xp>=250},
{id:'secret',name:'Secret Finder',req:'Discover a hidden secret',test:s=>s.secrets.length>=1},
{id:'grand',name:'Master Explorer',req:'Reach level 5 (700 XP)',test:s=>s.xp>=700}]
