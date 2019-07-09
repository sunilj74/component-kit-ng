import { Component, Input, SimpleChanges, ContentChild, ViewChild, Inject, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TreeNodeType } from './tree-node-type';
import { DataTreeTemplateDirective } from './data-tree-template.directive';
import { DataTreeHeaderTemplateDirective } from './data-tree-header-template.directive';
import { retry } from 'rxjs/operators';

@Component({
  selector: "data-tree",
  templateUrl: "./data-tree-kit.component.html",
  styleUrls: ["./data-tree-kit.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreeKitComponent implements OnInit {
  @Input() treeData: TreeNodeType[];
  @Input() rootNode: null;
  @Input() rootId: string = "";
  @Input() isCollapsed: boolean = false;
  @Input("node-class") nodeClass: string = "data-tree-branch";
  @Input("leaf-class") leafClass: string = "data-tree-leaf";
  @Output() initialized = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any>();
  @ContentChild(DataTreeTemplateDirective, { static: false }) treeTemplate: DataTreeTemplateDirective;
  @ContentChild(DataTreeHeaderTemplateDirective, {static: false}) treeHeaderTemplate: DataTreeHeaderTemplateDirective;
  @ViewChild(DataTreeKitComponent, { static: false })
  subTree: DataTreeKitComponent;
  //treeId = new Date().getTime();
  treeId = this.uuidv4();
  private selectedNode: TreeNodeType;
  private selectedElement: HTMLElement;
  data: TreeNodeType[];
  private parentTree: null;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  get TreeTemplate(): DataTreeTemplateDirective {
    return this.treeTemplate;
  }

  get TreeHeaderTemplate(): DataTreeHeaderTemplateDirective {
    return this.treeHeaderTemplate;
  }

  ngOnInit(){
    this.initialized.emit({tree: this});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != null && changes["treeData"] != null) {
      this.data = null;
      if (this.treeData != null) {
        this.data = [...this.treeData];
      }
    }
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
      let branchElement = this.doc.getElementById(branchId);
      if (branchElement != null) {
        if (isClosed) {
          branchElement.classList.remove("in");
        } else {
          branchElement.classList.add("in");
        }
      }
    }
    else {
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

  clickNode(event, node: TreeNodeType) {
    let tree = this.parentTree?this.parentTree:this;
    let clickInfo = {
      previousNode: tree.selectedNode,
      currentNode: node,
      event: event
    };
    if (tree.selectedNode != node) {
      if (tree.selectedElement != null) {
        tree.selectedElement.classList.remove("data-tree-selected");
      }
      tree.selectedNode = node;
      tree.selectedElement = event.currentTarget;
      tree.selectedElement.classList.add("data-tree-selected");
    }
    tree.selectionChanged.emit(clickInfo);
  }

  handleTreeInit(event){
    event.tree.parentTree = this.parentTree?this.parentTree:this;
  }
}


