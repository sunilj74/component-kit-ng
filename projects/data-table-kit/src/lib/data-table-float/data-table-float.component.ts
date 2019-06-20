import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: "data-table-float",
  templateUrl: "./data-table-float.component.html",
  styleUrls: ["./data-table-float.component.css"]
})
export class DataTableFloatComponent {
  @Input("width") floatWidth: number = 0;
  styleOuter: any;
  styleInner: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["floatWidth"]) {
      this.styleOuter = {
        "margin-right": "-" + Math.abs(this.floatWidth) + "px",
        "text-align": "left"
      };
      this.styleInner = {
        width: Math.abs(this.floatWidth) + "px"
      };
    }
  }
}
