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
  public mensagens;

  constructor(public navCtrl: NavController, public menu: MenuController, public tP: TibauProvider) {
    this.tP.getLastEpisodes().then(data => {
      this.lastEpisodes = data;
    });

    this.tP.getMessages().then(data => {
      console.log(data);
      this.mensagens = data;
    });
  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }

}
