export type Grade='A'|'B'|'C';
export type Task={id:string;title:string;subtitle:string;minutes:number;tags:string[];status:'ready'|'active'|'paused'|'complete'|'skipped';actualSeconds:number;performanceSeconds:number;timerStartedAt?:number;grade?:Grade;ratings?:Record<string,number>;tensionStart?:string;notes?:string};
export type Session={id:string;label:string;kind:'practice'|'break'|'optional';tasks:Task[]};
export type AppState={date:string;sessions:Session[];activeTaskId?:string;firstTakes:number;history:Array<{date:string;task:string;grade:Grade;ratings:Record<string,number>;tension:number}>};
