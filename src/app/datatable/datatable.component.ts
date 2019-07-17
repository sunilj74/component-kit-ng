import { Component, OnInit, Inject } from '@angular/core';
import { DataForTableService } from '../datafortable.service';
import { Observable } from 'rxjs';
import { MatBottomSheet, MatBottomSheetConfig } from "@angular/material";
import { BottomEditorComponent } from "../bottom-editor/bottom-editor.component";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.css"]
})
export class DatatableComponent implements OnInit {
  ordersData$: Observable<any>;
  countryData$: Observable<any>;
  largeData$: Observable<any>;

  sample: any = {
    install: `
$npm install data-table-kit --save
    `,
    import: `
import { DataTableKitModule } from 'data-table-kit';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    DataTableKitModule
  ],
  ...
})
  `,
    template: `
<data-table [tabledata]="myTableData" allowResize="true" pagesize="20">
  <div *data-table-column='let row=data; align:"left"; header: "First Name"; sort:"firstName";'>
    {{row?.firstName}}
  </div>
  <div *data-table-column='let row=data; align:"left"; header: "Last Name"; sort:"lastName";'>
    {{row?.lastName}}
  </div>
  <div *data-table-column='let row=data; align:"left"; header: ["City", "State"]; sort:["state","city"]'>
    {{row?.city}}<br/>
    {{row?.state}}
  </div>
  <div *data-table-column='let row=data; align:"center"; header: "Department"; sort:"department";'>
    {{row?.department}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Basic"; groupHeader:"Salary"; groupColumns: 3;'>
    {{row?.basic | currency}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Allowance";'>
    {{row?.allowance | currency}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Total";'>
    {{row?.total | currency}}
  </div>
</data-table>
  `,
    ts: `
  myTableData: any[] = [
    {
      firstName: "Tom",
      lastName: "Hanks",
      city: "Los Angeles",
      state: "California - NJ",
      department: "Sales",
      basic: 105000,
      allowance: 20000,
      total: 125000
    },
    {
      firstName: "Julia",
      lastName: "Roberts",
      city: "Chicago",
      state: "Illinois - IL",
      department: "Finance",
      basic: 135000,
      allowance: 5000,
      total: 140000
    },
    {
      firstName: "Sean",
      lastName: "Connery",
      city: "Austin",
      state: "Texax - TX",
      department: "IT",
      basic: 115000,
      allowance: 1000,
      total: 116000
    },
    {
      firstName: "Peter",
      lastName: "Griffin",
      city: "Quahog",
      state: "Rhode Island - RI",
      department: "Brewer",
      basic: 95000,
      allowance: 0,
      total: 95000
    },
    {
      firstName: "Principal",
      lastName: "Victoria",
      city: "South Park",
      state: "Colorado - CO",
      department: "Principal",
      basic: 120000,
      allowance: 10000,
      total: 130000
    }
  ];
  `
  };

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private bottomSheet: MatBottomSheet,
    private dataService: DataForTableService
  ) {}

  ngOnInit() {
    this.ordersData$ = this.dataService.fetchOrders();
    this.countryData$ = this.dataService.fetchCountries();
    this.largeData$ = this.dataService.fetchAngularRepositories(0);
  }

  handleBufferedPageChanged(pageInfo) {
    this.largeData$ = this.dataService.fetchAngularRepositories(
      pageInfo.newPageNo
    );
  }

  handleViewCode(event, codeType) {
    let config: MatBottomSheetConfig<any> = new MatBottomSheetConfig();
    config.panelClass = "bottom-sheet";
    config.data = codeType;
    this.bottomSheet.open(BottomEditorComponent, config);
  }

  handleCopyCode(event, id){
    if(this.doc!=null){
      let element = this.doc.querySelector("#" + id);
      if (element != null) {
        this.doc.getSelection().selectAllChildren(element);
        this.doc.execCommand("copy");
      }
    }
  }
}
