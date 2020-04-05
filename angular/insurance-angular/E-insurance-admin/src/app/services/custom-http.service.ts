import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class CustomHttpService {

  constructor(private httpClient: HttpClient) { }
  public getReq(url, query?): Observable<any> {
    return this.httpClient.get(`${url}${this.buildQuery(query)}`);
  }

  postReq(url, payload, query?): Observable<any> {
    return this.httpClient.post(`${url}${this.buildQuery(query)}`, payload)
  }

  putReq(url, payload, query): Observable<any> {
    return this.httpClient.put(`${url}${this.buildQuery(query)}`, payload)
  }

  deleteReq(url, query): Observable<any> {
    return this.httpClient.delete(`${url}${this.buildQuery(query)}`);
  }

  buildQuery(query?: Object) {
    if (!query) return ""
    return "?" + (Object.keys(query).map(key => key + '=' + query[key]).join('&'))
  }
}

