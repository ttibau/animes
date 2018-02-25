import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAnimesPage } from './lista-animes';

@NgModule({
  declarations: [
    ListaAnimesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAnimesPage),
  ],
})
export class ListaAnimesPageModule {}
