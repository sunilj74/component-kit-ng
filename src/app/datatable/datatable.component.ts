import { Component, OnInit } from '@angular/core';
import { DataForTableService } from '../datafortable.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  ordersData: Observable<any>;
  countryData: Observable<any>;

  constructor(private dataService: DataForTableService) { 
  }

  ngOnInit() {
    this.ordersData = this.dataService.fetchOrders();
    this.countryData = this.dataService.fetchCountries();
  }

}
