import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the CustomHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomHttpProvider {

  constructor(public httpClient: HttpClient) {
    console.log('Hello CustomHttpProvider Provider');
  }


  public getReq(url, query?): Observable<any> {
    return this.httpClient.get(`${url}${this.buildQuery(query)}`);
  }

  postReq(url, payload, query?): Observable<any> {
    return this.httpClient.post(`${url}${this.buildQuery(query)}`, payload)
  }

  putReq(url, payload): Observable<any> {
    return this.httpClient.put(`${url}`, payload)
  }

  deleteReq(url, query): Observable<any> {
    return this.httpClient.delete(`${url}${this.buildQuery(query)}`);
  }

  buildQuery(query?: Object) {
    if (!query) return ""
    return "?" + (Object.keys(query).map(key => key + '=' + query[key]).join('&'))
  }








  // public getReq(url, query?): Observable<any> {
  //   return this.httpClient.get(`${url}${this.buildQuery(query)}`);
  // }

  // postReq(url, payload, query?): Observable<any> {
  //   return this.httpClient.post(`${url}${this.buildQuery(query)}`, payload)
  // }

  // putReq(url, payload, query): Observable<any> {
  //   return this.httpClient.put(`${url}${this.buildQuery(query)}`, payload)
  // }

  // deleteReq(url, query): Observable<any> {
  //   return this.httpClient.delete(`${url}${this.buildQuery(query)}`);
  // } public getReq(url, query?): Observable<any> {
  //   return this.httpClient.get(`${url}${this.buildQuery(query)}`);
  // }

  // postReq(url, payload, query?): Observable<any> {
  //   return this.httpClient.post(`${url}${this.buildQuery(query)}`, payload)
  // }

  // putReq(url, payload, query): Observable<any> {
  //   return this.httpClient.put(`${url}${this.buildQuery(query)}`, payload)
  // }

  // deleteReq(url, query): Observable<any> {
  //   return this.httpClient.delete(`${url}${this.buildQuery(query)}`);
  // }

  // buildQuery(query?: Object) {
  //   if (!query) return ""
  //   return "?" + (Object.keys(query).map(key => key + '=' + query[key]).join('&'))
  // }

  // buildQuery(query?: Object) {
  //   if (!query) return ""
  //   return "?" + (Object.keys(query).map(key => key + '=' + query[key]).join('&'))
  // }

}
