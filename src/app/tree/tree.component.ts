import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { BottomEditorComponent } from '../bottom-editor/bottom-editor.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  handleViewCode(event, codeType) {
    let config: MatBottomSheetConfig<any> = new MatBottomSheetConfig();
    config.panelClass = "bottom-sheet";
    config.data = codeType;
    this.bottomSheet.open(BottomEditorComponent, config);
  }

}
