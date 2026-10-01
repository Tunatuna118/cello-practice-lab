export const STORAGE_KEY = 'cello-practice-lab-v1';

const task = (id, title, subtitle, minutes, tags) => ({id, title, subtitle, minutes, tags, status: 'ready', actualSeconds: 0});

export function initialState() {
  return {date: new Date().toISOString().slice(0, 10), activeTaskId: null, history: [], sessions: [
    {id:'b1a',label:'BLOCK 1 · TECHNICAL FOUNDATION',kind:'practice',tasks:[task('frame','Frame / Intonation geometry','Whole-position relationships · move the frame, not a finger',10,['FRAME','SLOW → 100%']),task('motion','Low finger motion','Minimum height · short release and landing paths',10,['LOW MOTION']),task('clarity','Finger clarity / independence','Clear arrival, release surplus pressure · focus 3–4',10,['CLARITY']),task('bursts','Speed bursts + transfer','4–8 notes → beat → bar · finish at performance tempo',10,['SPEED','PERFORMANCE'])]},
    {id:'r1',label:'BREAK · 10 MIN',kind:'break',tasks:[task('break1','Reset','Put the cello down · breathe · hydrate',10,['BREAK'])]},
    {id:'b1b',label:'BLOCK 1 · CONCERTOS',kind:'practice',tasks:[task('haydn','Haydn · D major Concerto','Frame + clarity · always exit at performance tempo',20,['KÖLN','PERFORMANCE']),task('schumann','Schumann · Cello Concerto','Contact near bridge · core without pressing',20,['RIGHT HAND','CONTACT'])]},
    {id:'b2a',label:'BLOCK 2 · KÖLN EXCERPTS',kind:'practice',tasks:[task('beethoven5','Beethoven 5 · II','Cold First Take · frame and articulation',13,['FIRST TAKE','KÖLN']),task('donjuan','Strauss · Don Juan','Short bursts · speed endurance',14,['KÖLN','PERFORMANCE']),task('verdi','Verdi Requiem · Offertorio','Sound core + musical freedom',13,['FIRST TAKE','KÖLN'])]},
    {id:'r2',label:'BREAK · 10 MIN',kind:'break',tasks:[task('break2','Reset','Walk away from the instrument',10,['BREAK'])]},
    {id:'b2b',label:'BLOCK 2 · BUCHET',kind:'practice',tasks:[task('debussy','Debussy · Cello Sonata','Newer material · acquisition then performance exit',27,['BUCHET','PRIORITY']),task('bach','Bach · Suite No. 2','Reactivation · cold retrieval',13,['BUCHET','FIRST TAKE'])]},
    {id:'optional',label:'OPTIONAL · 20–35 MIN',kind:'optional',tasks:[task('simulation','Audition simulation','No preview · mental preparation · immediate First Take',20,['AUDITION','FIRST TAKE']),task('tosca','Puccini · Tosca','New material · careful acquisition',15,['KÖLN','PRIORITY'])]}
  ]};
}

export const elapsed = (task, now = Date.now()) => task.actualSeconds + (task.status === 'active' && task.timerStartedAt ? Math.max(0, Math.floor((now - task.timerStartedAt) / 1000)) : 0);
export function loadState(storage = localStorage) { try { return JSON.parse(storage.getItem(STORAGE_KEY)) || initialState(); } catch { return initialState(); } }
export const saveState = (state, storage = localStorage) => storage.setItem(STORAGE_KEY, JSON.stringify(state));
export function exportState(state, now = Date.now()) { return JSON.stringify({...state, activeTaskId:null, sessions:state.sessions.map(s=>({...s,tasks:s.tasks.map(t=>t.status==='active'?{...t,status:'paused',actualSeconds:elapsed(t,now),timerStartedAt:undefined}:t)}))},null,2); }
