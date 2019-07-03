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

  constructor(private bottomSheet: MatBottomSheet, private dataService: DataForTableService) {}

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

  handleViewCode(event, codeType){
    let config: MatBottomSheetConfig<any> = new MatBottomSheetConfig();
    config.panelClass = "bottom-sheet";
    config.data = codeType;
    this.bottomSheet.open(BottomEditorComponent, config);
  }

}
