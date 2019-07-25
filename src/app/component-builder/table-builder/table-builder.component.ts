import { Component, OnInit, Inject } from '@angular/core';
import { TreeNodeType } from 'projects/data-tree-kit/src/public-api';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "table-builder",
  templateUrl: "./table-builder.component.html",
  styleUrls: ["./table-builder.component.css"]
})
export class TableBuilderComponent implements OnInit {
  myNodeTypes = TableNodeType;
  myTreeData: TreeNodeType[] = [];
  myTableData: any[] = [];
  myColumns: any[] = [];
  myTableColumns: any[] = [];
  myCurrentNode: any = {};
  myColumnIndex: number = 0;
  myCode: string = "";
  myTableProps: any = null;
  mySelectedColumn: any = null;
  myFileReader: FileReader = new FileReader();

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.myFileReader.onload = this.readFile.bind(this);
    this.initializeData();
    this.refreshAll();
  }

  clearData(){
    this.myTreeData.length = 0;
    this.myTableData.length = 0;
    this.myColumns.length = 0;
    this.myColumnIndex = 0;
    this.myTableProps = {
      nodeType: TableNodeType.DataTable,
      dataTableClass: { value: "", bind: false }, // data-table-class input bindable
      tableData: { value: "", bind: true }, // tabledata(s) input always bind
      datacount: { value: "", bind: false }, // datacount(s) input bindable
      bufferedPageNo: { value: "", bind: false }, // buffered-page-no input bindable
      bufferedPageCount: { value: "", bind: false }, // buffered-page-count input bindable
      allowResize: { value: "", bind: false }, // allowResize input bindable (true/false)
      pagesize: { value: "20", bind: false }, // pagesize input bindable
      collapseChildren: { value: "", bind: false }, // collapse-children input bindable (true/false)
      allowMultiselect: { value: "", bind: false }, // allow-multiselect input bindable (true/false)
      rowName: { value: "row", bind: false }, // row variable name
      indexName: { value: "rowNo", bind: false }, // index variable name
      bufferedPageNoChanged: { value: "", bind: false }, // output
      sortOrderChanged: { value: "", bind: false }, // output
      selectionChanged: { value: "", bind: false }, // output
      editStarted: { value: "", bind: false }, // output
      editCompleted: { value: "", bind: false }, // output
      editCancelled: { value: "", bind: false } // output
    };

  }

  addColumn() {
    this.myColumnIndex++;
    let idx = this.myColumnIndex;
    let column = {
      groupKey: `column-${idx}`,
      extras: {
        nodeType: TableNodeType.Column,
        headers: { value: `Column ${idx}`, bind: false }, // headers input
        align: { value: "left", bind: false }, // align input
        width: { value: "", bind: false }, // width input
        sort: { value: "", bind: false }, // sort input
        groupHeader: { value: "", bind: false }, // group header input
        groupColumns: { value: "", bind: false }, // group column count input
        template: { value: "", bind: false } // template input
      }
    };
    this.myColumns.push(column);
    return column;
  }

  initializeData() {
    this.clearData();
    for (let i = 0; i < 8; i++) {
      this.addColumn();
    }
    this.setupTreeData();
  }

  setupTreeData() {
    this.myTreeData = [
      {
        groupKey: "data-table",
        subGroups: [
          {
            groupKey: "columns",
            subGroups: this.myColumns
          }
        ],
        extras: this.myTableProps
      }
    ];
  }

  treeNodeSelected(event) {
    this.myCurrentNode = event.currentNode;
    this.mySelectedColumn = null;
    if (
      this.myCurrentNode != null &&
      this.myCurrentNode.extras != null &&
      this.myCurrentNode.extras.nodeType == TableNodeType.Column
    ) {
      this.mySelectedColumn = this.myCurrentNode;
    }
  }

  propToCode(
    propName,
    value,
    isEvent = false,
    isColumn = false,
    convertToArray = false,
    skipQuote = false
  ) {
    let propValue = value.value;
    let bind = value.bind;
    if (propValue == null || propValue.length == 0) {
      return "";
    }
    if (bind) {
      propName = "[" + propName + "]";
    }
    if (convertToArray) {
      propValue = propValue.split("\n");
      propValue = propValue.map(p => `"${p}"`);
      propValue = "[" + propValue.join(",") + "]";
    } else {
      if (isEvent && (propValue.indexOf("(") || propValue.indexOf(")"))) {
        propValue = propValue + "($event)";
      }
      if (!skipQuote) {
        propValue = `"${propValue}"`;
      }
    }
    let sep = isColumn ? ":" : "=";
    let end = isColumn ? ";" : "";
    return ` ${propName}${sep}${propValue}${end}`;
  }

  refreshAll() {
    let data = {};
    let props = this.myTableProps;
    let codes = [];
    let dataTable =
      this.propToCode("data-table-class", props.dataTableClass) +
      this.propToCode("tabledata", props.tableData) +
      this.propToCode("datacount", props.datacount) +
      this.propToCode("buffered-page-no", props.bufferedPageNo) +
      this.propToCode("buffered-page-count", props.bufferedPageCount) +
      this.propToCode("allowResize", props.allowResize) +
      this.propToCode("pagesize", props.pagesize) +
      this.propToCode("collapse-children", props.collapseChildren);
    this.propToCode("allow-multiselect", props.allowMultiselect) +
      this.propToCode(
        "bufferedPageNoChanged",
        props.bufferedPageNoChanged,
        true
      ) +
      this.propToCode("sortOrderChanged", props.sortOrderChanged, true) +
      this.propToCode("selectionChanged", props.selectionChanged, true) +
      this.propToCode("editStarted", props.editStarted, true) +
      this.propToCode("editCompleted", props.editCompleted, true) +
      this.propToCode("editCancelled", props.editCancelled, true);

    codes.push("<data-table" + dataTable + ">");

    this.myTableColumns = this.myColumns.map((p, i, a) => {
      let column = p.extras;
      let sort = null;
      if (column.sort.value != null && column.sort.value.length > 0) {
        sort = column.sort.value.split("\n");
      }

      let groupHeader = null;
      if (
        column.groupHeader.value != null &&
        column.groupHeader.value.length > 0
      ) {
        groupHeader = column.groupHeader.value.split("\n");
      }
      let groupColumns = column.groupColumns.value;
      if (groupColumns == null || groupColumns.length == 0) {
        groupColumns = null;
      }
      let templateText = column.template.value;
      data[`col${i}`] = templateText;
      let rowName = this.myTableProps.rowName.value || "row";
      let indexName = this.myTableProps.indexName.value;
      if (indexName != null && indexName.length > 0) {
        indexName = ` let ${indexName}=rowIndex;`;
      }
      let colProps =
        `let ${rowName}=data;` +
        indexName +
        this.propToCode("align", column.align, false, true) +
        this.propToCode("header", column.headers, false, true, true) +
        this.propToCode("sort", column.sort, false, true, true) +
        this.propToCode("groupHeader", column.groupHeader, false, true, true) +
        this.propToCode(
          "groupColumns",
          column.groupColumns,
          false,
          true,
          false,
          false
        ) +
        this.propToCode("width", column.width, false, true);

      codes.push(`  <div *data-table-column='${colProps}'>`);
      if (templateText != null && templateText.length > 0) {
        codes.push(`  ${templateText}`);
      }
      codes.push("  </div>");
      return {
        headers: p.extras.headers.value.split("\n"),
        align: p.extras.align.value,
        width: p.extras.width.value,
        sort: sort,
        groupHeader: groupHeader,
        groupColumns: +p.extras.groupColumns.value,
        template: p.extras.template.value
      };
    });
    console.log(this.myTableColumns);
    this.myTableData = [data, data, data, data, data];
    codes.push("</data-table>");
    this.myCode = codes.join("\n");
  }

  copyCode() {
    if (this.doc != null) {
      let element = this.doc.querySelector("#codeViewer") as HTMLInputElement;

      if (element != null) {
        element.select();
        this.doc.execCommand("copy");
      }
    }
  }

  handleAddColumn() {
    this.addColumn();
    this.myCurrentNode = null;
    this.mySelectedColumn = null;
    this.setupTreeData();
    this.refreshAll();
  }

  handleDeleteColumn() {
    if (this.mySelectedColumn != null) {
      this.myColumns = this.myColumns.filter(p => p != this.mySelectedColumn);
      this.myCurrentNode = null;
      this.mySelectedColumn = null;
      this.setupTreeData();
      this.refreshAll();
    }
  }

  handleImport(event) {
    let fileElement = this.doc.querySelector("#importFile") as HTMLInputElement;
    fileElement.click();
  }

  handleFileLoad(event){
    if(event!=null&&event.target!=null){
      let files = event.target.files;
      if(files!=null&&files.length>0&&files[0]!=null){
        if(files[0].type=="application/json"){
          this.myFileReader.readAsText(files[0]);
        }
      }
    }
  }

  readFile(e){
    let text = this.myFileReader.result as string;
    if(text!=null&&text.length>0){
      let data = JSON.parse(text);
      if(data!=null && data["tableProp"] && data["columns"] && data["columnIndex"]){
        this.clearData();
        for(let prop in data.tableProp){
          if(this.myTableProps.hasOwnProperty(prop)){
            this.myTableProps[prop] = data.tableProp[prop];
          }
        }
        for (let i = 0; i < data.columns.length; i++) {
          let column = this.addColumn();
          let dataColumn = data.columns[i];
          if(dataColumn!=null){
            for (let prop in dataColumn) {
              if (column.hasOwnProperty(prop)) {
                column[prop] = dataColumn[prop];
              }
            }
          }
        }
        this.setupTreeData();
        this.refreshAll();
      }
    }
  }

  handleExport() {
    let data = {
      tableProp: this.myTableProps,
      columns: this.myColumns,
      columnIndex: this.myColumnIndex
    };
    var text = JSON.stringify(data, null, "   ");
    var uricontent =
      "data:application/octet-stream," + encodeURIComponent(text);
    var anchor = this.doc.createElement("a");
    anchor.setAttribute("download", "data-table.json");
    anchor.setAttribute("href", uricontent);
    this.doc.body.appendChild(anchor);
    anchor.click();
    this.doc.body.removeChild(anchor);
  }


}

enum TableNodeType {
  DataTable,
  Column
};
