import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'column-props',
  templateUrl: './column-props.component.html',
  styleUrls: ['./column-props.component.css']
})
export class ColumnPropsComponent implements OnInit {
  @Input("column-config") columnConfig: any;

  constructor() { }

  ngOnInit() {
  }

}
