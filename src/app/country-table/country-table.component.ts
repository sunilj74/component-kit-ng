import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "country-table",
  templateUrl: "./country-table.component.html",
  styleUrls: ["./country-table.component.css"]
})
export class CountryTableComponent implements OnInit {
  @Input("country-data") countryData: any[];

  constructor() {}

  ngOnInit() {}
}
