import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "orders-table",
  templateUrl: "./orderstable.component.html",
  styleUrls: ["./orderstable.component.css"]
})
export class OrderstableComponent implements OnInit {
  @Input("orders-data") ordersData: any[];
  constructor() {}

  ngOnInit() {}

  handleSort(sortInfo){
    console.log("mysort info", sortInfo);
  }
}
