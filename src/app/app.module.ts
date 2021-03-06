import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaAnimesPage } from '../pages/lista-animes/lista-animes';
import { AnimePage } from '../pages/anime/anime';
import { ListaAnimesFiltradoPage } from '../pages/lista-animes-filtrado/lista-animes-filtrado';
import { EpisodioPage } from '../pages/episodio/episodio';
import { SuportePage } from '../pages/suporte/suporte';
import { TibauProvider } from '../providers/tibau/tibau';
import { OrderModule } from 'ngx-order-pipe';
import { AdMobFree } from '@ionic-native/admob-free';
import { AssistidosPage } from '../pages/assistidos/assistidos';
import { FaqPage } from '../pages/faq/faq';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { NativeStorage } from '@ionic-native/native-storage';
import { StreamingMedia } from '@ionic-native/streaming-media';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListaAnimesPage,
    AnimePage,
    ListaAnimesFiltradoPage,
    EpisodioPage,
    SuportePage,
    AssistidosPage,
    FaqPage,
    FavoritosPage
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
    HttpClientModule,
    OrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListaAnimesPage,
    AnimePage,
    ListaAnimesFiltradoPage,
    EpisodioPage,
    SuportePage,
    AssistidosPage,
    FaqPage,
    FavoritosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TibauProvider,
    AdMobFree,
    NativeStorage,
    StreamingMedia
  ]
})
export class AppModule {}
