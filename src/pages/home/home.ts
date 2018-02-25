import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private streamingMedia: StreamingMedia, public menu: MenuController) {
    
  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }

}
