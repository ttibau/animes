import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { TibauProvider } from '../../providers/tibau/tibau';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private streamingMedia: StreamingMedia, private tP: TibauProvider) {
    this.episodioTitulo = this.navParams.get('episodioTitulo');
    this.episodioUrl =  this.navParams.get('episodioUrl');
    this.proximoEpisodio = this.navParams.get('episodioSeguinte');
    this.episodioAnterior = this.navParams.get('episodioAnterior');
    console.log(this.episodioTitulo, this.episodioUrl);
  }

  assistirEpisodio(){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { alert('Error streaming'); alert(e) },
      orientation: 'landscape'
    };
    
    this.streamingMedia.playVideo(this.episodioUrl, options);
  }

  changeEpisode(ep){
    this.tP.handleEpisode(ep).then(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

}
