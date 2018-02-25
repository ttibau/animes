import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@IonicPage()
@Component({
  selector: 'page-episodio',
  templateUrl: 'episodio.html',
})
export class EpisodioPage {
  public episodioTitulo;
  public episodioUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private streamingMedia: StreamingMedia) {
    this.episodioTitulo = this.navParams.get('episodioTitulo');
    this.episodioUrl =  this.navParams.get('episodioUrl');
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

  assistirAnime(){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { alert('Error streaming'); alert(e) },
      orientation: 'landscape'
    };
    
    this.streamingMedia.playVideo('https://r2---sn-gpv7enek.googlevideo.com/videoplayback?requiressl=yes&id=888625edb15ca25e&itag=18&source=blogger&app=blogger&ip=0.0.0.0&ipbits=0&expire=1521415138&sparams=expire%2Cid%2Cip%2Cipbits%2Citag%2Cmip%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csc%2Csource&signature=7AE0AED543F2BB425C23A6634AE3B27D89769A81.1F0D056A62F49FDCB6E7E09D48C83C194C002959&key=cms1&cms_redirect=yes&mip=177.154.11.109&mm=30&mn=sn-gpv7enek&ms=nxu&mt=1519267579&mv=m&pl=24&sc=yes', options);
  }

}
