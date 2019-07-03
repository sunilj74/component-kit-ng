import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: "bottom-editor",
  templateUrl: "./bottom-editor.component.html",
  styleUrls: ["./bottom-editor.component.css"]
})
export class BottomEditorComponent implements OnInit {
  editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    minimap: {
      enabled: false
    },
    fontSize: "20px",
    scrollBeyondLastLine: false,
    scrollBeyondLastColumn: false,
    readOnly: true
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  title: string = "Code";

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: any, private bottomPopup: MatBottomSheetRef<BottomEditorComponent>) {}

  ngOnInit() {
    console.log("inside bottom editor");
    console.log("bottompopup", this.bottomPopup, this.data);

  }
}
