import test from 'node:test';
import assert from 'node:assert/strict';
import {elapsed,exportState,initialState,loadState,saveState,STORAGE_KEY} from '../src/core.js';

test('Day 1 contains two complete 40–10–40 blocks',()=>{const s=initialState();assert.deepEqual(s.sessions.map(x=>x.tasks.reduce((n,t)=>n+t.minutes,0)),[40,10,40,40,10,40,35])});
test('active timer survives refresh by deriving time from timestamp',()=>{const t=initialState().sessions[0].tasks[0];Object.assign(t,{status:'active',actualSeconds:10,timerStartedAt:1000});assert.equal(elapsed(t,6000),15)});
test('state round-trips through local storage',()=>{const values=new Map(),storage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)};const s=initialState();s.sessions[0].tasks[0].actualSeconds=42;saveState(s,storage);assert.equal(loadState(storage).sessions[0].tasks[0].actualSeconds,42);assert.ok(values.has(STORAGE_KEY))});
test('export safely pauses an active timer',()=>{const s=initialState(),t=s.sessions[0].tasks[0];Object.assign(t,{status:'active',timerStartedAt:1000});s.activeTaskId=t.id;const copy=JSON.parse(exportState(s,6000));assert.equal(copy.activeTaskId,null);assert.equal(copy.sessions[0].tasks[0].status,'paused');assert.equal(copy.sessions[0].tasks[0].actualSeconds,5)});
