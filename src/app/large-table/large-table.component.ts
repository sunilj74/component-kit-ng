import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DataForTableService } from '../datafortable.service';
import { Observable } from 'rxjs';

@Component({
  selector: "large-table",
  templateUrl: "./large-table.component.html",
  styleUrls: ["./large-table.component.css"]
})
export class LargeTableComponent implements OnInit {
  @Input("large-data") largeData: any;
  @Output() bufferedPageChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(){
  }

  handleBufferedPageChanged(pageInfo) {
    this.bufferedPageChanged.emit(pageInfo);
  }
}
