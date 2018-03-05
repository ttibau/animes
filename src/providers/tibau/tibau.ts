import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController, Platform, AlertController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { ToastController } from 'ionic-angular';

@Injectable()
export class TibauProvider {

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public platform: Platform, public http: HttpClient, private db: AngularFireDatabase, private loadingCtrl: LoadingController, private admobFree: AdMobFree) {

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

  // Vai zerar a quantidade de episódios assistidos
  zerarEpisodiosAssistidos(){
    this.db.object('users/' + localStorage.getItem('uuid')).update({
      countAssistidos: 1
    });
    localStorage.setItem('episodiosAssistidos', '1');
  }

  // Vai inserir um novo episódio no usuário
  adicionarEpisodioAssistido(count){
    this.db.object('users/' + localStorage.getItem('uuid')).update({
      countAssistidos: count
    });
    localStorage.setItem('episodiosAssistidos', count);
  }

  // Vai verificar se a quantidade de episódios assistidos pelo usuário é igual a 3
  verificaCountEpisodios(){
    
    if(parseInt(localStorage.getItem('episodiosAssistidos')) >= 3){
      document.addEventListener('admob.rewardvideo.events.REWARD', () => {
        this.zerarEpisodiosAssistidos();
        // zerar episodiod assistidos no bd
      });

      if(this.platform.is('cordova')){
        let alert = this.alertCtrl.create({
          title: 'Atenção',
          subTitle: 'Exibiremos um vídeo de anúncio pois você assistiu 3 episódios, tenha bom senso em nos ajudar a manter o projeto. O contador irá ZERAR após você assistir o vídeo inteiro',
          buttons: [
            {
              text: 'OK',
              role: 'ok',
              handler: () => {
                this.mostrarVideo();
              }
            }]
        });
        alert.present();
      }
    }
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


  // Adicionar episódio como visto no bd
  adicionarVisto(animeNome, episodioNumero){
    if(this.platform.is('cordova')){
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'A adição de animes visto estará pronto na próxima versão do app que sairá nas próximas versões, tenha paciência.',
        buttons: [
          {
            text: 'OK',
            role: 'ok',
            handler: () => {
              this.mostrarInterstitial();
            }
          }]
      });
      alert.present();
    }
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

  esconderBanner(){
    this.admobFree.banner.hide();
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
    let toast = this.toastCtrl.create({
      message: 'Abrindo um anúncio...',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    const admobIntestitialConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-5774339234804708/5521792137',
      isTesting: false, 
      autoShow: true
    }
    this.admobFree.interstitial.config(admobIntestitialConfig);
    this.admobFree.interstitial.prepare();
  }

}
