import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TreeDataContext } from './TreeDataContext';

@Directive({
  selector: "[data-tree-header-template]"
})
export class DataTreeHeaderTemplateDirective {

  constructor(
    private _treeHeaderTemplate: TemplateRef<TreeDataContext>,
    private _viewContainerRef: ViewContainerRef
  ) { }

  get TreeHeaderTemplate(): TemplateRef<any> {
    return this._treeHeaderTemplate;
  }

}
