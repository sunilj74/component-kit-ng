import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataForTableService } from '../datafortable.service';
import { Observable } from 'rxjs';
import { MatBottomSheet, MatBottomSheetConfig } from "@angular/material";
import { BottomEditorComponent } from "../bottom-editor/bottom-editor.component";

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
<data-table [tabledata]="<yourdata>" allowResize="true" pagesize="20">
  <div *data-table-column='let row=data; align:"left"; header: "Header"; sort:"code";'>
    {{row?.*field*}}
  </div>
  <div *data-table-column='let row=data; align:"center"; header: ["Multi-Line", "Header"];'>
    {{row?.*field1*}}<br/>
    {{row?.*field2*}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Amount"; groupHeader:"Invoiced Amount"; groupColumns: 3;'>
    {{row?.amount | currency}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Tax";'>
    {{row?.tax | currency}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Total";'>
    {{row?.total | currency}}
  </div>
</data-table>
  `
  };

  constructor(
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
}
