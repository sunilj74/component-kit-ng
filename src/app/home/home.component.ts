import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  navigablePaths: any[] = [
    {
      label: "Data Table/Data Grid",
      path: "datatable"
    },
    {
      label: "Tree",
      path: "tree"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
