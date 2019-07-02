import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'bottom-editor',
  templateUrl: './bottom-editor.component.html',
  styleUrls: ['./bottom-editor.component.css']
})
export class BottomEditorComponent implements OnInit {

  constructor(private bottomPopup: MatBottomSheetRef<BottomEditorComponent>) {
  }

  ngOnInit() {
  }

}
