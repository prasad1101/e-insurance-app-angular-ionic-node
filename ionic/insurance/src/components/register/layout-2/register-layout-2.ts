import { Component, Input } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DalProvider } from '../../../providers/dal/dal';
import { ValidProvider } from '../../../providers/valid/valid';
import { LoginLayout1 } from '../../login/layout-1/login-layout-1';

@IonicPage()
@Component({
    selector: 'register-layout-2',
    templateUrl: 'register.html'
})
export class RegisterLayout2 {

    @Input() data: any;
    @Input() events: any;
    registerReq = {
        userId: "",
        password: "",
        email: "",
        mobile: ""
    }
    registerStatus: any;

    constructor(private dal: DalProvider, private validation: ValidProvider, private navCtrl: NavController) { }

    registerVal() {
        this.registerStatus = null
        if (this.validation.emptyVal(this.registerReq.userId)) {
            this.registerStatus = "Please Enter User Name !!";
        } else
            if (this.validation.emptyVal(this.registerReq.password)) {
                this.registerStatus = "Please Enter Password !!";
            } else {

                if (this.validation.emptyVal(this.registerReq.email)) {
                    this.registerStatus = "Please Enter email !!";
                } else {

                    if (this.validation.emptyVal(this.registerReq.mobile)) {
                        this.registerStatus = "Please Enter mobile !!";
                    }
                }
            }
        return this.registerStatus
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
                this.navCtrl.push(LoginLayout1);
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
