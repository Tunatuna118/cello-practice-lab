import type {AppState,Task} from './types';
import {initialState} from './data';
export const STORAGE_KEY='cello-practice-lab-v1';
export function loadState():AppState{try{const raw=localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):initialState()}catch{return initialState()}}
export function saveState(state:AppState){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
export function elapsed(task:Task,now=Date.now()){return task.actualSeconds+(task.status==='active'&&task.timerStartedAt?Math.max(0,Math.floor((now-task.timerStartedAt)/1000)):0)}
export function exportState(state:AppState){return JSON.stringify({...state,activeTaskId:undefined,sessions:state.sessions.map(s=>({...s,tasks:s.tasks.map(t=>t.status==='active'?{...t,status:'paused',actualSeconds:elapsed(t),timerStartedAt:undefined}:t)}))},null,2)}
