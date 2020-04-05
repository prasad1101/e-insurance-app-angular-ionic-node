import { Component, OnInit } from '@angular/core';
import { DalService } from './../../services/dal.service';
import { ValidationService } from './../../services/validation.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private dal: DalService, private router: Router, private validation: ValidationService) { }

  registerReq = {

    policyNo: "",
    name: "",
    mobile: "",
    plan: "",
    term: "",
    purpose: "",
    sumAssured: "",
    location: "",
  }



  ngOnInit() {
    this.registerStatus = "Register New Policy"
  }

  registerStatus: any;

  registerVal() {
    this.registerStatus = null
    if (this.validation.emptyVal(this.registerReq.policyNo)) {
      Swal.fire("error..", "Please Enter User Policy No !!", "error")
      this.registerStatus = "Please Enter User Policy No !!";
    } else
      if (this.validation.emptyVal(this.registerReq.name)) {
        Swal.fire("error..", "Please Enter Name !!", "error")
        this.registerStatus = "Please Enter Name !!";
      }
      else
        if (this.validation.emptyVal(this.registerReq.mobile)) {
          Swal.fire("error..", "Please Enter Mobile no. !!", "error")
          this.registerStatus = "Please Enter Mobile Number !!";
        }
        else
          if (this.validation.emptyVal(this.registerReq.plan)) {
            Swal.fire("error..", "Please Enter Policy Plan !!", "error")
            this.registerStatus = "Please Enter Policy Plan !!";
          }
          else
            if (this.validation.emptyVal(this.registerReq.term)) {
              Swal.fire("error..", "Please Enter Policy Term !!", "error")
              this.registerStatus = "Please Enter Policy Term !!";
            }
            else
              if (this.validation.emptyVal(this.registerReq.sumAssured)) {
                Swal.fire("error..", "Please Enter Sum Assured !!", "error")
                this.registerStatus = "Please Enter Sum Assured !!";
              }
              else if
                (this.validation.emptyVal(this.registerReq.purpose)) {
                Swal.fire("error..", "Please Enter Purpose !!", "error")
                this.registerStatus = "Please Enter purpose !!";
              }

    return this.registerStatus
  }



  registerCustomer() {

    if (null != this.registerVal()) {
      return
    }

    this.dal.registerCustomer(this.registerReq).subscribe(y => {

      console.log(y);
      if (y._id) {
        console.log("Customer Registered Successfully!!")
        Swal.fire("Success..", "User Registered Successful !", "success")
        // this.registerStatus = "Customer Registered Successfully !!";
        // window.location.href = `/${environment.baseHref}/#/dashboard`
      } else if (y.code == 11000) {

        console.log("Customer already exist !!")
        Swal.fire("error..", "Customer already exist !!", "error")
        // this.registerStatus = "Customer already exist !! ";

      } else {
        Swal.fire("error..", "Customer registration Failed !! try again", "error")
        // this.registerStatus = "Customer registration Failed !! try again";

      }
      // console.log("User Registered Successfully !!")


    })





  }












}


