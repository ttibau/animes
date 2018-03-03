import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class TibauProvider {

  constructor(public platform: Platform, public http: HttpClient, private db: AngularFireDatabase, private loadingCtrl: LoadingController, private admobFree: AdMobFree) {
    
  }

  // Retorna um resolve contendo as letras iniciais dos animes
  getAnimesKeys(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando lista...'
    });
    loading.present();

    let promise = new Promise((resolve, reject) => {
      this.db.list('animes').snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(items => {
        loading.dismiss();
        resolve(items.map(item => item.key))
      }, err => {
        loading.dismiss();
        reject(err);
      });
    })
    return promise;
  }

  // Faz a chamada no firebase pegando a Letra informada na lista de animes
  getAnimesFromLetter(letra){
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    let promise = new Promise((resolve, reject) => {
      this.db.list('animes/' + letra).valueChanges().subscribe(data => {
        loading.dismiss();
        resolve(data);
      }, err => {
        loading.dismiss();
        reject(err);
      })
    })
    return promise;
  }

  // Pega os dados no anime especificado
  goToAnime(letra, anime){
    let loading = this.loadingCtrl.create({
      content: 'Carregando anime...'
    });
    loading.present();

    let promise = new Promise((resolve, reject) => {
      this.db.object('animes/' + letra + '/' + anime).valueChanges().subscribe(data => {
        console.log(data);
        loading.dismiss();
        resolve(data);
      }, err => {
        loading.dismiss();
        reject(err);
      })
    })
    return promise;
  }

  //Verifica se o device id já tem no banco, se não tiver, cria um novo
  checkDeviceID(uuid){
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this.db.object('users/' + uuid).valueChanges().subscribe(data => {
      console.log(data);
      if(data === null){
        // Fazer um novo cadastro
        loading.dismiss();
        this.db.object('users/' + uuid).update({
          countAssistidos: 0
        })
      } else {
        loading.dismiss();
        // Jogar no localStorage o valor atualo do countAssistidos
        localStorage.setItem('episodiosAssistidos', data["countAssistidos"]);
      }
    })
  }

  // Vai pegar os dados do episódio à frente ou atrás
  handleEpisode(episode){
    let loading = this.loadingCtrl.create({
      content: 'Carregando episódio...'
    });
    loading.present();

    let promise = new Promise((resolve, reject) => {
      this.db.object(episode).valueChanges().subscribe(data => {
        loading.dismiss();
        resolve(data);
      }, error => {
        loading.dismiss();
        reject(error);
      })
    })
    return promise;
  }

  // ============ configurações admob ==================

  mostrarBanner(){
    if(this.platform.is('cordova')){
      const bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false,
        autoShow: true,
        id: 'ca-app-pub-5774339234804708/9763880359'
       };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare();
    }
  }

  mostrarVideo(){
    const videoRewardsConfig: AdMobFreeRewardVideoConfig = {
      id: 'ca-app-pub-5774339234804708/9927531884',
      isTesting: false,
      autoShow: true
    }
    this.admobFree.rewardVideo.config(videoRewardsConfig);
    this.admobFree.rewardVideo.prepare();
  }

  mostrarInterstitial(){
    const admobIntestitialConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-5774339234804708/5521792137',
      isTesting: false, 
      autoShow: true
    }
    this.admobFree.interstitial.config(admobIntestitialConfig);
    this.admobFree.interstitial.prepare();
  }

}
