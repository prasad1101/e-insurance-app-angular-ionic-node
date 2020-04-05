import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
/**
 * Generated class for the BiomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biom',
  templateUrl: 'biom.html',
})
export class BiomPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fingerprint: FingerprintAIO, private platfrom: Platform) {
    this.fingerprint.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
      .then((result: any) => alert(">>>>" + JSON.stringify(result)))
      .catch((error: any) => alert("error >>>>" + JSON.stringify(error)))
  }

  async showFingerprintDialog() {
    try {
      await this.platfrom.ready();
      const available = await this.fingerprint.isAvailable();
      console.log(available);

    } catch (e) {
      console.log(e);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiomPage');
  }

}
