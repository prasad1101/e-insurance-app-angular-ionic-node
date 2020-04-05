import { Component, OnInit } from '@angular/core';
import { DalService } from '../../services/dal.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ValidationService } from 'src/app/services/validation.service';
import Swal from 'sweetalert2';


declare var $: any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private dal: DalService, private router: Router, private validation: ValidationService) { }


  loginReq = {
    userId: "",
    password: "",
  }

  registerReq = {
    userId: "",
    password: "",
    RepeatPassword: "",
  }


  loginStatus: any;
  registerStatus: any;

  ngOnInit() {
    this.loginStatus = "We're glad to see you again !!";
    this.registerStatus = "Let's create your account!!";
  }

  loginVal() {
    this.loginStatus = null
    if (this.validation.emptyVal(this.loginReq.userId)) {
      this.loginStatus = "Please Enter User Name !!";
    } else
      if (this.validation.emptyVal(this.loginReq.password)) {
        this.loginStatus = "Please Enter Password !!";
      }
    return this.loginStatus
  }

  registerVal() {
    this.registerStatus = null
    if (this.validation.emptyVal(this.registerReq.userId)) {
      this.registerStatus = "Please Enter User Name !!";
    } else
      if (this.validation.emptyVal(this.registerReq.password)) {
        this.registerStatus = "Please Enter Password !!";
      } else {

        if (this.validation.emptyVal(this.registerReq.RepeatPassword)) {
          this.registerStatus = "Please Enter repeat Password !!";
        }
      }
    return this.registerStatus
  }




  userLogin() {


    // console.log(this.validation.emptyVal(this.loginReq.userId), "this is validation service")
    if (null != this.loginVal()) {
      return
    }
    this.dal.login(this.loginReq).subscribe(x => {
      console.log(x)
      if (x.isSuccess == true) {

        console.log("Loggedin Successfully !!")
        this.loginStatus = "Loggedin Successfully !!";

        window.location.href = `/${environment.baseHref}/#/dashboard`
      } else {
        console.log("Login Failed !!")
        this.loginStatus = "Login Failed !!";
        // window.location.href = `/${environment.baseHref}/#/`
        Swal.fire('Oops...', 'Username or Password entered is wrong!', 'error')

      }

    }, e => {

    })

  }

  userRegister() {

    if (null != this.registerVal()) {
      return
    }

    this.dal.register(this.registerReq).subscribe(y => {

      console.log(y);
      if (y._id) {
        console.log("User Registered Successfully!!")
        this.registerStatus = "User Registered Successfully !!";
        // window.location.href = `/${environment.baseHref}/#/dashboard`
      } else if (y.code == 11000) {

        console.log("User already exist !!")
        this.registerStatus = "User already exist !! try another Username";

      } else {
        this.registerStatus = "User registration Failed !! try again";

      }
      // console.log("User Registered Successfully !!")


    })





  }













}


