import { Subject } from 'rxjs';
import { EditorComponent } from '../editor/editor.component';
declare const listenHugeRTEEvent: (editor: any, eventName: string, destroy$: Subject<void>) => import("rxjs").Observable<unknown>;
declare const bindHandlers: (ctx: EditorComponent, editor: any, destroy$: Subject<void>) => void;
declare const noop: (...args: any[]) => void;
declare const isNullOrUndefined: (value: any) => value is null | undefined;
export { listenHugeRTEEvent, bindHandlers, noop, isNullOrUndefined };
