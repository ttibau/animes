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
  public listaEpisodios;
  public animeInfo;
  public nome;
  public sinopse;
  public genero;
  public temOvas = false;
  order: string = 'titulo';
  public listaOvas;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tibauProvider: TibauProvider) {
    this.tibauProvider.goToAnime(this.navParams.get('letraSelecionada'), this.navParams.get('animeSelecionado')).then(data => { 
      this.listaEpisodios = (<any>Object).values(data["episodios"]);
      if(data["ovas"] === undefined || data["ovas"] === null){
        console.log(this.listaOvas);
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

 goToEpisode(titulo, url, prev, next) {
   this.navCtrl.push(EpisodioPage, {
     episodioUrl: url, 
     episodioTitulo: titulo,
     episodioAnterior: prev,
     episodioSeguinte: next
  });
 }

}
