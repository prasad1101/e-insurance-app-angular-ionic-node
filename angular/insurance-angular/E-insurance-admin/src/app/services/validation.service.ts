import { Injectable } from '@angular/core';

import validator from 'validator';


@Injectable({
  providedIn: 'root'
})
/* https://www.npmjs.com/package/validator */
export class ValidationService {

  constructor() {


  }

  emptyVal(d: String) {
    return validator.isEmpty(d);
  }

}
