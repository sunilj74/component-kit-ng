import { Component, Input, ViewChild, ViewContainerRef, SimpleChanges, EmbeddedViewRef } from '@angular/core';
import { DataTableColumnDirective } from '../data-table-column.directive';
import { DataTableChildDirective } from '../data-table-child.directive';
import { CellDataContext } from '../cell-data-context';

@Component({
  selector: "data-table-cell",
  templateUrl: "./data-table-cell.component.html",
  styleUrls: ["./data-table-cell.component.css"]
})
export class DataTableCellComponent {
  @Input() data: any;
  @Input() fadein: string;
  @Input() editing: boolean = false;
  @Input() rowIndex: number = -1;
  @Input() column: DataTableColumnDirective;
  @Input() child: DataTableChildDirective;
  @ViewChild("gridCell", { read: ViewContainerRef, static: true }) _cellContainerRef: ViewContainerRef;

  viewColumn: EmbeddedViewRef<any> = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] || changes["column"] || changes["child"]) {
      if (this.data != null) {
        if (this.column != null) {
          this.viewColumn = this._cellContainerRef.createEmbeddedView(
            this.column.ColumnTemplate,
            new CellDataContext(this.data, this.editing, this.rowIndex)
          );
        }
        if (this.child != null) {
          let viewChild = this._cellContainerRef.createEmbeddedView(
            this.child.ChildTemplate,
            new CellDataContext(this.data, false, this.rowIndex)
          );
        }
      }
    }
    else if(changes["editing"]&&this.viewColumn!=null){
      this.viewColumn.context.update(this.editing);
    }
  }
}
