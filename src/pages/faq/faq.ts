import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TibauProvider } from '../../providers/tibau/tibau';
@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  constructor(public platform: Platform, public tp: TibauProvider, public navCtrl: NavController, public navParams: NavParams) {
    if(this.platform.is('cordova')){
      this.tp.mostrarInterstitial();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
