import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { EpisodioPage } from '../episodio/episodio';
import { TibauProvider } from '../../providers/tibau/tibau';

@IonicPage()
@Component({
  selector: 'page-anime',
  templateUrl: 'anime.html',
})
export class AnimePage {
  public listaEpisodios;
  public animeInfo;
  public nome;
  public sinopse;
  public genero;
  public temOvas = false;
  public order: string = 'titulo';
  public listaOvas;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private tibauProvider: TibauProvider, public alertCtrl: AlertController) {
    this.tibauProvider.goToAnime(this.navParams.get('letraSelecionada'), this.navParams.get('animeSelecionado')).then(data => { 
      this.listaEpisodios = (<any>Object).values(data["episodios"]);
      if(data["ovas"] === undefined || data["ovas"] === null){
        this.temOvas = false;
      } else {
        this.listaOvas = (<any>Object).values(data["ovas"]);
        this.temOvas = true;
      }
      
      this.animeInfo = data["informacoes"];
      this.nome = this.animeInfo.nome;
      this.sinopse = this.animeInfo.sinopse;
      this.genero = this.animeInfo.genero;
    })
  }

  // Quando favoritar um anime, adicionar ao localstorage esse anime favoritado
  favoritarAnime(){
    if(this.platform.is('cordova')){
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Esta opção estará inclusa no app na próxima versão, dependendo da demanda. Para agilizar, peça-nos no suporte.',
        buttons: [
          {
            text: 'OK',
            role: 'ok',
            handler: () => {
              this.tibauProvider.mostrarInterstitial();
            }
          }]
      });
      alert.present();
    }
  }

 goToEpisode(titulo, url, prev, next) {
   this.navCtrl.push(EpisodioPage, {
     episodioUrl: url, 
     episodioTitulo: titulo,
     episodioAnterior: prev,
     episodioSeguinte: next
  });
 }

}
