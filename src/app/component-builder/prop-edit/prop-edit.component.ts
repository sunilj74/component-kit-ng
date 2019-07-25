import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "prop-edit",
  templateUrl: "./prop-edit.component.html",
  styleUrls: ["./prop-edit.component.css"]
})
export class PropEditComponent implements OnInit {
  @Input("data-prop") dataProp: any;
  @Input("no-bind-option") noBindOption: boolean = false;
  @Input("label") propLabel: string;
  @Input("tooltip") toolTip: string = "";
  @Input("multiline") multiline: boolean = false;

  constructor() {}

  ngOnInit() {}
}
