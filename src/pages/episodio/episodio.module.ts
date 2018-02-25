import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodioPage } from './episodio';

@NgModule({
  declarations: [
    EpisodioPage,
  ],
  imports: [
    IonicPageModule.forChild(EpisodioPage),
  ],
})
export class EpisodioPageModule {}
