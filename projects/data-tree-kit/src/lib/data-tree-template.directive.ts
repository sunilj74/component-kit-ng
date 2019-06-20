import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TreeDataContext } from './TreeDataContext';

@Directive({
  selector: "[data-tree-template]"
})
export class DataTreeTemplateDirective {
  constructor(
    private _treeTemplate: TemplateRef<TreeDataContext>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  get TreeTemplate(): TemplateRef<any> {
    return this._treeTemplate;
  }
}
