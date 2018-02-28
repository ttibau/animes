import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { TibauProvider } from '../../providers/tibau/tibau';
import { AdMobFree } from '@ionic-native/admob-free';
@IonicPage()
@Component({
  selector: 'page-episodio',
  templateUrl: 'episodio.html',
})
export class EpisodioPage {
  public episodioTitulo;
  public episodioUrl;
  public proximoEpisodio;
  public episodioAnterior;
  public countEpisodiosAssistidos;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tP: TibauProvider, public platform: Platform, public alertCtrl: AlertController) {
    this.episodioTitulo = this.navParams.get('episodioTitulo');
    this.episodioUrl =  this.navParams.get('episodioUrl');
    this.proximoEpisodio = this.navParams.get('episodioSeguinte');
    this.episodioAnterior = this.navParams.get('episodioAnterior');

    localStorage.setItem('episodiosAssistidos', '1');
    this.countEpisodiosAssistidos = parseInt(localStorage.getItem('episodiosAssistidos'));
  }

  changeEpisode(ep){

    if(this.countEpisodiosAssistidos === 3){
      document.addEventListener('admob.rewardvideo.events.REWARD', () => {
        localStorage.setItem('episodiosAssistidos', '0');  
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
                this.tP.mostrarVideo();
              }
            }]
        });
        alert.present();
      }
    }

    this.countEpisodiosAssistidos = parseInt(localStorage.getItem('episodiosAssistidos'));
    this.countEpisodiosAssistidos++;
    localStorage.setItem('episodiosAssistidos', this.countEpisodiosAssistidos);

    this.tP.handleEpisode(ep).then(data => {
      this.proximoEpisodio = data["next"];
      this.episodioAnterior = data["prev"];
      this.episodioTitulo = data["titulo"];
      this.episodioUrl = data["url"];
    }, error => {
      console.log(error);
    })
  }

}
