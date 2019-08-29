import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CellDataContext } from './cell-data-context';

@Directive({
  selector: "[data-table-column]"
})
export class DataTableColumnDirective {
  @Input("data-table-columnAlign") align: string = "left";
  @Input("data-table-columnVerticalAlign") verticalAlign: string = "top";
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

  @Input("data-table-columnSort") set sort(values: string[]) {
    if (values == null || Array.isArray(values)){
      this._sortfields = values
    } 
    else {
      this._sortfields = [values];
    }
  }
  get sort(): string[] {
    return this._sortfields;
  }
  private _sortfields: string[];

  @Input("data-table-columnGroupColumns") groupColumns: number = 0;
  @Input("data-table-columnGroupHeader") set groupHeader(values: string[]){
    if (values == null || Array.isArray(values)) {
      this._groupHeaders = values;
    }
    else {
      this._groupHeaders = [values];
    }

  }
  get groupHeader(): string[] {
    return this._groupHeaders;
  }
  private _groupHeaders: string[];

  @Input("data-table-columnSortFieldName") sortFieldName: string;
  @Input("data-table-columnWidth") columnWidth: string;

  get dtcStyle() {
    let columnStyle = {
      "text-align": this.align,
      "vertical-align": this.verticalAlign
    };
    if (this.columnWidth != null && this.columnWidth.length > 0) {
      columnStyle["width"] = this.columnWidth;
    }
    return columnStyle;
  }

  constructor(
    private _columnTemplate: TemplateRef<CellDataContext>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  get ColumnTemplate(): TemplateRef<any> {
    return this._columnTemplate;
  }
}
