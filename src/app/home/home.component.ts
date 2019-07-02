import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { BottomEditorComponent } from '../bottom-editor/bottom-editor.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  navigablePaths: any[] = [
    {
      label: "DataTable",
      path: "datatable"
    },
    {
      label: "Tree",
      path: "tree"
    }
  ];

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  openCodeEditor(event){
    let config: MatBottomSheetConfig<any> = new MatBottomSheetConfig();
    config.panelClass = "bottom-sheet";
    this.bottomSheet.open(BottomEditorComponent, config);
  }
}
