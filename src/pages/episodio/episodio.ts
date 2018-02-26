import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TibauProvider } from '../../providers/tibau/tibau';

@IonicPage()
@Component({
  selector: 'page-episodio',
  templateUrl: 'episodio.html',
})
export class EpisodioPage {
  public episodioTitulo;
  public episodioUrl;
  public proximoEpisodio;
  public episodioAnterior;
  public btnNext = true; 
  public btnPrev = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tP: TibauProvider) {
    this.episodioTitulo = this.navParams.get('episodioTitulo');
    this.episodioUrl =  this.navParams.get('episodioUrl');
    this.proximoEpisodio = this.navParams.get('episodioSeguinte');
    this.episodioAnterior = this.navParams.get('episodioAnterior');

    if(this.episodioAnterior === undefined || this.episodioAnterior === null || this.episodioAnterior === ''){
      this.btnPrev = false;
    }

    if(this.proximoEpisodio === undefined || this.proximoEpisodio === null || this.proximoEpisodio === ''){
      this.btnNext = false;
    }

    console.log(this.episodioAnterior);
  }

  changeEpisode(ep){
    this.tP.handleEpisode(ep).then(data => {
      this.proximoEpisodio = data["next"];
      this.episodioAnterior = data["prev"];
      this.episodioTitulo = data["titulo"];
      this.episodioUrl = data["url"];

      if(data["next"] === undefined || data["next"] === null || data["next"] === ''){
        // não tem episódio pra frente, desabilitar botão de próximo
        this.btnNext = false;
      }

      if(data["prev"] === undefined || data["prev"] === null || data["prev"] === ''){
        // não tem episódio pra frente, desabilitar botão de próximo
        this.btnPrev = false;
      }

      console.log(this.proximoEpisodio);
    }, error => {
      console.log(error);
    })
  }

}
