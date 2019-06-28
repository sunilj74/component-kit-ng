import { Injectable } from '@angular/core';
import { MOCKORDER, MOCKORDERITEM, COUNTRIES } from './mockdata';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataForTableService {
  constructor() { }

  fetchOrders() : Observable<any>{
    let data = this.growMockOrders(1000);
    return of(data);
  }

  fetchCountries() : Observable<any>{
    let data = COUNTRIES;
    return of(data);
  }

  growMockOrders(count): any[] {
    let data = [];
    let orderstring = JSON.stringify(MOCKORDER);
    let orderitemstring = JSON.stringify(MOCKORDERITEM);
    for (let i = 0; i < count; i++) {
      let order = JSON.parse(orderstring);
      order.orderitems = [];
      let orderamount = 0;
      for (let j = 0; j < 10; j++) {
        let item = JSON.parse(orderitemstring);
        item.itemno = j + 1;
        item.quantity = ((j + 1) * 10) + i;
        item.rate = (89 - (j + 20)) + (i * 10);
        item.amount = item.quantity * item.rate;
        orderamount += item.amount;
        order.orderitems.push(item);
      }
      order.orderid = order.orderid + "-" + i;
      order.amount = orderamount;
      order.tax = Math.round(orderamount * 8) / 100;
      if ((i % 2) == 0) {
        order.customer.name = "XYZ Limited";
      }
      if ((i % 3) == 0) {
        order.customer.address = "300 King St, San Digo, NJ"
      }
      data.push(order);
    }
    return data;
  }

}
