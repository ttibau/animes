import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { TibauProvider } from '../../providers/tibau/tibau';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public lastEpisodes;
  constructor(public navCtrl: NavController, public menu: MenuController, public tP: TibauProvider) {
    this.tP.getLastEpisodes().then(data => {
      this.lastEpisodes = data;
      console.log(this.lastEpisodes);
    })
  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }

}
