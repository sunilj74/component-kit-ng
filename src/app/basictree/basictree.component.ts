import { Component, OnInit } from '@angular/core';
import { DataForTreeService } from '../datafortree.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'basic-tree',
  templateUrl: './basictree.component.html',
  styleUrls: ['./basictree.component.css']
})
export class BasicTreeComponent implements OnInit {
  foldersData: Observable<any>;
  constructor(private dataService: DataForTreeService) { }

  ngOnInit() {
    this.foldersData = this.dataService.fetchFolders();
  }
}
