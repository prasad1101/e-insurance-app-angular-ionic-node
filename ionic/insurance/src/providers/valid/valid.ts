import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import validator from 'validator';
/*
  Generated class for the ValidProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ValidProvider Provider');
  }

  emptyVal(d: String) {
    return validator.isEmpty(d);
  }


}
