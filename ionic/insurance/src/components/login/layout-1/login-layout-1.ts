import { Component, Input } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { DalProvider } from '../../../providers/dal/dal';
import { ValidProvider } from '../../../providers/valid/valid';
import { HomePage } from '../../../pages/home/home';
import { JwtHelperService } from '@auth0/angular-jwt';
@IonicPage()
@Component({
    selector: 'login-layout-1',
    templateUrl: 'login.html'
})
export class LoginLayout1 {
    @Input() data: any;
    @Input() events: any;

    // public username: string;
    // public password: string;

    // private isUsernameValid: boolean = true;
    // private isPasswordValid: boolean = true;

    constructor(private dal: DalProvider, private validator: ValidProvider, public navCtrl: NavController, private alertCtrl: AlertController) { }

    loginReq = {
        customerId: "",
        password: "",
    }
    loginStatus: any;

    loginVal() {
        this.loginStatus = null
        if (this.validator.emptyVal(this.loginReq.customerId)) {
            this.loginStatus = "Please Enter User Name !!";
            console.log("Please Enter User Name !!");
        } else
            if (this.validator.emptyVal(this.loginReq.password)) {
                this.loginStatus = "Please Enter Password !!";
                console.log("Please Enter Password !!")
            }
        return this.loginStatus
    }

    userLogin() {


        // console.log(this.validation.emptyVal(this.loginReq.userId), "this is validation service")
        if (null != this.loginVal()) {
            return
        }
        this.dal.login(this.loginReq).subscribe(x => {
            console.log(x)
            if (x.isSuccess == true) {
                const helper = new JwtHelperService();

                const decodedToken = helper.decodeToken(x.token);
                const expirationDate = helper.getTokenExpirationDate(x.token);
                const isExpired = helper.isTokenExpired(x.token);
                console.log(JSON.stringify(decodedToken), expirationDate, isExpired)


                localStorage.setItem("user", JSON.stringify(decodedToken))

                this.loginStatus = "Loggedin Successfully !!";
                this.navCtrl.push(HomePage);
                // window.location.href = `/${environment.baseHref}/#/dashboard`
            } else {
                console.log("Login Failed !!")
                this.loginStatus = "Login Failed !!";
                // window.location.href = `/${environment.baseHref}/#/`
                // Swal.fire('Oops...', 'Username or Password entered is wrong!', 'error')


            }

        }
            , e => {

            }

        )

    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: "Enter OTP",
            subTitle: "Validate by Entering OTP on your registered mobile or email!",
            inputs: [
                {
                    name: 'OTP',
                    placeholder: 'OTP'
                },
            ],
            cssClass: "alert-subscribe",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Validate',
                    handler: () => {
                        console.log('Validate is clicked');
                    }
                }
            ]
        });
        alert.present();
    }







    // login() {
    //     this.dal.login({
    //         'username': this.username,
    //         'password': this.password
    //     }).subscribe((r) => {

    //     })
    // }
    // onEvent = (event: string): void => {
    //     if (event == "onLogin" && !this.validate()) {
    //         return;
    //     }
    //     if (this.events[event]) {
    //         this.events[event]({
    //             'username': this.username,
    //             'password': this.password
    //         });
    //     }
    // }

    // validate(): boolean {
    //     this.isUsernameValid = true;
    //     this.isPasswordValid = true;
    //     if (!this.username || this.username.length == 0) {
    //         this.isUsernameValid = false;
    //     }

    //     if (!this.password || this.password.length == 0) {
    //         this.isPasswordValid = false;
    //     }

    //     return this.isPasswordValid && this.isUsernameValid;
    // }
}
