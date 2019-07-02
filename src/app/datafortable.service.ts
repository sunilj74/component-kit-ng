import { Injectable } from '@angular/core';
import { MOCKORDER, MOCKORDERITEM, COUNTRIES } from './mockdata';
import { Observable, of } from 'rxjs';
import { map, delay, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataForTableService {
  constructor(private http: HttpClient) { }

  fetchOrders() : Observable<any>{
    let data = this.growMockOrders(1000);
    return of(data);
  }

  fetchCountries() : Observable<any>{
    let data = COUNTRIES;
    return of(data);
  }

  fetchAngularRepositories(pageNo: number = 0) : Observable<any>{
    let url = `https://api.github.com/search/repositories?q=angular&sort=stars&order=desc&page=${pageNo+1}`;
    let data = this.http
                .get(url, {observe: 'response'})
                .pipe(
                  startWith(null),
                  delay(0),
                  map(res => {
                    if(res == null) return res;
                    let jsonData = res.body;
                    let items = jsonData["items"];
                    let count = jsonData["total_count"];
                    if(count>1000){
                      count = 1000;
                    }
                    let pageCount = Math.ceil(count / 30);
                    let myData = {
                      pageNo: pageNo,
                      pageCount: 3,
                      count: count,
                      data: items
                    };
                    console.log("myData", myData);
                    return myData;
                  })
                );

    return data;
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
