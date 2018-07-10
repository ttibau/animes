import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TibauProvider } from '../../providers/tibau/tibau';
import { EpisodioPage } from '../episodio/episodio';

@IonicPage()
@Component({
  selector: 'page-assistidos',
  templateUrl: 'assistidos.html',
})
export class AssistidosPage {
  public episodiosAssistidos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tibau: TibauProvider) {
    this.tibau.episodiosAssistidos().then(data => {
      this.episodiosAssistidos = data;
      console.log(this.episodiosAssistidos);
    }).catch(error => {
      console.log(error);
    })
  }

 goToEpisode(ep)
 {
  console.log(ep);
  this.tibau.goToEpisode(ep.anime, ep.episodio).then(episodio => {
      
    this.navCtrl.setRoot(EpisodioPage, {
      animeNome: ep['anime'],
      episodioUrl: episodio['url'], 
      episodioTitulo: episodio['titulo'],
      episodioAnterior: episodio['prev'],
      episodioSeguinte: episodio['next']
   })
  })
 }

}
