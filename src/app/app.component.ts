import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaAnimesPage } from '../pages/lista-animes/lista-animes';
import { HomePage } from '../pages/home/home';
import { TibauProvider } from '../providers/tibau/tibau';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav:Nav;

  
  rootPage:any = HomePage;
  public pages: Array<{ titulo: string, component:any,  icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public tP: TibauProvider, private admobFree: AdMobFree) {    
    platform.ready().then(() => {

     if(platform.is('cordova')){
      
      // ATIVANDO BANNER ADMOB
      const bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false,
        autoShow: true,
        id: 'ca-app-pub-5774339234804708/9763880359'
       };
       this.admobFree.banner.config(bannerConfig);
       
       this.admobFree.banner.prepare();

      // CONFIGURAÇÕES ONE SIGNAL
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

