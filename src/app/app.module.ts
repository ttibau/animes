import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StreamingMedia } from '@ionic-native/streaming-media';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaAnimesPage } from '../pages/lista-animes/lista-animes';
import { AnimePage } from '../pages/anime/anime';
import { ListaAnimesFiltradoPage } from '../pages/lista-animes-filtrado/lista-animes-filtrado';
import { EpisodioPage } from '../pages/episodio/episodio';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListaAnimesPage,
    AnimePage,
    ListaAnimesFiltradoPage,
    EpisodioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListaAnimesPage,
    AnimePage,
    ListaAnimesFiltradoPage,
    EpisodioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StreamingMedia
  ]
})
export class AppModule {}
