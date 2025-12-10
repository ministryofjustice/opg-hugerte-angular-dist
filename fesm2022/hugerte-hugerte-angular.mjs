import * as i0 from '@angular/core';
import { EventEmitter, Output, Directive, InjectionToken, forwardRef, PLATFORM_ID, Input, Inject, Optional, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { fromEvent, takeUntil, Subject, Observable } from 'rxjs';
import { validEvents, uuid, ScriptLoader, isTextarea, mergePlugins } from '@hugerte/framework-integration-shared';

const getHugeRTE = () => globalThis.hugerte ?? null;

// Caretaker note: `fromEvent` supports passing JQuery-style event targets, the editor has `on` and `off` methods which
// will be invoked upon subscription and teardown.
const listenHugeRTEEvent = (editor, eventName, destroy$) => fromEvent(editor, eventName).pipe(takeUntil(destroy$));
const bindHandlers = (ctx, editor, destroy$) => {
    const allowedEvents = getValidEvents(ctx);
    allowedEvents.forEach((eventName) => {
        const eventEmitter = ctx[eventName];
        listenHugeRTEEvent(editor, eventName.substring(2), destroy$).subscribe((event) => {
            // Caretaker note: `ngZone.run()` runs change detection since it notifies the forked Angular zone that it's
            // being re-entered. We don't want to run `ApplicationRef.tick()` if anyone listens to the specific event
            // within the template. E.g. if the `onSelectionChange` is not listened within the template like:
            // `<editor (onSelectionChange)="..."></editor>`
            // then it won't be "observed", and we won't run "dead" change detection.
            if (eventEmitter && isObserved(eventEmitter)) {
                ctx.ngZone.run(() => eventEmitter.emit({ event, editor }));
            }
        });
    });
};
const getValidEvents = (ctx) => {
    const ignoredEvents = parseStringProperty(ctx.ignoreEvents, []);
    const prefixedValidEvents = validEvents.map((event) => 'on' + event);
    prefixedValidEvents.push('onInitNgModel');
    prefixedValidEvents.push('onPreInit'); // TODO
    const allowedEvents = parseStringProperty(ctx.allowedEvents, prefixedValidEvents).filter((event) => prefixedValidEvents.includes(event) && !ignoredEvents.includes(event));
    return allowedEvents;
};
const parseStringProperty = (property, defaultValue) => {
    if (typeof property === 'string') {
        return property.split(',').map((value) => value.trim());
    }
    if (Array.isArray(property)) {
        return property;
    }
    return defaultValue;
};
const noop = () => { };
const isNullOrUndefined = (value) => value === null || value === undefined;
const isObserved = (o) => 
// RXJS is making the `observers` property internal in v8. So this is intended as a backwards compatible way of
// checking if a subject has observers.
o.observed || o.observers?.length > 0;

class Events {
    onBeforePaste = new EventEmitter();
    onBlur = new EventEmitter();
    onClick = new EventEmitter();
    // TODO: something better than any? But comment change is probably from a TinyMCE premium plugin anyway. Check in React for type maybe.
    onCommentChange = new EventEmitter();
    onCompositionEnd = new EventEmitter();
    onCompositionStart = new EventEmitter();
    onCompositionUpdate = new EventEmitter();
    onContextMenu = new EventEmitter();
    onCopy = new EventEmitter();
    onCut = new EventEmitter();
    onDblclick = new EventEmitter();
    onDrag = new EventEmitter();
    onDragDrop = new EventEmitter();
    onDragEnd = new EventEmitter();
    onDragGesture = new EventEmitter();
    onDragOver = new EventEmitter();
    onDrop = new EventEmitter();
    onFocus = new EventEmitter();
    onFocusIn = new EventEmitter();
    onFocusOut = new EventEmitter();
    onKeyDown = new EventEmitter();
    onKeyPress = new EventEmitter();
    onKeyUp = new EventEmitter();
    onMouseDown = new EventEmitter();
    onMouseEnter = new EventEmitter();
    onMouseLeave = new EventEmitter();
    onMouseMove = new EventEmitter();
    onMouseOut = new EventEmitter();
    onMouseOver = new EventEmitter();
    onMouseUp = new EventEmitter();
    onPaste = new EventEmitter();
    onSelectionChange = new EventEmitter();
    onActivate = new EventEmitter();
    onAddUndo = new EventEmitter();
    onBeforeAddUndo = new EventEmitter();
    onBeforeExecCommand = new EventEmitter();
    onBeforeGetContent = new EventEmitter();
    onBeforeRenderUI = new EventEmitter();
    onBeforeSetContent = new EventEmitter();
    onChange = new EventEmitter();
    onClearUndos = new EventEmitter();
    onDeactivate = new EventEmitter();
    onDirty = new EventEmitter();
    onExecCommand = new EventEmitter();
    onGetContent = new EventEmitter();
    onHide = new EventEmitter();
    onInit = new EventEmitter();
    onInput = new EventEmitter();
    onInitNgModel = new EventEmitter(); // TODO not in @hugerte/framework-integration-shared
    onLoadContent = new EventEmitter();
    onNodeChange = new EventEmitter();
    onPostProcess = new EventEmitter();
    onPostRender = new EventEmitter();
    onPreInit = new EventEmitter(); // TODO not in @hugerte/framework-integration-shared
    onPreProcess = new EventEmitter();
    onProgressState = new EventEmitter();
    onRedo = new EventEmitter();
    onRemove = new EventEmitter();
    onReset = new EventEmitter();
    onResizeEditor = new EventEmitter();
    onSaveContent = new EventEmitter();
    onSetAttrib = new EventEmitter();
    onObjectResizeStart = new EventEmitter();
    onObjectResized = new EventEmitter();
    onObjectSelected = new EventEmitter();
    onSetContent = new EventEmitter();
    onShow = new EventEmitter();
    onSubmit = new EventEmitter();
    onUndo = new EventEmitter();
    onVisualAid = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: Events, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.17", type: Events, isStandalone: true, outputs: { onBeforePaste: "onBeforePaste", onBlur: "onBlur", onClick: "onClick", onCommentChange: "onCommentChange", onCompositionEnd: "onCompositionEnd", onCompositionStart: "onCompositionStart", onCompositionUpdate: "onCompositionUpdate", onContextMenu: "onContextMenu", onCopy: "onCopy", onCut: "onCut", onDblclick: "onDblclick", onDrag: "onDrag", onDragDrop: "onDragDrop", onDragEnd: "onDragEnd", onDragGesture: "onDragGesture", onDragOver: "onDragOver", onDrop: "onDrop", onFocus: "onFocus", onFocusIn: "onFocusIn", onFocusOut: "onFocusOut", onKeyDown: "onKeyDown", onKeyPress: "onKeyPress", onKeyUp: "onKeyUp", onMouseDown: "onMouseDown", onMouseEnter: "onMouseEnter", onMouseLeave: "onMouseLeave", onMouseMove: "onMouseMove", onMouseOut: "onMouseOut", onMouseOver: "onMouseOver", onMouseUp: "onMouseUp", onPaste: "onPaste", onSelectionChange: "onSelectionChange", onActivate: "onActivate", onAddUndo: "onAddUndo", onBeforeAddUndo: "onBeforeAddUndo", onBeforeExecCommand: "onBeforeExecCommand", onBeforeGetContent: "onBeforeGetContent", onBeforeRenderUI: "onBeforeRenderUI", onBeforeSetContent: "onBeforeSetContent", onChange: "onChange", onClearUndos: "onClearUndos", onDeactivate: "onDeactivate", onDirty: "onDirty", onExecCommand: "onExecCommand", onGetContent: "onGetContent", onHide: "onHide", onInit: "onInit", onInput: "onInput", onInitNgModel: "onInitNgModel", onLoadContent: "onLoadContent", onNodeChange: "onNodeChange", onPostProcess: "onPostProcess", onPostRender: "onPostRender", onPreInit: "onPreInit", onPreProcess: "onPreProcess", onProgressState: "onProgressState", onRedo: "onRedo", onRemove: "onRemove", onReset: "onReset", onResizeEditor: "onResizeEditor", onSaveContent: "onSaveContent", onSetAttrib: "onSetAttrib", onObjectResizeStart: "onObjectResizeStart", onObjectResized: "onObjectResized", onObjectSelected: "onObjectSelected", onSetContent: "onSetContent", onShow: "onShow", onSubmit: "onSubmit", onUndo: "onUndo", onVisualAid: "onVisualAid" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: Events, decorators: [{
            type: Directive
        }], propDecorators: { onBeforePaste: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onCommentChange: [{
                type: Output
            }], onCompositionEnd: [{
                type: Output
            }], onCompositionStart: [{
                type: Output
            }], onCompositionUpdate: [{
                type: Output
            }], onContextMenu: [{
                type: Output
            }], onCopy: [{
                type: Output
            }], onCut: [{
                type: Output
            }], onDblclick: [{
                type: Output
            }], onDrag: [{
                type: Output
            }], onDragDrop: [{
                type: Output
            }], onDragEnd: [{
                type: Output
            }], onDragGesture: [{
                type: Output
            }], onDragOver: [{
                type: Output
            }], onDrop: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onFocusIn: [{
                type: Output
            }], onFocusOut: [{
                type: Output
            }], onKeyDown: [{
                type: Output
            }], onKeyPress: [{
                type: Output
            }], onKeyUp: [{
                type: Output
            }], onMouseDown: [{
                type: Output
            }], onMouseEnter: [{
                type: Output
            }], onMouseLeave: [{
                type: Output
            }], onMouseMove: [{
                type: Output
            }], onMouseOut: [{
                type: Output
            }], onMouseOver: [{
                type: Output
            }], onMouseUp: [{
                type: Output
            }], onPaste: [{
                type: Output
            }], onSelectionChange: [{
                type: Output
            }], onActivate: [{
                type: Output
            }], onAddUndo: [{
                type: Output
            }], onBeforeAddUndo: [{
                type: Output
            }], onBeforeExecCommand: [{
                type: Output
            }], onBeforeGetContent: [{
                type: Output
            }], onBeforeRenderUI: [{
                type: Output
            }], onBeforeSetContent: [{
                type: Output
            }], onChange: [{
                type: Output
            }], onClearUndos: [{
                type: Output
            }], onDeactivate: [{
                type: Output
            }], onDirty: [{
                type: Output
            }], onExecCommand: [{
                type: Output
            }], onGetContent: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onInit: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onInitNgModel: [{
                type: Output
            }], onLoadContent: [{
                type: Output
            }], onNodeChange: [{
                type: Output
            }], onPostProcess: [{
                type: Output
            }], onPostRender: [{
                type: Output
            }], onPreInit: [{
                type: Output
            }], onPreProcess: [{
                type: Output
            }], onProgressState: [{
                type: Output
            }], onRedo: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onReset: [{
                type: Output
            }], onResizeEditor: [{
                type: Output
            }], onSaveContent: [{
                type: Output
            }], onSetAttrib: [{
                type: Output
            }], onObjectResizeStart: [{
                type: Output
            }], onObjectResized: [{
                type: Output
            }], onObjectSelected: [{
                type: Output
            }], onSetContent: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onSubmit: [{
                type: Output
            }], onUndo: [{
                type: Output
            }], onVisualAid: [{
                type: Output
            }] } });

