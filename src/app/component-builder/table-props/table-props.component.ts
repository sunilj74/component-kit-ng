import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "table-props",
  templateUrl: "./table-props.component.html",
  styleUrls: ["./table-props.component.css"]
})
export class TablePropsComponent implements OnInit {
  @Input("datatable-config") tableConfig: any;

  constructor() {}

  ngOnInit() {}
}
