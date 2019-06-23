import { Injectable } from '@angular/core';
import { growMockData } from './mockorders';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataForTableService {
  constructor() { }

  fetchOrders() : Observable<any>{
    let data = growMockData(1000);
    return of(data);
  }
}
