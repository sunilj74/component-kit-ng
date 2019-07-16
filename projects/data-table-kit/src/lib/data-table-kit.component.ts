import { Component, Input, Output, EventEmitter, SimpleChanges, AfterContentInit, AfterViewInit, ContentChildren, QueryList, ViewContainerRef, ViewChild, TemplateRef, Inject, ChangeDetectionStrategy, ViewChildren, ElementRef } from '@angular/core';
import { DataTableColumnDirective } from './data-table-column.directive';
import { DataTableChildDirective } from './data-table-child.directive';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "data-table",
  templateUrl: "./data-table-kit.component.html",
  styleUrls: ["./data-table-kit.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableKitComponent implements AfterContentInit, AfterViewInit {
  @ViewChild("gridBody", { read: ViewContainerRef, static: false }) _viewContainerRef: ViewContainerRef;
  @ViewChild("columnTemplate", { static: false }) _columnTemplate: TemplateRef<any>;
  @ViewChild("tableHeader", { static: false }) TableHeader: ElementRef;
  @ContentChildren(DataTableColumnDirective) Columns: QueryList<DataTableColumnDirective>;
  @ContentChildren(DataTableChildDirective) Children: QueryList<DataTableChildDirective>;
  @Input("data-table-class") datatableClass: string;
  @Input() tabledata: any[];
  @Input() datacount: number = 0;
  @Input("buffered-page-no") bufferedpageno: number;
  @Input("buffered-page-count") bufferedpagecount: number;
  @Input() allowResize: boolean = true;
  @Input() pagesize: number = 0;
  @Input("collapse-children") collapseChildren: any = null;
  @Input("allow-multiselect") multiSelect: boolean = false;
  @Output() bufferedPageNoChanged = new EventEmitter<any>();
  @Output() sortOrderChanged = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() editStarted = new EventEmitter<any>();
  @Output() editCompleted = new EventEmitter<any>();
  @Output() editCancelled = new EventEmitter<any>();

  pageno: number = 0;
  pagedata: any[];
  groups: any[];
  columnCount: number = 0;
  resizeInfo: any = null;
  totalpages: number[];
  fadein: string;
  haschildren: boolean = false;
  sortInfo: any[] = [];
  gridid: string = "g" + this.uuidv4();
  selectedRows: any[] = [];
  editingRow: number = -1;

  gridStyle: any = {
    thSep: {
      padding: "0px",
      "border-top": "1px solid lightgray",
      "border-bottom": "1px solid lightgray",
      "border-right": "1px solid lightgray",
      width: "4px"
    },
    thSepGroup: {
      padding: "0px",
      "border-top": "1px solid lightgray",
      "border-bottom": "0px solid lightgray",
      "border-right": "1px solid lightgray",
      width: "4px"
    },
    tdSep: {
      width: "1px",
      padding: "0px"
    },
    th: {
      "vertical-align": "bottom",
      "border-top": "1px solid lightgray",
      "border-bottom": "1px solid lightgray"
    },
    thGroup: {
      "text-align": "center",
      "vertical-align": "bottom",
      "border-top": "1px solid lightgray",
      "border-bottom": "0px solid lightgray"
    },
    thGroupLabel: {
      "text-align": "center",
      "vertical-align": "bottom",
      "border-top": "1px solid lightgray",
      "border-bottom": "1px solid lightgray"
    },
    td: {}
  };

  gridClass: any = {
    thSep: "",
    tdSep: "",
    th: "data-table-col-header",
    td: "data-table-col-data"
  };

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngAfterContentInit() {
    this.haschildren = this.Children != null && this.Children.length > 0;
    this.columnCount = this.Columns == null ? 0 : this.Columns.length * 2 - 1;
    this.setupColumns();
  }

  ngAfterViewInit(){
    // following code is to fix columns from resizing on page change and edit
    if(this.TableHeader!=null&&this.TableHeader.nativeElement!=null&&this.TableHeader.nativeElement.children!=null){
      let children = this.TableHeader.nativeElement.children;
      for(let i=0;i<(children.length-1);i++){
        if(children[i]!=null){
          children[i].style.width = children[i].clientWidth+"px";
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["allowResize"]) {
      if (this.allowResize) {
        this.gridStyle.thSep["cursor"] = "col-resize";
      } else {
        delete this.gridStyle.thSep["cursor"];
      }
    }
    if (changes["tabledata"] || changes["pagesize"] || changes["datacount"]) {
      this.analyzeTableData();
      this.updatePageData();
    }

    if (changes["tabledata"]) {
      if (this._viewContainerRef != null) {
        this._viewContainerRef.createEmbeddedView(this._columnTemplate);
      }
    }
  }

  headers(gcColumn: any): any[] {
    return gcColumn.headers;
  }

  setupColumns() {
    let groupHeaders = [];
    let found = false;
    if (this.Columns != null) {
      let columns = this.Columns.toArray();
      let noWidthColumns = columns.filter(p=>p.columnWidth==null||p.columnWidth=="");
      if(noWidthColumns.length>1){
        let equalWidth = `${Math.round(100/noWidthColumns.length)}px`;
        noWidthColumns.splice(noWidthColumns.length-1, 1);
        //noWidthColumns.forEach(p=>p.columnWidth=equalWidth);
      }
      //update group header to empty for columns where it is not specified
      let i = 0;
      while (i < columns.length) {
        let group = {};
        group["colStyle"] = this.gridStyle.thGroup;
        if (columns[i] != null) {
          if (columns[i].groupHeader != null) {
            found = true;
            group["headers"] = columns[i].groupHeader;
            if (!Array.isArray(group["headers"])) {
              group["headers"] = [group["headers"]];
            }
          }
          if (columns[i].groupColumns != null && columns[i].groupColumns > 1) {
            found = true;
            group["colspan"] = columns[i].groupColumns * 2 - 1;
            i = i + columns[i].groupColumns - 1;
          }
          if (found) {
            group["colStyle"] = this.gridStyle.thGroupLabel;
          }
        }
        groupHeaders.push(group);
        i = i + 1;
      }
    }
    if (found) {
      this.groups = groupHeaders;
      this.gridStyle.th["border-top"] = "0px solid lightgray";
      this.gridStyle.thSep["border-top"] = "0px solid lightgray";
    } else {
      this.groups = null;
    }
  }

  analyzeTableData() {
    let datalength = 0;
    if (this.datacount != 0) {
      datalength = this.datacount;
    } else if (this.tabledata != null) {
      datalength = this.tabledata.length;
    }

    this.fadein = null;
    this.totalpages = [];
    if (this.pagesize != 0 && datalength > this.pagesize) {
      let pagecount = Math.ceil(datalength / this.pagesize);
      this.totalpages = [];
      for (let i = 0; i < pagecount; i++) {
        this.totalpages.push(i + 1);
      }
    }
  }

  updatePageData() {
    if (
      this.pagesize == 0 ||
      this.tabledata == null ||
      this.tabledata.length <= this.pagesize
    ) {
      this.pagedata = this.tabledata;
      this.fadein = null;
    } else {
      let start = this.pageno * this.pagesize;
      let end = start + this.pagesize * 1;
      if (this.bufferedpageno != null && this.bufferedpagecount != null) {
        let currentFrom =
          this.bufferedpageno * this.bufferedpagecount * this.pagesize;
        let currentTo = currentFrom + this.tabledata.length - 1;
        if (start < currentFrom || start > currentTo) {
          let refreshPage = Math.floor(
            start / (this.bufferedpagecount * this.pagesize)
          );
          this.bufferedPageNoChanged.emit({
            newPageNo: refreshPage,
            currentPageNo: this.bufferedpageno
          });
          return;
        } else {
          start -= currentFrom;
          end -= currentFrom;
        }
      }

      this.pagedata = this.tabledata.slice(start, end);
      if (this.pageno > 0) {
        this.fadein = "data-table-fade-in";
      }
    }
  }

  setFirstPage() {
    if (this.pageno > 0) {
      let page = 0;
      this.setPage(page);
    }
  }

  setPrevPage() {
    if (this.pageno > 0) {
      let page = this.pageno - 1;
      this.setPage(page);
    }
  }

  setNextPage() {
    if (this.pageno < this.totalpages.length - 1) {
      let page = this.pageno + 1;
      this.setPage(page);
    }
  }

  setLastPage() {
    if (this.pageno < this.totalpages.length - 1) {
      let page = this.totalpages.length - 1;
      this.setPage(page);
    }
  }

  gotoPage(pageNo) {
    if (pageNo !== "") {
      let page: number = parseInt(pageNo);
      if (page > 0 && page <= this.totalpages.length) {
        page--;
        this.setPage(page);
      }
    }
  }

  setPage(page) {
    if (this.pageno != page) {
      this.pageno = page;
      this.updatePageData();
    }
  }

  resizeColumn(e) {
    if (!this.allowResize) {
      return;
    }
    if (this.resizeInfo != null && e != null) {
      if (e.buttons == 0) {
        this.resizeInfo = null;
      } else {
        let diff = this.resizeInfo.startX - e.pageX;
        let width = this.resizeInfo.element.clientWidth;
        let newWidth = width - (diff + 2);
        if (newWidth > 0) {
          if (this.resizeInfo.fixColumns > 0) {
            for (let i = 0; i < this.resizeInfo.fixColumns; i++) {
              if (i % 2 == 0 && this.resizeInfo.children.length > i) {
                this.resizeInfo.children[i].style.width =
                  this.resizeInfo.children[i].clientWidth + "px";
              }
            }
            this.resizeInfo.fixColumns = 0;
          }
          this.resizeInfo.startX = e.pageX;
          this.resizeInfo.element.style.width = newWidth + "px";
        }
      }
    }
  }

  resizeColumnEnd(e) {
    if (!this.allowResize) {
      return;
    }
    this.resizeInfo = null;
  }

  resizeColumnStart(e) {
    if (!this.allowResize) {
      return;
    }
    if (e != null && e.target != null) {
      let target = e.target;
      let parent = target.parentElement;
      if (parent != null) {
        let children = parent.children;
        if (children != null && children.length > 0) {
          let columnIndex = -1;
          for (let i = 0; i < children.length; i++) {
            if (children[i] == target) {
              columnIndex = i;
              break;
            }
          }
          if (columnIndex > 0) {
            this.resizeInfo = {
              children: children,
              startX: e.pageX,
              element: children[columnIndex - 1],
              fixColumns: columnIndex - 2
            };
          }
        }
      }
    }
  }

  toggleChildren(event, rowidx) {
    if (this.doc != null) {
      let id = this.gridid + "_" + rowidx + "_inner";
      let target = event.target;
      let childTablesElement = this.doc.querySelector("#" + id);
      if (childTablesElement != null) {
        let datatoggle = target.getAttribute("data-toggle");
        let collapse = "-" == datatoggle;
        this.dataTableCollapseChild(target, childTablesElement, collapse);
      }
    }
  }

  dataTableCollapseChild(toggler, child, collapse) {
    if (collapse) {
      if (child != null) {
        child.classList.add("data-table-collapse");
      }
      if (toggler != null) {
        toggler.setAttribute("data-toggle", "+");
        toggler.classList.remove("data-table-minus");
        toggler.classList.add("data-table-plus");
      }
    } else {
      if (child != null) {
        child.classList.remove("data-table-collapse");
      }
      if (toggler != null) {
        toggler.classList.remove("data-table-plus");
        toggler.classList.add("data-table-minus");
        toggler.setAttribute("data-toggle", "-");
      }
    }
  }

  dataTableCollapseChildren(event, collapse) {
    if (this.doc != null) {
      let toggler = this.doc.querySelectorAll(
        ".data-table-toggler-" + this.gridid
      );
      let children = this.doc.querySelectorAll(
        ".data-table-children-" + this.gridid
      );
      let count = Math.min(toggler.length, children.length);
      for (let i = 0; i < count; i++) {
        this.dataTableCollapseChild(toggler[i], children[i], collapse);
      }
      this.collapseChildren = collapse;
    }
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  clearSort() {
    for (let i = 0; i < this.sortInfo.length; i++) {
      let sort = this.sortInfo[i];
      if (sort != null) {
        sort.sortButton.classList.remove("sorted");
      }
    }
    this.sortInfo = [];
  }

  sortColumn(event, colSort, aord) {
    if (colSort == null || colSort.length == 0) {
      return;
    }
    let target = event.target;
    if (!event.ctrlKey) {
      this.clearSort();
    }
    for (let i = 0; i < colSort.length; i++) {
      let idx = -1;
      let skip = false;
      for (let j = 0; j < this.sortInfo.length; j++) {
        let sort = this.sortInfo[j];
        if (sort != null && sort.field == colSort[i]) {
          sort.sortButton.classList.remove("sorted");
          idx = j;
          if (sort.aord == aord) {
            skip = true;
          }
          break;
        }
      }
      if (idx != -1) {
        this.sortInfo.splice(idx, 1);
      }
      if (!skip) {
        this.sortInfo.push({
          field: colSort[i],
          sortButton: event.target,
          aord: aord
        });
        event.target.classList.add("sorted");
      }
    }

    if (
      this.sortOrderChanged.observers == null ||
      this.sortOrderChanged.observers.length == 0
    ) {
      let sortColumns = [];
      this.sortInfo.forEach(sort => {
        if (sort != null) {
          sortColumns.push(`${sort.field}:${sort.aord}`);
        }
      });
      let sortText = sortColumns.join(",");
      this.tabledata = this.quickSort(this.tabledata, sortText);
      this.analyzeTableData();
      this.updatePageData();
    } else {
      let sortOrder = this.sortInfo.map(p => {
        return {
          field: p.field,
          mode: p.aord
        };
      });
      this.sortOrderChanged.emit(sortOrder);
    }
  }

  quickSort(data: any[], orderBy: string): any[] {
    if (data == null || orderBy == null || orderBy.length == 0) {
      return data;
    }
    let sortFields = orderBy
      .split(",")
      .map(f => f.trim().split(":"))
      .map(f => {
        if (f == null || f.length == 0) {
          return null;
        }
        let field = f[0];
        let mode = f.length > 1 ? f[1] : "a";
        if (mode != "a" && mode != "A" && mode != "d" && mode != "D") {
          mode = "a";
        }
        return {
          field: field,
          mode: mode.toLowerCase()
        };
      })
      .filter(f => f != null);
    return data.sort((rowA, rowB) => {
      if (rowB == null || rowA == null) {
        return 1;
      }
      for (let sortField of sortFields) {
        let factor = sortField.mode == "d" ? -1 : 1;
        let valueA = this.propertyValue(rowA, sortField.field);
        let valueB = this.propertyValue(rowB, sortField.field);
        if (valueA < valueB) {
          return -1 * factor;
        }
        if (valueA > valueB) {
          return 1 * factor;
        }
      }
      return 0;
    });
  }

  propertyValue(obj: any, propertyPath: string) {
    while (Array.isArray(obj)) {
      if (obj.length > 0) {
        obj = obj[0];
      } else {
        obj = null;
      }
    }
    if (obj == null) {
      return null;
    }
    propertyPath = propertyPath
      .split(".")
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .join(".");
    let propertyName = propertyPath;
    let rightPath: string = null;
    let dotIndex = propertyPath.indexOf(".");
    if (dotIndex == 0) {
      propertyName = propertyPath.substr(1);
    } else if (dotIndex > 0) {
      propertyName = propertyPath.substr(0, dotIndex);
      rightPath = propertyPath.substr(dotIndex + 1);
    }
    let value: any = obj[propertyName];
    if (rightPath != null) {
      return this.propertyValue(value, rightPath);
    }
    return value;
  }

  clearSelections() {
    this.selectedRows = [];
    let rowSelector = `#grid_${this.gridid}>tbody>tr`;
    let allRows = this.doc.querySelectorAll(rowSelector);
    allRows.forEach(p => {
      if (p != null && p.classList != null) {
        p.classList.remove("data-table-selected");
      }
    });
  }

  clickRow(event, rowIdx) {
    let adjustedRowIdx = rowIdx + this.pageno * this.pagesize;
    if(this.editingRow!=adjustedRowIdx){
      this.clearEdits();
    }
    let clear = true;
    if (this.multiSelect) {
      if (event != null && event.ctrlKey) {
        clear = false;
      }
    }
    if (clear) {
      this.clearSelections();
    }
    let idx = this.selectedRows.indexOf(adjustedRowIdx);
    if (idx != -1) {
      this.selectedRows.splice(idx, 1);
    } else {
      this.selectedRows.push(adjustedRowIdx);
    }
    let cllickInfo = {
      event: event,
      rowIdx: adjustedRowIdx,
      selectedRows: this.selectedRows.map(p => p),
      bufferOffset: this.bufferedpageno * this.bufferedpagecount * this.pagesize
    };
    let trElement = event.currentTarget;
    if (trElement != null) {
      trElement.classList.toggle("data-table-selected");
    }
    this.selectionChanged.emit(cllickInfo);
  }

  clearEdits(){
    this.editingRow = -1;
  }

  dblclickRow(event, rowIdx){
    console.log("edit row "+rowIdx);
    this.editingRow = rowIdx;
  }
}

