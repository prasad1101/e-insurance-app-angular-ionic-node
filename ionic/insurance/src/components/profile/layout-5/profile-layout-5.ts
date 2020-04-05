import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content, AlertController, NavController, NavParams } from 'ionic-angular';
import { DalProvider } from '../../../providers/dal/dal';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { SettersandgettersProvider } from '../../../providers/settersandgetters/settersandgetters';
import { UtilityProvider } from '../../../providers/utility/utility';
import { database } from 'firebase';

@IonicPage()
@Component({
    selector: 'profile-layout-5',
    templateUrl: 'profile.html'
})
export class ProfileLayout5 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;
    slider = {};
    otpValReq = {
        otp: "",
        userId: "prasad",
        mobile: "7218150034",
        email: "prasad.k.pawar@gmail.com"
    }
    customer: any;


    constructor(private dal: DalProvider, public navCtrl: NavController, public navParams: NavParams, public utility: UtilityProvider,
        public faio: FingerprintAIO, public setAndGet: SettersandgettersProvider) { }

    // ngOnInit() {
    //     this.getCustomerList()
    // }




    otpPrompt() {

        let userOtp = prompt("Please enter your otp:");
        this.otpValReq.otp = userOtp;

        console.log("prompt  output >>>>>>>", this.otpValReq);
    }


    getCustomerList() {

        this.dal.getCustomer({ name: this.dal.getUserId() }).subscribe(y => {

            this.customer = y;

            // console.log("profile>>>>>>>>>>", y);
            // console.log("customers>>>>>>>>>>", this.customer);
            // console.log("get customer output >>>>", this.otpValReq)
            // console.log("first sorted array>>>>>", this.customers)
            return y;
        })

    }


    getOtp() {

        this.dal.requestOtp(this.otpValReq).subscribe(z => {
            // this.utility.presentAlert("otp received to your registered mobile and email");
            console.log("otp received>>>>>>>>", z);
            if (z.auth == false) {
                this.utility.presentAlert("OTP failed to send, please try again !")
                return;
            } else {

                this.otpPrompt()
                this.otpAuth()
            }


        })
    }

    otpAuth() {

        this.dal.validateOtp(this.otpValReq).subscribe(p => {

            if (p.success == true) {

                this.getCustomerList();
                console.log("after true OTP>>>>>>>>>>", this.customer);
                this.utility.presentAlert("OTP validated successfully !!")

            } else {

                this.otpPrompt()
                this.otpAuth()
                this.utility.presentAlert("OTP Failed to Validate !!")
                console.log("after false OTP>>>>>>>>>>", this.customer);
                return;
            }

        })


    }

    bioAuth() {
        if (!this.otpValReq) {
            this.utility.presentAlert("You are not Logged in!");
            return;
        }
        else {
            console.log(this.faio)
            //Check if Fingerprint or Face  is available
            this.faio.isAvailable()
                .then(result => {
                    console.log(result);
                    if (result === "finger" || result === "face") {
                        //Fingerprint or Face Auth is available
                        console.log("Fingerprint or Face Exist!")
                        this.faio.show({
                            clientId: 'NihinDemoBioAuthApp',
                            clientSecret: 'nihinBioAuthDemo', //Only necessary for Android
                            disableBackup: true, //Only for Android(optional)
                            localizedFallbackTitle: 'Use Pin', //Only for iOS
                            localizedReason: 'Please Authenticate' //Only for iOS
                        })
                            .then((result: any) => {
                                console.log(result);
                                if (result == "Success") {
                                    //Fingerprint/Face was successfully verified            
                                    //Go to otp prompt

                                    this.getOtp();

                                }
                                else {
                                    //Fingerprint/Face was not successfully verified                      
                                    this.utility.presentAlert(result);
                                    console.log(result);
                                }
                            })
                            .catch((error: any) => {
                                //Fingerprint/Face was not successfully verified          
                                this.utility.presentAlert(error);
                                console.log(error);
                            });
                    }
                    else {
                        //Fingerprint or Face Auth is not available        
                        this.utility.presentAlert("Fingerprint/Face Auth is not available on this device!");
                        console.log("Fingerprint/Face Auth is not available on this device!")
                    }
                })
        }
    }


    // slideHasChanged(slider, index): void {
    //     this.slider[index] = slider;
    //     if (2 == slider._activeIndex) {
    //         if (this.data.items) {
    //             this.data.items.splice(index, 1);
    //         } else {
    //             this.data.splice(index, 1);
    //         }
    //     }
    // }

    // onClickEvent(index): void {
    //     if (this.slider[index]) {
    //         this.slider[index].slidePrev(300);
    //     }
    // }

    // onEvent(event: string, item: any, e: any) {
    //     if (e) {
    //         e.stopPropagation();
    //     }
    //     if (this.events[event]) {
    //         this.events[event](item);
    //     }
    // }
}
