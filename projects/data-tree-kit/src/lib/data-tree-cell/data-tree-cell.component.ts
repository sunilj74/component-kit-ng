import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, SimpleChanges } from '@angular/core';
import { TreeDataContext } from '../TreeDataContext';

@Component({
  selector: "data-tree-cell",
  templateUrl: "./data-tree-cell.component.html",
  styleUrls: ["./data-tree-cell.component.css"]
})
export class DataTreeCellComponent {
  @Input() data: any;
  @Input() treeTemplate: TemplateRef<any>;
  @ViewChild("treeCell", { read: ViewContainerRef, static: true })
  _cellContainerRef: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] || changes["treeTemplate"]) {
      if (this.data != null && this.treeTemplate != null) {
        let view = this._cellContainerRef.createEmbeddedView(
          this.treeTemplate,
          new TreeDataContext(this.data)
        );
      }
    }
  }
}
