import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaAnimesPage } from '../pages/lista-animes/lista-animes';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav:Nav;

  
  rootPage:any = HomePage;
  public pages: Array<{ titulo: string, component:any,  icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {    
    platform.ready().then(() => {

     if(platform.is('cordova')){
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
  
      window["plugins"].OneSignal
        .startInit("2ac55b01-f584-40e0-abca-8628a78ecb70", "968314697865")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
     }
     
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        { titulo: 'Lançamentos', component: HomePage,   icon: 'add'},
        { titulo: 'Animes', component: ListaAnimesPage,  icon: 'list'},
        //{ titulo: 'Pesquisar', icon: 'search'},
        //{ titulo: 'Categorias', icon: 'list-box'},
        //{ titulo: 'Populares',  icon: 'star'},
        //{ titulo: 'Assistidos',  icon: 'checkmark'},
        //{ titulo: 'Dúvidas & Suporte',  icon: 'help-buoy'}
      ];
    });
  }

  goToPage(page){
    this.nav.setRoot(page)
  }
}

