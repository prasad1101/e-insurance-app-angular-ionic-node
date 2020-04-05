import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { NgxLocalCacheService } from 'ngx-local-cache';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DalService {

  constructor(private customHttp: CustomHttpService, public localCache: NgxLocalCacheService) { }


  login(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/login`, payload)
  }

  register(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/users/register`, payload)
  }

  registerCustomer(payload) {
    return this.customHttp.postReq(`${environment.serverURL}/customers/registerCustomer`, payload)
  }

  getCustomer() {
    return this.customHttp.getReq(`${environment.serverURL}/customers/listCustomer`)
  }






  // getAppConfig() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/getConfig/ng-local-config`)
  // }

  // getPrivacy() {
  //   return this.customHttp.getReq(`assets/data/privacy.json`)
  // }
  // getTerms() {
  //   return this.customHttp.getReq(`assets/data/terms.json`)
  // }
  // getCommunications() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/chat-headers`)
  // }
  // getExistingMsgs(query) {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/messages`, query)
  // }
  // getNotification() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/notifications`)
  // }

  // getDashboardSummary() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/dashboard-summary`)
  // }

  // getProjectsByQuery(query) {
  //   return this.customHttp.postReq(`${environment.backend.myBuddyService}/project-mgr/query`, query)
  // }

  // getProjects() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/project-mgr/find-all-projects`)
  // }
  // getProjectById(id) {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/project-mgr/find-project-by-id`, { id: id })
  // }
  // getProjectCategory() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/project-categories`)
  // }
  // getSimilarProjects() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/similar-projects`)
  // }

  // getUsers(query?) {
  //   return this.customHttp.postReq(`${environment.backend.myBuddyService}/user/query`, query)
  // }
  // getAllUsers(query?) {
  //   return this.customHttp.postReq(`${environment.backend.myBuddyService}/user/find-all-users`, query)
  // }

  // bidProject(bidRequest) {
  //   return this.customHttp.postReq(`${environment.backend.myBuddyService}/bid-mgr/bid-project`, bidRequest)
  // }
  // getBids(query) {
  //   return this.customHttp.postReq(`${environment.backend.myBuddyService}/bid-mgr/query`, query)
  // }

  // getHistory() {
  //   return this.customHttp.getReq(`${environment.backend.myBuddyService}/history`)
  // }

  // //local user info

  // getLoggedInUser() {
  //   return this.ngxLocalCache.getData("user") || null

  // }
  // getUserId() {

  //   let user = this.getLoggedInUser()
  //   if (user)
  //     return user.id || user.userId
  //   return null
  // }
  // getMyChannelId() {
  //   return this.getUserId()
  // }






}
