import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistidosPage } from './assistidos';

@NgModule({
  declarations: [
    AssistidosPage,
  ],
  imports: [
    IonicPageModule.forChild(AssistidosPage),
  ],
})
export class AssistidosPageModule {}
