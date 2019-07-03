import { Injectable } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  fetchCodes(paths: string[]){
    let code$ = paths.map(p => {
      let url = `https://api.github.com/repos/sunilj74/component-kit-ng/contents/src${p}`;
      return this.http
      .get(url)
      .pipe(
        map(res=>{
          let parts = p.split("/");
          let fileName = parts[parts.length-1];
          let content64 = res["content"];
          return {
            name: fileName,
            content: atob(content64)
          };
        })
      );
    });
    return forkJoin(code$);
  }
}
