import { Component, Input, Output, EventEmitter, SimpleChanges, AfterContentInit, ContentChildren, QueryList, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { DataTableColumnDirective } from './data-table-column.directive';
import { DataTableChildDirective } from './data-table-child.directive';

@Component({
  selector: "data-table",
  templateUrl: "./data-table-kit.component.html",
  styleUrls: ['./data-table-kit.component.css']
})
export class DataTableKitComponent implements AfterContentInit {
  @ViewChild("gridBody", { read: ViewContainerRef, static: false }) _viewContainerRef: ViewContainerRef;
  @ViewChild("columnTemplate", {static: false}) _columnTemplate: TemplateRef<any>;
  @ContentChildren(DataTableColumnDirective) Columns: QueryList<DataTableColumnDirective>;
  @ContentChildren(DataTableChildDirective) Children: QueryList<DataTableChildDirective>;
  @Input("data-table-class") datatableClass = "data-table";
  @Input() griddata: any[];
  @Input() datacount: number = 0;
  @Input("buffered-page-no") bufferedpageno: number;
  @Input("buffered-page-count") bufferedpagecount: number;
  @Input() allowResize: boolean = true;
  @Input() pagesize: number = 0;
  @Input("collapse-children") collapseChildren: any = null;
  @Output() bufferedPageNoChanged = new EventEmitter<any>();

  pageno: number = 0;
  pagedata: any[];
  groups: any[];
  columnCount: number = 0;
  resizeInfo: any = null;
  totalpages: number[];
  fadein: string;
  haschildren: boolean = false;
  gridid: string = "g" + this.uuidv4();

  gridStyle: any = {
    thSep: {
      "padding": "0px",
      "border-top": "1px solid lightgray",
      "border-bottom": "1px solid lightgray",
      "border-right": "1px solid lightgray",
      "width": "4px"
    },
    thSepGroup: {
      "padding": "0px",
      "border-top": "1px solid lightgray",
      "border-bottom": "0px solid lightgray",
      "border-right": "1px solid lightgray",
      "width": "4px"
    },
    tdSep: {
      "width": "1px",
      "padding": "0px"
    },
    th: {
      "vertical-align": "bottom",
      "border-top": "1px solid lightgray",
      "border-bottom": "1px solid lightgray",
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
    td: {
    }
  };

  gridClass: any = {
    thSep: "",
    tdSep: "",
    th: "qgrid-col-header",
    td: "qgrid-col-data"
  };

  ngAfterContentInit() {
    this.haschildren = this.Children != null && this.Children.length > 0;
    this.columnCount = (this.Columns == null ? 0 : (this.Columns.length * 2) - 1);
    this.setupGroupHeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["allowResize"]) {
      if (this.allowResize) {
        this.gridStyle.thSep["cursor"] = "col-resize";
      }
      else {
        delete this.gridStyle.thSep["cursor"];
      }

    }
    if (changes["griddata"] || changes["pagesize"] || changes["datacount"]) {
      let datalength = 0;
      if (this.datacount != 0) {
        datalength = this.datacount;
      }
      else if (this.griddata != null) {
        datalength = this.griddata.length;
      }

      this.fadein = null;
      this.totalpages = [];
      if (this.pagesize != 0 && datalength > this.pagesize) {
        let pagecount = Math.ceil(datalength / this.pagesize)
        this.totalpages = [];
        for (let i = 0; i < pagecount; i++) {
          this.totalpages.push((i + 1));
        }
      }
      this.updatePageData();
    }

    if (changes["griddata"]) {
      if (this._viewContainerRef != null) {
        this._viewContainerRef.createEmbeddedView(this._columnTemplate);
      }
    }
  }

  headers(gcColumn: any): any[] {
    return gcColumn.headers;
  }

  setupGroupHeaders() {
    let groupHeaders = [];
    let found = false;
    if (this.Columns != null) {
      let columns = this.Columns.toArray();
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
            group["colspan"] = (columns[i].groupColumns * 2) - 1;
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
    }
    else {
      this.groups = null;
    }
  }

  updatePageData() {
    if (this.pagesize == 0 || this.griddata == null || this.griddata.length <= this.pagesize) {
      this.pagedata = this.griddata;
      this.fadein = null;
    }
    else {
      let start = this.pageno * this.pagesize;
      let end = start + (this.pagesize * 1);
      if (this.bufferedpageno != null && this.bufferedpagecount != null) {
        let currentFrom = this.bufferedpageno * this.bufferedpagecount * this.pagesize;
        let currentTo = currentFrom + this.griddata.length - 1;
        if (start < currentFrom || start > currentTo) {
          let refreshPage = Math.floor(start / (this.bufferedpagecount * this.pagesize));
          this.bufferedPageNoChanged.emit({ newPageNo: refreshPage, currentPageNo: this.bufferedpageno });
          return;
        }
        else {
          start -= currentFrom;
          end -= currentFrom;
        }
      }

      this.pagedata = this.griddata.slice(start, end);
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
    if (pageNo !== '') {
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
      }
      else {
        let diff = this.resizeInfo.startX - e.pageX;
        let width = this.resizeInfo.element.clientWidth;
        let newWidth = width - (diff + 2);
        if (newWidth > 0) {
          if (this.resizeInfo.fixColumns > 0) {
            for (let i = 0; i < this.resizeInfo.fixColumns; i++) {
              if (i % 2 == 0 && this.resizeInfo.children.length > i) {
                this.resizeInfo.children[i].style.width = this.resizeInfo.children[i].clientWidth+"px";
              }
            }
            this.resizeInfo.fixColumns = 0;
          }
          this.resizeInfo.startX = e.pageX;
          this.resizeInfo.element.style.width = newWidth+"px";
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
        if(children!=null && children.length>0){
          let columnIndex = -1;
          for(let i=0;i<children.length;i++){
            if(children[i]==target){
              columnIndex=i;
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

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

