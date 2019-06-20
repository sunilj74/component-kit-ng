import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { CellDataContext } from './cell-data-context';

@Directive({
  selector: "[data-table-child]"
})
export class DataTableChildDirective {
  constructor(
    private _childTemplate: TemplateRef<CellDataContext>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  get ChildTemplate(): TemplateRef<any> {
    return this._childTemplate;
  }
}
