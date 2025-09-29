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
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, forwardRef, Inject, Input, PLATFORM_ID, InjectionToken, Optional, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Observable, takeUntil } from 'rxjs';
import { getHugeRTE } from '../HugeRTE';
import { listenHugeRTEEvent, bindHandlers, noop, isNullOrUndefined } from '../utils/Utils';
import { Events } from './Events';
import { ScriptLoader, isTextarea, mergePlugins, uuid } from '@hugerte/framework-integration-shared';
import * as i0 from "@angular/core";
export const HUGERTE_SCRIPT_SRC = new InjectionToken('HUGERTE_SCRIPT_SRC');
const EDITOR_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};
/**
 * TODO add docs for inputs
 */
export class EditorComponent extends Events {
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
        let src = isNullOrUndefined(this.hugerteScriptSrc) ?
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.1", ngImport: i0, type: EditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: PLATFORM_ID }, { token: HUGERTE_SCRIPT_SRC, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.1", type: EditorComponent, isStandalone: true, selector: "editor", inputs: { cdnVersion: "cdnVersion", init: "init", id: "id", initialValue: "initialValue", outputFormat: "outputFormat", inline: "inline", tagName: "tagName", plugins: "plugins", toolbar: "toolbar", modelEvents: "modelEvents", allowedEvents: "allowedEvents", ignoreEvents: "ignoreEvents", disabled: "disabled" }, providers: [EDITOR_COMPONENT_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: '', isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.1", ngImport: i0, type: EditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'editor', template: '', providers: [EDITOR_COMPONENT_VALUE_ACCESSOR], standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2h1Z2VydGUtYW5ndWxhci1jb21wb25lbnQvc3JjL21haW4vdHMvZWRpdG9yL2VkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0dBUUc7QUFDSCwrREFBK0Q7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFFTCxTQUFTLEVBRVQsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsV0FBVyxFQUNYLGNBQWMsRUFDZCxRQUFRLEVBRVIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRixPQUFPLEVBQVksTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFJckcsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQVMsb0JBQW9CLENBQUMsQ0FBQztBQUVuRixNQUFNLCtCQUErQixHQUFHO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDOUMsS0FBSyxFQUFFLElB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QUFJLE1BQU07MkJBQUMsa0JBQWtCO3lDQWpEeEIsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNVLEVBQUU7c0JBQWpCLEtBQUs7Z0JBQ1UsWUFBWTtzQkFBM0IsS0FBSztnQkFDVSxZQUFZO3NCQUEzQixLQUFLO2dCQUNVLE1BQU07c0JBQXJCLEtBQUs7Z0JBQ1UsT0FBTztzQkFBdEIsS0FBSztnQkFDVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLE9BQU87c0JBQXRCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSztnQkFDVSxhQUFhO3NCQUE1QixLQUFLO2dCQUNVLFlBQVk7c0JBQTNCLEtBQUs7Z0JBRUssUUFBUTtzQkFEbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDIyIEVwaG94IENvcnBvcmF0aW9uIERCQSBUaW55IFRlY2hub2xvZ2llcywgSW5jLlxuICogQ29weXJpZ2h0IChjKSAyMDI1IEh1Z2VSVEUgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEh1Z2VSVEUgQW5ndWxhciBpbnRlZ3JhdGlvbi5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vaHVnZXJ0ZS9odWdlcnRlLWFuZ3VsYXIvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKlxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcGFyYW1ldGVyLXByb3BlcnRpZXMgKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyLCBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdGlvblRva2VuLFxuICBPcHRpb25hbCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0SHVnZVJURSB9IGZyb20gJy4uL0h1Z2VSVEUnO1xuaW1wb3J0IHsgbGlzdGVuSHVnZVJURUV2ZW50LCBiaW5kSGFuZGxlcnMsIG5vb3AsIGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvVXRpbHMnO1xuaW1wb3J0IHsgRXZlbnRPYmosIEV2ZW50cyB9IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCB0eXBlIHsgRWRpdG9yIGFzIEh1Z2VSVEVFZGl0b3IsIEh1Z2VSVEUgfSBmcm9tICdodWdlcnRlJztcbmltcG9ydCB7IFNjcmlwdExvYWRlciwgaXNUZXh0YXJlYSwgbWVyZ2VQbHVnaW5zLCB1dWlkIH0gZnJvbSAnQGh1Z2VydGUvZnJhbWV3b3JrLWludGVncmF0aW9uLXNoYXJlZCc7XG5cbnR5cGUgRWRpdG9yT3B0aW9ucyA9IFBhcmFtZXRlcnM8SHVnZVJURVsnaW5pdCddPlswXTtcblxuZXhwb3J0IGNvbnN0IEhVR0VSVEVfU0NSSVBUX1NSQyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdIVUdFUlRFX1NDUklQVF9TUkMnKTtcblxuY29uc3QgRURJVE9SX0NPTVBPTkVOVF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEVkaXRvckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgdHlwZSBWZXJzaW9uID0gYCR7JzEnfSR7JycgfCBgLiR7bnVtYmVyfWAgfCBgLiR7bnVtYmVyfS4ke251bWJlcn1gfWA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkaXRvcicsXG4gIHRlbXBsYXRlOiAnJyxcbiAgc3R5bGVzOiBbICc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9JyBdLFxuICBwcm92aWRlcnM6IFsgRURJVE9SX0NPTVBPTkVOVF9WQUxVRV9BQ0NFU1NPUiBdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbi8qKlxuICogVE9ETyBhZGQgZG9jcyBmb3IgaW5wdXRzXG4gKi9cbmV4cG9ydCBjbGFzcyBFZGl0b3JDb21wb25lbnQgZXh0ZW5kcyBFdmVudHMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBwdWJsaWMgY2RuVmVyc2lvbjogVmVyc2lvbiA9ICcxJztcbiAgQElucHV0KCkgcHVibGljIGluaXQ/OiBFZGl0b3JPcHRpb25zO1xuICBASW5wdXQoKSBwdWJsaWMgaWQgPSAnJztcbiAgQElucHV0KCkgcHVibGljIGluaXRpYWxWYWx1ZT86IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG91dHB1dEZvcm1hdD86ICdodG1sJyB8ICd0ZXh0JztcbiAgQElucHV0KCkgcHVibGljIGlubGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB0YWdOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcGx1Z2lucz86IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHRvb2xiYXI/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgQElucHV0KCkgcHVibGljIG1vZGVsRXZlbnRzID0gJ2NoYW5nZSBpbnB1dCB1bmRvIHJlZG8nO1xuICBASW5wdXQoKSBwdWJsaWMgYWxsb3dlZEV2ZW50cz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBASW5wdXQoKSBwdWJsaWMgaWdub3JlRXZlbnRzPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZGlzYWJsZWQodmFsKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fZWRpdG9yLm1vZGU/LnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9lZGl0b3IubW9kZS5zZXQodmFsID8gJ3JlYWRvbmx5JyA6ICdkZXNpZ24nKTtcbiAgICAgIH0gZWxzZSBpZiAoJ3NldE1vZGUnIGluIHRoaXMuX2VkaXRvciAmJiB0eXBlb2YgdGhpcy5fZWRpdG9yLnNldE1vZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldE1vZGUodmFsID8gJ3JlYWRvbmx5JyA6ICdkZXNpZ24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZWRpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gIH1cblxuICBwdWJsaWMgbmdab25lOiBOZ1pvbmU7XG5cbiAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfZWxlbWVudD86IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9kaXNhYmxlZD86IGJvb2xlYW47XG4gIHByaXZhdGUgX2VkaXRvcj86IEh1Z2VSVEVFZGl0b3I7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogYW55O1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoSFVHRVJURV9TQ1JJUFRfU1JDKSBwcml2YXRlIGh1Z2VydGVTY3JpcHRTcmM/OiBzdHJpbmdcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICB0aGlzLm5nWm9uZSA9IG5nWm9uZTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5zZXRDb250ZW50KGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlKSA/ICcnIDogdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxWYWx1ZSA9IHZhbHVlID09PSBudWxsID8gdW5kZWZpbmVkIDogdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgdXVpZCgnaHVnZXJ0ZS1hbmd1bGFyJyk7XG4gICAgICB0aGlzLmlubGluZSA9IHRoaXMuaW5saW5lICE9PSB1bmRlZmluZWQgPyB0aGlzLmlubGluZSAhPT0gZmFsc2UgOiAhISh0aGlzLmluaXQ/LmlubGluZSk7XG4gICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgIGlmIChnZXRIdWdlUlRFKCkgIT09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS5sb2coZ2V0SHVnZVJURSgpIS5iYXNlVVJJLnNvdXJjZSlcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2VsZW1lbnQgJiYgdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIG5ldyBPYnNlcnZhYmxlPHZvaWQ+KChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgIFNjcmlwdExvYWRlci5sb2FkKHRoaXMuX2VsZW1lbnQhLm93bmVyRG9jdW1lbnQsIHRoaXMuZ2V0U2NyaXB0U3JjKCksICgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLmluaXRpYWxpc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcblxuICAgIHRoaXMuX2VkaXRvciAmJiBnZXRIdWdlUlRFKCk/LnJlbW92ZSh0aGlzLl9lZGl0b3IpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IHR5cGVvZiB0aGlzLnRhZ05hbWUgPT09ICdzdHJpbmcnID8gdGhpcy50YWdOYW1lIDogJ2Rpdic7XG4gICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5pbmxpbmUgPyB0YWdOYW1lIDogJ3RleHRhcmVhJyk7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xuICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudCAmJiBleGlzdGluZ0VsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogW1wiZXJyb3JcIiwgeyBhbGxvdzogW1wid2FyblwiXSB9XSAqL1xuICAgICAgICBjb25zb2xlLndhcm4oYEh1Z2VSVEUtQW5ndWxhcjogYW4gZWxlbWVudCB3aXRoIGlkIFske3RoaXMuaWR9XSBhbHJlYWR5IGV4aXN0cy4gRWRpdG9ycyB3aXRoIGR1cGxpY2F0ZSBJZCB3aWxsIG5vdCBiZSBhYmxlIHRvIG1vdW50YCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9lbGVtZW50LmlkID0gdGhpcy5pZDtcbiAgICAgIGlmIChpc1RleHRhcmVhKHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZpbmFsSW5pdDogRWRpdG9yT3B0aW9ucyA9IHtcbiAgICAgIC4uLnRoaXMuaW5pdCxcbiAgICAgIHNlbGVjdG9yOiB1bmRlZmluZWQsXG4gICAgICB0YXJnZXQ6IHRoaXMuX2VsZW1lbnQsXG4gICAgICBpbmxpbmU6IHRoaXMuaW5saW5lLFxuICAgICAgcmVhZG9ubHk6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBwbHVnaW5zOiBtZXJnZVBsdWdpbnMoKHRoaXMuaW5pdCAmJiB0aGlzLmluaXQucGx1Z2lucykgYXMgc3RyaW5nLCB0aGlzLnBsdWdpbnMpLFxuICAgICAgdG9vbGJhcjogdGhpcy50b29sYmFyIHx8ICh0aGlzLmluaXQgJiYgdGhpcy5pbml0LnRvb2xiYXIpLFxuICAgICAgc2V0dXA6IChlZGl0b3I6IEh1Z2VSVEVFZGl0b3IpID0+IHtcbiAgICAgICAgdGhpcy5fZWRpdG9yID0gZWRpdG9yO1xuXG4gICAgICAgIGxpc3Rlbkh1Z2VSVEVFdmVudChlZGl0b3IsICdpbml0JywgdGhpcy5kZXN0cm95JCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRFZGl0b3IoZWRpdG9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmluZEhhbmRsZXJzKHRoaXMsIGVkaXRvciwgdGhpcy5kZXN0cm95JCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdCAmJiB0eXBlb2YgdGhpcy5pbml0LnNldHVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5pbml0LnNldHVwKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGlzVGV4dGFyZWEodGhpcy5fZWxlbWVudCkpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGdldEh1Z2VSVEUoKT8uaW5pdChmaW5hbEluaXQpO1xuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgZ2V0U2NyaXB0U3JjKCkge1xuICAgIGxldCBzcmMgPSBpc051bGxPclVuZGVmaW5lZCh0aGlzLmh1Z2VydGVTY3JpcHRTcmMpID9cbiAgICAgIGBodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2h1Z2VydGVAJHt0aGlzLmNkblZlcnNpb259L2h1Z2VydGUubWluLmpzYCA6XG4gICAgICB0aGlzLmh1Z2VydGVTY3JpcHRTcmM7XG5cbiAgICByZXR1cm4gc3JjO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RWRpdG9yKGVkaXRvcjogSHVnZVJURUVkaXRvcikge1xuICAgIGxpc3Rlbkh1Z2VSVEVFdmVudChlZGl0b3IsICdibHVyJywgdGhpcy5kZXN0cm95JCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpKTtcbiAgICB9KTtcblxuICAgIGxpc3Rlbkh1Z2VSVEVFdmVudChlZGl0b3IsIHRoaXMubW9kZWxFdmVudHMsIHRoaXMuZGVzdHJveSQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZW1pdE9uQ2hhbmdlKGVkaXRvcikpO1xuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmluaXRpYWxWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIGVkaXRvci5zZXRDb250ZW50KHRoaXMuaW5pdGlhbFZhbHVlIGFzIHN0cmluZyk7XG4gICAgICAgIGlmIChlZGl0b3IuZ2V0Q29udGVudCgpICE9PSB0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgIHRoaXMuZW1pdE9uQ2hhbmdlKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25Jbml0TmdNb2RlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5vbkluaXROZ01vZGVsLmVtaXQoZWRpdG9yIGFzIHVua25vd24gYXMgRXZlbnRPYmo8YW55Pik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdE9uQ2hhbmdlKGVkaXRvcjogSHVnZVJURUVkaXRvcikge1xuICAgIGlmICh0aGlzLm9uQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhlZGl0b3IuZ2V0Q29udGVudCh7IGZvcm1hdDogdGhpcy5vdXRwdXRGb3JtYXQgfSkpO1xuICAgIH1cbiAgfVxufVxuIl19