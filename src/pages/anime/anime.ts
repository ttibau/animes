import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpisodioPage } from '../episodio/episodio';
import { TibauProvider } from '../../providers/tibau/tibau';

@IonicPage()
@Component({
  selector: 'page-anime',
  templateUrl: 'anime.html',
})
export class AnimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private tibauProvider: TibauProvider) {
    this.tibauProvider.goToAnime(this.navParams.get('letraSelecionada'), this.navParams.get('animeSelecionado')).then(data => {
      console.log(data);
    })
  }

 goToEpisode() {
   this.navCtrl.push(EpisodioPage);
 }

}