/**
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Copyright (c) 2025 HugeRTE contributors
 *
 * This file is part of the HugeRTE Angular integration.
 * Licensed under the MIT license.
 * See https://github.com/hugerte/hugerte-angular/blob/main/LICENSE.txt
 *
 */
/* eslint-disable @typescript-eslint/no-parameter-properties */
const HUGERTE_SCRIPT_SRC = new InjectionToken('HUGERTE_SCRIPT_SRC');
const EDITOR_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};
/**
 * TODO add docs for inputs
 */
class EditorComponent extends Events {
    cdRef;
    platformId;
    hugerteScriptSrc;
    cdnVersion = '1';
    init;
    id = '';
    initialValue;
    outputFormat;
    inline;
    tagName;
    plugins;
    toolbar;
    modelEvents = 'change input undo redo';
    allowedEvents;
    ignoreEvents;
    set disabled(val) {
        this._disabled = val;
        if (this._editor && this._editor.initialized) {
            if (typeof this._editor.mode?.set === 'function') {
                this._editor.mode.set(val ? 'readonly' : 'design');
            }
            else if ('setMode' in this._editor && typeof this._editor.setMode === 'function') {
                this._editor.setMode(val ? 'readonly' : 'design');
            }
        }
    }
    get disabled() {
        return this._disabled;
    }
    get editor() {
        return this._editor;
    }
    ngZone;
    _elementRef;
    _element;
    _disabled;
    _editor;
    onTouchedCallback = noop;
    onChangeCallback;
    destroy$ = new Subject();
    constructor(elementRef, ngZone, cdRef, platformId, hugerteScriptSrc) {
        super();
        this.cdRef = cdRef;
        this.platformId = platformId;
        this.hugerteScriptSrc = hugerteScriptSrc;
        this._elementRef = elementRef;
        this.ngZone = ngZone;
    }
    writeValue(value) {
        if (this._editor && this._editor.initialized) {
            this._editor.setContent(isNullOrUndefined(value) ? '' : value);
        }
        else {
            this.initialValue = value === null ? undefined : value;
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.id = this.id || uuid('hugerte-angular');
            this.inline = this.inline !== undefined ? this.inline !== false : !!(this.init?.inline);
            this.createElement();
            if (getHugeRTE() !== null) {
                console.log(getHugeRTE().baseURI.source);
                this.initialise();
            }
            else if (this._element && this._element.ownerDocument) {
                new Observable((observer) => {
                    ScriptLoader.load(this._element.ownerDocument, this.getScriptSrc(), () => {
                        observer.next();
                        observer.complete();
                    });
                })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(this.initialise);
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this._editor && getHugeRTE()?.remove(this._editor);
    }
    createElement() {
        const tagName = typeof this.tagName === 'string' ? this.tagName : 'div';
        this._element = document.createElement(this.inline ? tagName : 'textarea');
        if (this._element) {
            const existingElement = document.getElementById(this.id);
            if (existingElement && existingElement !== this._elementRef.nativeElement) {
                /* eslint no-console: ["error", { allow: ["warn"] }] */
                console.warn(`HugeRTE-Angular: an element with id [${this.id}] already exists. Editors with duplicate Id will not be able to mount`);
            }
            this._element.id = this.id;
            if (isTextarea(this._element)) {
                this._element.style.visibility = 'hidden';
            }
            this._elementRef.nativeElement.appendChild(this._element);
        }
    }
    initialise = () => {
        const finalInit = {
            ...this.init,
            selector: undefined,
            target: this._element,
            inline: this.inline,
            readonly: this.disabled,
            plugins: mergePlugins((this.init && this.init.plugins), this.plugins),
            toolbar: this.toolbar || (this.init && this.init.toolbar),
            setup: (editor) => {
                this._editor = editor;
                listenHugeRTEEvent(editor, 'init', this.destroy$).subscribe(() => {
                    this.initEditor(editor);
                });
                bindHandlers(this, editor, this.destroy$);
                if (this.init && typeof this.init.setup === 'function') {
                    this.init.setup(editor);
                }
            }
        };
        if (isTextarea(this._element)) {
            this._element.style.visibility = '';
        }
        this.ngZone.runOutsideAngular(() => {
            getHugeRTE()?.init(finalInit);
        });
    };
    getScriptSrc() {
        const src = isNullOrUndefined(this.hugerteScriptSrc) ?
            `https://cdn.jsdelivr.net/npm/hugerte@${this.cdnVersion}/hugerte.min.js` :
            this.hugerteScriptSrc;
        return src;
    }
    initEditor(editor) {
        listenHugeRTEEvent(editor, 'blur', this.destroy$).subscribe(() => {
            this.cdRef.markForCheck();
            this.ngZone.run(() => this.onTouchedCallback());
        });
        listenHugeRTEEvent(editor, this.modelEvents, this.destroy$).subscribe(() => {
            this.cdRef.markForCheck();
            this.ngZone.run(() => this.emitOnChange(editor));
        });
        if (typeof this.initialValue === 'string') {
            this.ngZone.run(() => {
                editor.setContent(this.initialValue);
                if (editor.getContent() !== this.initialValue) {
                    this.emitOnChange(editor);
                }
                if (this.onInitNgModel !== undefined) {
                    this.onInitNgModel.emit(editor);
                }
            });
        }
    }
    emitOnChange(editor) {
        if (this.onChangeCallback) {
            this.onChangeCallback(editor.getContent({ format: this.outputFormat }));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: EditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: PLATFORM_ID }, { token: HUGERTE_SCRIPT_SRC, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.17", type: EditorComponent, isStandalone: true, selector: "editor", inputs: { cdnVersion: "cdnVersion", init: "init", id: "id", initialValue: "initialValue", outputFormat: "outputFormat", inline: "inline", tagName: "tagName", plugins: "plugins", toolbar: "toolbar", modelEvents: "modelEvents", allowedEvents: "allowedEvents", ignoreEvents: "ignoreEvents", disabled: "disabled" }, providers: [EDITOR_COMPONENT_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: '', isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: EditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'editor', template: '', providers: [EDITOR_COMPONENT_VALUE_ACCESSOR], imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [HUGERTE_SCRIPT_SRC]
                }] }], propDecorators: { cdnVersion: [{
                type: Input
            }], init: [{
                type: Input
            }], id: [{
                type: Input
            }], initialValue: [{
                type: Input
            }], outputFormat: [{
                type: Input
            }], inline: [{
                type: Input
            }], tagName: [{
                type: Input
            }], plugins: [{
                type: Input
            }], toolbar: [{
                type: Input
            }], modelEvents: [{
                type: Input
            }], allowedEvents: [{
                type: Input
            }], ignoreEvents: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class EditorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: EditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.17", ngImport: i0, type: EditorModule, imports: [EditorComponent], exports: [EditorComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: EditorModule, imports: [EditorComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.17", ngImport: i0, type: EditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [EditorComponent],
                    exports: [EditorComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { EditorComponent, EditorModule, HUGERTE_SCRIPT_SRC };
//# sourceMappingURL=hugerte-hugerte-angular.mjs.map
