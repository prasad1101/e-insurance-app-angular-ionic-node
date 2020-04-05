import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpProvider } from '../custom-http/custom-http';
import { environment } from '../../environments/environment';
/*
  Generated class for the DalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DalProvider {

  constructor(public http: HttpClient, private customHttp: CustomHttpProvider) {
    console.log('Hello DalProvider Provider');
  }

  getUserId() {
    let u = localStorage.getItem("user")
    try {
      u = JSON.parse(u)
      u = JSON.parse(u)
    } catch (error) {

    }
    if (u) return u["userId"] || u["customerId"]; else return null
  }
  // login(payload) {
  //   return this.customHttp.postReq(`${environment.serverURL}/login`, payload)
  // }

  login(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/loginCust`, payload)
  }

  register(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/users/register`, payload)
  }

  registerCustomer(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/customers/registerCustomer`, payload)
  }

  getCustomer(query?) {
    return this.customHttp.getReq(`${environment.serverURL}/customers/listCustomer`, query)
  }

  userPayment(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/payments/save-payments`, payload)
  }

  getPayment() {
    return this.customHttp.getReq(`${environment.serverURL}/payments/get-payments`)
  }

  requestOtp(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/otps/generate-otp`, payload)
  }

  validateOtp(payload) {
    return this.customHttp.putReq(`${environment.serverURL}/otps/verify-otp`, payload)
  }

}
