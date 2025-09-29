import { Output, EventEmitter, Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class Events {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.1", ngImport: i0, type: Events, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.1", type: Events, outputs: { onBeforePaste: "onBeforePaste", onBlur: "onBlur", onClick: "onClick", onCommentChange: "onCommentChange", onCompositionEnd: "onCompositionEnd", onCompositionStart: "onCompositionStart", onCompositionUpdate: "onCompositionUpdate", onContextMenu: "onContextMenu", onCopy: "onCopy", onCut: "onCut", onDblclick: "onDblclick", onDrag: "onDrag", onDragDrop: "onDragDrop", onDragEnd: "onDragEnd", onDragGesture: "onDragGesture", onDragOver: "onDragOver", onDrop: "onDrop", onFocus: "onFocus", onFocusIn: "onFocusIn", onFocusOut: "onFocusOut", onKeyDown: "onKeyDown", onKeyPress: "onKeyPress", onKeyUp: "onKeyUp", onMouseDown: "onMouseDown", onMouseEnter: "onMouseEnter", onMouseLeave: "onMouseLeave", onMouseMove: "onMouseMove", onMouseOut: "onMouseOut", onMouseOver: "onMouseOver", onMouseUp: "onMouseUp", onPaste: "onPaste", onSelectionChange: "onSelectionChange", onActivate: "onActivate", onAddUndo: "onAddUndo", onBeforeAddUndo: "onBeforeAddUndo", onBeforeExecCommand: "onBeforeExecCommand", onBeforeGetContent: "onBeforeGetContent", onBeforeRenderUI: "onBeforeRenderUI", onBeforeSetContent: "onBeforeSetContent", onChange: "onChange", onClearUndos: "onClearUndos", onDeactivate: "onDeactivate", onDirty: "onDirty", onExecCommand: "onExecCommand", onGetContent: "onGetContent", onHide: "onHide", onInit: "onInit", onInput: "onInput", onInitNgModel: "onInitNgModel", onLoadContent: "onLoadContent", onNodeChange: "onNodeChange", onPostProcess: "onPostProcess", onPostRender: "onPostRender", onPreInit: "onPreInit", onPreProcess: "onPreProcess", onProgressState: "onProgressState", onRedo: "onRedo", onRemove: "onRemove", onReset: "onReset", onResizeEditor: "onResizeEditor", onSaveContent: "onSaveContent", onSetAttrib: "onSetAttrib", onObjectResizeStart: "onObjectResizeStart", onObjectResized: "onObjectResized", onObjectSelected: "onObjectSelected", onSetContent: "onSetContent", onShow: "onShow", onSubmit: "onSubmit", onUndo: "onUndo", onVisualAid: "onVisualAid" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.1", ngImport: i0, type: Events, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaHVnZXJ0ZS1hbmd1bGFyLWNvbXBvbmVudC9zcmMvbWFpbi90cy9lZGl0b3IvRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTaEUsTUFBTSxPQUFPLE1BQU07SUFDQSxhQUFhLEdBQTJDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDM0UsTUFBTSxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2hFLE9BQU8sR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNsRix1SUFBdUk7SUFDdEgsZUFBZSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2xFLGdCQUFnQixHQUE2QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2hGLGtCQUFrQixHQUE2QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2xGLG1CQUFtQixHQUE2QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25GLGFBQWEsR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN2RSxNQUFNLEdBQTJDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDcEUsS0FBSyxHQUEyQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25FLFVBQVUsR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNwRSxNQUFNLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDL0QsVUFBVSxHQUFzQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25FLFNBQVMsR0FBc0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNsRSxhQUFhLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdEUsVUFBVSxHQUFzQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25FLE1BQU0sR0FBc0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMvRCxPQUFPLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDakUsU0FBUyxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25FLFVBQVUsR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNwRSxTQUFTLEdBQTBDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdEUsVUFBVSxHQUEwQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3ZFLE9BQU8sR0FBMEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNwRSxXQUFXLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDckUsWUFBWSxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3RFLFlBQVksR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN0RSxXQUFXLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDckUsVUFBVSxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3BFLFdBQVcsR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNyRSxTQUFTLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkUsT0FBTyxHQUEyQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3JFLGlCQUFpQixHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3RFLFVBQVUsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM3RCxTQUFTLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDNUQsZUFBZSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2xFLG1CQUFtQixHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3RFLGtCQUFrQixHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3JFLGdCQUFnQixHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25FLGtCQUFrQixHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3JFLFFBQVEsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMzRCxZQUFZLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDL0QsWUFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQy9ELE9BQU8sR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMxRCxhQUFhLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDaEUsWUFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQy9ELE1BQU0sR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN6RCxNQUFNLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDekQsT0FBTyxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzFELGFBQWEsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDtJQUNySCxhQUFhLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDaEUsWUFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQy9ELGFBQWEsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNoRSxZQUFZLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDL0QsU0FBUyxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsb0RBQW9EO0lBQ2pILFlBQVksR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMvRCxlQUFlLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbEUsTUFBTSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pELFFBQVEsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMzRCxPQUFPLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDMUQsY0FBYyxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2pFLGFBQWEsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNoRSxXQUFXLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDOUQsbUJBQW1CLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdEUsZUFBZSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2xFLGdCQUFnQixHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25FLFlBQVksR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMvRCxNQUFNLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDekQsUUFBUSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzNELE1BQU0sR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN6RCxXQUFXLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7dUdBdkVwRSxNQUFNOzJGQUFOLE1BQU07OzJGQUFOLE1BQU07a0JBRGxCLFNBQVM7OEJBRVMsYUFBYTtzQkFBN0IsTUFBTTtnQkFDVSxNQUFNO3NCQUF0QixNQUFNO2dCQUNVLE9BQU87c0JBQXZCLE1BQU07Z0JBRVUsZUFBZTtzQkFBL0IsTUFBTTtnQkFDVSxnQkFBZ0I7c0JBQWhDLE1BQU07Z0JBQ1Usa0JBQWtCO3NCQUFsQyxNQUFNO2dCQUNVLG1CQUFtQjtzQkFBbkMsTUFBTTtnQkFDVSxhQUFhO3NCQUE3QixNQUFNO2dCQUNVLE1BQU07c0JBQXRCLE1BQU07Z0JBQ1UsS0FBSztzQkFBckIsTUFBTTtnQkFDVSxVQUFVO3NCQUExQixNQUFNO2dCQUNVLE1BQU07c0JBQXRCLE1BQU07Z0JBQ1UsVUFBVTtzQkFBMUIsTUFBTTtnQkFDVSxTQUFTO3NCQUF6QixNQUFNO2dCQUNVLGFBQWE7c0JBQTdCLE1BQU07Z0JBQ1UsVUFBVTtzQkFBMUIsTUFBTTtnQkFDVSxNQUFNO3NCQUF0QixNQUFNO2dCQUNVLE9BQU87c0JBQXZCLE1BQU07Z0JBQ1UsU0FBUztzQkFBekIsTUFBTTtnQkFDVSxVQUFVO3NCQUExQixNQUFNO2dCQUNVLFNBQVM7c0JBQXpCLE1BQU07Z0JBQ1UsVUFBVTtzQkFBMUIsTUFBTTtnQkFDVSxPQUFPO3NCQUF2QixNQUFNO2dCQUNVLFdBQVc7c0JBQTNCLE1BQU07Z0JBQ1UsWUFBWTtzQkFBNUIsTUFBTTtnQkFDVSxZQUFZO3NCQUE1QixNQUFNO2dCQUNVLFdBQVc7c0JBQTNCLE1BQU07Z0JBQ1UsVUFBVTtzQkFBMUIsTUFBTTtnQkFDVSxXQUFXO3NCQUEzQixNQUFNO2dCQUNVLFNBQVM7c0JBQXpCLE1BQU07Z0JBQ1UsT0FBTztzQkFBdkIsTUFBTTtnQkFDVSxpQkFBaUI7c0JBQWpDLE1BQU07Z0JBQ1UsVUFBVTtzQkFBMUIsTUFBTTtnQkFDVSxTQUFTO3NCQUF6QixNQUFNO2dCQUNVLGVBQWU7c0JBQS9CLE1BQU07Z0JBQ1UsbUJBQW1CO3NCQUFuQyxNQUFNO2dCQUNVLGtCQUFrQjtzQkFBbEMsTUFBTTtnQkFDVSxnQkFBZ0I7c0JBQWhDLE1BQU07Z0JBQ1Usa0JBQWtCO3NCQUFsQyxNQUFNO2dCQUNVLFFBQVE7c0JBQXhCLE1BQU07Z0JBQ1UsWUFBWTtzQkFBNUIsTUFBTTtnQkFDVSxZQUFZO3NCQUE1QixNQUFNO2dCQUNVLE9BQU87c0JBQXZCLE1BQU07Z0JBQ1UsYUFBYTtzQkFBN0IsTUFBTTtnQkFDVSxZQUFZO3NCQUE1QixNQUFNO2dCQUNVLE1BQU07c0JBQXRCLE1BQU07Z0JBQ1UsTUFBTTtzQkFBdEIsTUFBTTtnQkFDVSxPQUFPO3NCQUF2QixNQUFNO2dCQUNVLGFBQWE7c0JBQTdCLE1BQU07Z0JBQ1UsYUFBYTtzQkFBN0IsTUFBTTtnQkFDVSxZQUFZO3NCQUE1QixNQUFNO2dCQUNVLGFBQWE7c0JBQTdCLE1BQU07Z0JBQ1UsWUFBWTtzQkFBNUIsTUFBTTtnQkFDVSxTQUFTO3NCQUF6QixNQUFNO2dCQUNVLFlBQVk7c0JBQTVCLE1BQU07Z0JBQ1UsZUFBZTtzQkFBL0IsTUFBTTtnQkFDVSxNQUFNO3NCQUF0QixNQUFNO2dCQUNVLFFBQVE7c0JBQXhCLE1BQU07Z0JBQ1UsT0FBTztzQkFBdkIsTUFBTTtnQkFDVSxjQUFjO3NCQUE5QixNQUFNO2dCQUNVLGFBQWE7c0JBQTdCLE1BQU07Z0JBQ1UsV0FBVztzQkFBM0IsTUFBTTtnQkFDVSxtQkFBbUI7c0JBQW5DLE1BQU07Z0JBQ1UsZUFBZTtzQkFBL0IsTUFBTTtnQkFDVSxnQkFBZ0I7c0JBQWhDLE1BQU07Z0JBQ1UsWUFBWTtzQkFBNUIsTUFBTTtnQkFDVSxNQUFNO3NCQUF0QixNQUFNO2dCQUNVLFFBQVE7c0JBQXhCLE1BQU07Z0JBQ1UsTUFBTTtzQkFBdEIsTUFBTTtnQkFDVSxXQUFXO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBFZGl0b3IgYXMgSHVnZVJURUVkaXRvciB9IGZyb20gJ2h1Z2VydGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50T2JqPFQ+IHtcbiAgZXZlbnQ6IFQ7XG4gIGVkaXRvcjogSHVnZVJURUVkaXRvcjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRzIHtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkJlZm9yZVBhc3RlOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8Q2xpcGJvYXJkRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkJsdXI6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxGb2N1c0V2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DbGljazogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPE1vdXNlRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gVE9ETzogc29tZXRoaW5nIGJldHRlciB0aGFuIGFueT8gQnV0IGNvbW1lbnQgY2hhbmdlIGlzIHByb2JhYmx5IGZyb20gYSBUaW55TUNFIHByZW1pdW0gcGx1Z2luIGFueXdheS4gQ2hlY2sgaW4gUmVhY3QgZm9yIHR5cGUgbWF5YmUuXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Db21tZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Db21wb3NpdGlvbkVuZDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPENvbXBvc2l0aW9uRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNvbXBvc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxDb21wb3NpdGlvbkV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Db21wb3NpdGlvblVwZGF0ZTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPENvbXBvc2l0aW9uRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNvbnRleHRNZW51OiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8TW91c2VFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQ29weTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPENsaXBib2FyZEV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DdXQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxDbGlwYm9hcmRFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRGJsY2xpY2s6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxNb3VzZUV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8RHJhZ0V2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnRHJvcDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPERyYWdFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPERyYWdFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ0dlc3R1cmU6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxEcmFnRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdPdmVyOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8RHJhZ0V2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Ecm9wOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8RHJhZ0V2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Gb2N1czogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPEZvY3VzRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkZvY3VzSW46IEV2ZW50RW1pdHRlcjxFdmVudE9iajxGb2N1c0V2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Gb2N1c091dDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPEZvY3VzRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbktleURvd246IEV2ZW50RW1pdHRlcjxFdmVudE9iajxLZXlib2FyZEV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25LZXlQcmVzczogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPEtleWJvYXJkRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbktleVVwOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8S2V5Ym9hcmRFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uTW91c2VEb3duOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8TW91c2VFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uTW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPE1vdXNlRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbk1vdXNlTGVhdmU6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxNb3VzZUV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Nb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxNb3VzZUV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Nb3VzZU91dDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPE1vdXNlRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbk1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPE1vdXNlRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbk1vdXNlVXA6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxNb3VzZUV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25QYXN0ZTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPENsaXBib2FyZEV2ZW50Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxFdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkFkZFVuZG86IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkJlZm9yZUFkZFVuZG86IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkJlZm9yZUV4ZWNDb21tYW5kOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25CZWZvcmVHZXRDb250ZW50OiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25CZWZvcmVSZW5kZXJVSTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQmVmb3JlU2V0Q29udGVudDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DbGVhclVuZG9zOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25EZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25EaXJ0eTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRXhlY0NvbW1hbmQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkdldENvbnRlbnQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkhpZGU6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkluaXQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbklucHV0OiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Jbml0TmdNb2RlbDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpOyAvLyBUT0RPIG5vdCBpbiBAaHVnZXJ0ZS9mcmFtZXdvcmstaW50ZWdyYXRpb24tc2hhcmVkXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25Mb2FkQ29udGVudDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uTm9kZUNoYW5nZTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uUG9zdFByb2Nlc3M6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblBvc3RSZW5kZXI6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblByZUluaXQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gVE9ETyBub3QgaW4gQGh1Z2VydGUvZnJhbWV3b3JrLWludGVncmF0aW9uLXNoYXJlZFxuICBAT3V0cHV0KCkgcHVibGljIG9uUHJlUHJvY2VzczogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uUHJvZ3Jlc3NTdGF0ZTogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uUmVkbzogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNldDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplRWRpdG9yOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25TYXZlQ29udGVudDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uU2V0QXR0cmliOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25PYmplY3RSZXNpemVTdGFydDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uT2JqZWN0UmVzaXplZDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uT2JqZWN0U2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNldENvbnRlbnQ6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNob3c6IEV2ZW50RW1pdHRlcjxFdmVudE9iajxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblN1Ym1pdDogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uVW5kbzogRXZlbnRFbWl0dGVyPEV2ZW50T2JqPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uVmlzdWFsQWlkOiBFdmVudEVtaXR0ZXI8RXZlbnRPYmo8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=