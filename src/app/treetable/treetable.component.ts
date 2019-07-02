import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataForTreeService } from '../datafortree.service';

@Component({
  selector: 'tree-table',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.css']
})
export class TreeTableComponent implements OnInit {
  treeTableData: Observable<any>;
  constructor(private dataService: DataForTreeService) { }
  ngOnInit() {
    this.treeTableData = this.dataService.fetchFifaData();
  }
}
