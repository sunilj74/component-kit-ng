import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CellDataContext } from './cell-data-context';

@Directive({
  selector: "[data-table-column]"
})
export class DataTableColumnDirective {
  @Input("data-table-columnAlign") align: string = "left";
  @Input("data-table-columnHeader") set header(value: string[]) {
    if (Array.isArray(value)) {
      this._header = value;
    } else {
      this._header = [value];
    }
  }
  get header(): string[] {
    return this._header;
  }
  private _header: string[];

  @Input("data-table-columnGroupColumns") groupColumns: number = 0;
  @Input("data-table-columnGroupHeader") groupHeader: any;

  get sgcStyle() {
    return {
      "text-align": this.align
    };
  }

  constructor(
    private _columnTemplate: TemplateRef<CellDataContext>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  get ColumnTemplate(): TemplateRef<any> {
    return this._columnTemplate;
  }
}
