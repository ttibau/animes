import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController, Platform, AlertController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class TibauProvider {
  public episodiosVistos = [];
  public episodioAtual;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public platform: Platform,
   public http: HttpClient, private db: AngularFireDatabase, private loadingCtrl: LoadingController, private admobFree: AdMobFree,
   public storage: NativeStorage) {

  }

  goToEpisode(nome, episodio)
  {
    let loading = this.loadingCtrl.create({
      content: 'Carregando episódio...'
    });
    loading.present();

    let promise = new Promise((resolve, reject) => {
      let letra = nome.charAt(0);
      this.db.object('animes/' +  letra + '/'+ nome +'/' + '/episodios/' + episodio).valueChanges().subscribe(episodio => {
        loading.dismiss();
        resolve(episodio);
      }, error => {
        loading.dismiss();
        reject(error);
      })
    });
    return promise;
  }

  getMessages()
  {
    let loading = this.loadingCtrl.create({
      content: 'Carregando mensagens...'
    });
    loading.present();

    let alertError = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: 'Por favor, entre em contato conosco via suporte para que possamos resolver'
    });

    let promise = new Promise((resolve, reject) => {
      this.db.list('mensagens').valueChanges().subscribe(mensagens => {
        resolve(mensagens);
        loading.dismiss();
      }, error => {
        loading.dismiss();
        alertError.present();
        reject(error);
      });
    });
    return promise;
  }

  getLastEpisodes()
  {
    let loading = this.loadingCtrl.create({
      content: 'Carregando episódios...'
    });
    loading.present();

    let alertError = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: 'Por favor, entre em contato conosco via suporte para que possamos resolver'
    });

    let promise = new Promise((resolve, reject) => {
      this.db.list('ultimosEpisodios', ref => ref.orderByChild('dateReverse').limitToFirst(12)).valueChanges().subscribe(data => {
        resolve(data);
        loading.dismiss();
      }, error => {
        loading.dismiss();
        alertError.present();
        reject(error);
      })
    })
    return promise;
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


  // Vai zerar a quantidade de episódios assistidos
  zerarEpisodiosAssistidos(){
    localStorage.setItem('episodiosAssistidos', '1');
  }

  // Vai verificar se a quantidade de episódios assistidos pelo usuário é igual a 3
  verificaCountEpisodios(){
    if(parseInt(localStorage.getItem('episodiosAssistidos')) >= 3){
      // VAI OUVIR E VER SE O USUÁRIO VIU O VÍDEO INTEIRO.
      document.addEventListener('admob.rewardvideo.events.REWARD', () => {
        this.zerarEpisodiosAssistidos();
        // zerar episodiod assistidos no bd
      });

  
        
        let alert = this.alertCtrl.create({
          title: 'Atenção',
          subTitle: 'Exibiremos um vídeo de anúncio pois você assistiu 3 episódios, tenha bom senso em nos ajudar a manter o projeto. O contador irá ZERAR após você assistir o vídeo inteiro e o vídeo será liberado.',
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

  //Vai adicionar ao banco o episódio que está com o link quebrad
  adicionarLinkQuebrado(nomeAnime, episodioAnime){
    // Loading
    let loading = this.loadingCtrl.create({
      content: 'Carregando anime...'
    });

    // Alert
    let alert = this.alertCtrl.create({
      title: 'Enviado', 
      subTitle: 'A nossa equipe já foi informada do link quebrado, em no máximo 24h o anime irá retornar, obrigado pela compreensão'
    });

    loading.present();
    const data = Date.now();
    const items = this.db.object('link-quebrado/' +  data);
    items.update({
      anime: nomeAnime,
      episodio: episodioAnime,
      data: data,
      dateReverse: 0 - data
    }).then(data => {
      alert.present();
      loading.dismiss();
    })
  }


  
  adicionarVisto(animeNome, episodioNumero){
    
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'O anime foi marcado como visto com sucesso!',
    });
    
    let promise = new Promise((resolve, reject) => {
      this.storage.getItem('episodiosAssistidos').then(data => {
        console.log('Já tenho episódios assistidos: ', data);
        this.episodiosVistos = JSON.parse(data); 
        this.episodioAtual = { anime: animeNome, episodio: episodioNumero };
        this.episodiosVistos.push(this.episodioAtual);
        this.storage.setItem('episodiosAssistidos', JSON.stringify(this.episodiosVistos)).then(() => {
          resolve('sucesso');
          alert.present();
        });
      }, error => {
        if(error.code === 2){
          console.log('Não tenho episódios assistidos');
          this.episodioAtual = { anime: animeNome, episodio: episodioNumero };
          this.episodiosVistos.push(this.episodioAtual);
          console.log(this.episodiosVistos);
          this.storage.setItem('episodiosAssistidos', JSON.stringify(this.episodiosVistos)).then(() => {
            resolve('sucesso');
            alert.present();
          });
        } else {
          reject('error');
        }
      })
    });
    return promise;
  }

  // Retorna os episódios vistos
  episodiosAssistidos()
  {
   let promise = new Promise ((resolve, reject) => {
    this.storage.getItem('episodiosAssistidos').then(data => {
      console.log(data.value);
      resolve(JSON.parse(data));
    }, error => {
      reject(error);
    });
   });
   return promise;
  }







  // ============ configurações admob ==================

  mostrarBanner(){

      const bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false,
        autoShow: true,
        id: 'ca-app-pub-5774339234804708/9763880359'
       };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare();

  }

  esconderBanner(){
    this.admobFree.banner.hide();
  }

  mostrarBannerEscondido() {
    this.admobFree.banner.show();
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
