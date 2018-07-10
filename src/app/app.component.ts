import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaAnimesPage } from '../pages/lista-animes/lista-animes';
import { HomePage } from '../pages/home/home';
import { TibauProvider } from '../providers/tibau/tibau';
import { SuportePage } from '../pages/suporte/suporte';
import { AssistidosPage } from '../pages/assistidos/assistidos';
import { FaqPage } from '../pages/faq/faq';
import { FavoritosPage } from '../pages/favoritos/favoritos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav:Nav;

  
  rootPage:any = HomePage;
  public pages: Array<{ titulo: string, component:any,  icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public tP: TibauProvider) {    
    platform.ready().then(() => {

     
      
      // ATIVANDO BANNER ADMOB
      this.tP.mostrarBanner();

      // CONFIGURAÇÕES ONE SIGNAL
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
  
      window["plugins"].OneSignal
        .startInit("2ac55b01-f584-40e0-abca-8628a78ecb70", "968314697865")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
     
     
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        { titulo: 'Lançamentos', component: HomePage,   icon: 'add'},
        { titulo: 'Animes', component: ListaAnimesPage,  icon: 'list'},
        { titulo: 'Favoritos', component: FavoritosPage,  icon: 'star'},
        { titulo: 'FAQ', component: FaqPage, icon: 'list-box'},
        { titulo: 'Assistidos', component: AssistidosPage, icon: 'checkmark'},
        { titulo: 'Suporte', component: SuportePage,  icon: 'help-buoy'}
      ];
    });
  }

  goToPage(page){
    this.nav.setRoot(page)
  }
}

