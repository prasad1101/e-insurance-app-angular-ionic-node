import { Component, Input } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'alert-layout-3',
  templateUrl: 'alert.html'
})
export class AlertLayout3 {
  @Input('data') data: any;
  @Input('events') events: any;

  constructor(private alertCtrl: AlertController) { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  presentAlert(item): void {
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
}
