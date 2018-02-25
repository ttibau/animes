import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StreamingMedia } from '@ionic-native/streaming-media';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaAnimesPage } from '../pages/lista-animes/lista-animes';
import { AnimePage } from '../pages/anime/anime';
import { ListaAnimesFiltradoPage } from '../pages/lista-animes-filtrado/lista-animes-filtrado';
import { EpisodioPage } from '../pages/episodio/episodio';
import { TibauProvider } from '../providers/tibau/tibau';


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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB0hk24FgwuWyGIF8GjJl-mRg14MqJkKRI",
      authDomain: "animes-tibau.firebaseapp.com",
      databaseURL: "https://animes-tibau.firebaseio.com",
      projectId: "animes-tibau",
      storageBucket: "",
      messagingSenderId: "968314697865"
    }),
    AngularFireDatabaseModule,
    HttpClientModule
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
    StreamingMedia,
    TibauProvider
  ]
})
export class AppModule {}
