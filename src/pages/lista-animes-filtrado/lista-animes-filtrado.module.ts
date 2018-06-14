import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAnimesFiltradoPage } from './lista-animes-filtrado';

@NgModule({
  declarations: [
    ListaAnimesFiltradoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAnimesFiltradoPage),
  ],
})
export class ListaAnimesFiltradoPageModule {}
