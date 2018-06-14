import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimePage } from '../anime/anime';
import { TibauProvider } from '../../providers/tibau/tibau';

@IonicPage()
@Component({
  selector: 'page-lista-animes-filtrado',
  templateUrl: 'lista-animes-filtrado.html',
})
export class ListaAnimesFiltradoPage {
  letraSelecionada: string =  '';
  private listaAnimes;
  animeQuery: string;
  items : string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private tP: TibauProvider) {
   this.letraSelecionada =  this.navParams.get('letraSelecionada');
   this.tP.getAnimesFromLetter(this.navParams.get('letraSelecionada')).then(data => {
    this.listaAnimes = data;
   });
  }

  goToAnime(anime, letra) {
    this.navCtrl.push(AnimePage, {
      animeSelecionado: anime,
      letraSelecionada: letra
    });
  }
}
