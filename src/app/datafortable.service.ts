import { Injectable } from '@angular/core';
import { ORDERS } from './orders.data';
import { COUNTRIES } from "./countries.data";
import { Observable, of } from 'rxjs';
import { map, delay, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataForTableService {
  constructor(private http: HttpClient) { }

  fetchOrders() : Observable<any>{
    return of(ORDERS);
  }

  fetchCountries() : Observable<any>{
    return of(COUNTRIES);
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
                    return myData;
                  })
                );

    return data;
  }

}
