import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaAnimesFiltradoPage } from '../lista-animes-filtrado/lista-animes-filtrado';

import { TibauProvider } from '../../providers/tibau/tibau';

@IonicPage()
@Component({
  selector: 'page-lista-animes',
  templateUrl: 'lista-animes.html',
})
export class ListaAnimesPage {
  private animesArray;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tP: TibauProvider) {
    tP.getAnimesKeys().then(data => {
      this.animesArray = data;
    })
  }

  goToAnime(letra){
    this.navCtrl.push(ListaAnimesFiltradoPage, {
      letraSelecionada: letra
    });
  }

}
