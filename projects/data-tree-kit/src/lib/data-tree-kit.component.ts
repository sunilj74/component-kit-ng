import { Component, Directive, Input, SimpleChanges, ContentChild, ViewContainerRef, ViewChild, TemplateRef, inject, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TreeNodeType } from './tree-node-type';
import { DataTreeTemplateDirective } from './data-tree-template.directive';

@Component({
  selector: "data-tree",
  templateUrl: "./data-tree-kit.component.html",
  styleUrls: ["./data-tree-kit.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreeKitComponent {
  @Input() treeData: TreeNodeType[];
  @Input() rootNode: null;
  @Input() rootId: string = "";
  @Input() isCollapsed: boolean = false;
  @Input("node-class") nodeClass: string = "data-tree-node";
  @Input("leaf-class") leafClass: string = "data-tree-leaf";
  @ContentChild(DataTreeTemplateDirective, { static: false })
  treeTemplate: DataTreeTemplateDirective;
  @ViewChild(DataTreeKitComponent, { static: false })
  subTree: DataTreeKitComponent;
  treeId = new Date().getTime();
  data: TreeNodeType[];

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  get TreeTemplate(): DataTreeTemplateDirective {
    return this.treeTemplate;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != null && changes["treeData"] != null) {
      this.data = null;
      if (this.treeData != null) {
        this.data = [...this.treeData];
      }
    }
  }

  toggleNode(event, node, rootId, treeId, i) {
    let isClosed = !(node.isClosed || false);
    if (event != null && (event.ctrlKey || event.altKey)) {
      let nodeToCollapse = node;
      let branchId =
        this.treeId + "_" + this.rootId + "_" + i + " .data-tree-branch";
      if (event.altKey) {
        nodeToCollapse = this.rootNode || { subGroups: this.data };
        branchId = this.treeId + "_" + this.rootId + " .data-tree-branch";
      }

      this.collapseNodeAndChildren(nodeToCollapse, isClosed);
      console.log("branchid", branchId);
      let branchElement = this.doc.getElementById(branchId);
      if (branchElement != null) {
        if (isClosed) {
          branchElement.classList.remove("in");
        } else {
          branchElement.classList.add("in");
        }
      }
    } else {
      node.isClosed = isClosed;
      let treeRootId = treeId + "_" + rootId + "_" + i;
      let rootElement = this.doc.getElementById(treeRootId);
      if (rootElement != null) {
        rootElement.classList.toggle("in");
      }
    }
  }

  collapseNodeAndChildren(node, toCollapse) {
    node.isClosed = toCollapse;
    if (node.subGroups != null && node.subGroups.length > 0) {
      node.subGroups.forEach(p => this.collapseNodeAndChildren(p, toCollapse));
    }
  }
}


