import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
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
  public countEpisodiosAssistidos;
  public animeNome;

  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, public tP: TibauProvider, public platform: Platform) {
    this.episodioTitulo = this.navParams.get('episodioTitulo');
    this.episodioUrl =  this.navParams.get('episodioUrl');
    this.proximoEpisodio = this.navParams.get('episodioSeguinte');
    this.episodioAnterior = this.navParams.get('episodioAnterior');
    this.animeNome = this.navParams.get('animeNome');
    this.countEpisodiosAssistidos = parseInt(localStorage.getItem('episodiosAssistidos'));
  }

  // método que vai marcar esse episódio como visto e adicionar informações dele no banco no nó do deviceid atual
  marcarVisto(){
    this.tP.adicionarVisto(this.animeNome, this.episodioTitulo);
  }

  linkQuebrado(){
    this.tP.adicionarLinkQuebrado(this.animeNome, this.episodioTitulo);
  }

  changeEpisode(ep){
    // Vai verificar se a quantidade de episódios assistidos é maior que 3
    this.tP.verificaCountEpisodios();

    this.countEpisodiosAssistidos++;
    // QUANDO O USUÁRIO CLICAR NO PRÓXIMO OU PREV, VAI MANDAR PRO BD A QUANTIDADE DE EPISÓDIOS  ASSISTIDOS + 1
    // APÓS ADICIONAR UM EPISÓDIOASSISTIDO NO BANCO, JOGA NO LOCALSTORAGE O NOVO VALOR
    this.tP.mostrarBannerEscondido();
    
    this.tP.handleEpisode(ep).then(data => {
      this.proximoEpisodio = data["next"];
      this.episodioAnterior = data["prev"];
      this.episodioTitulo = data["titulo"];
      this.episodioUrl =  data["url"];
    }, error => {
      console.log(error);
    })
  }

  mostrarBannerEscondido() {
  
      this.tP.mostrarBannerEscondido();  
    
    
  }

  esconderBanner(){
      this.tP.esconderBanner();  
    
    
  }

  botaoDownload(){
    let alert = this.alertCtrl.create({
      title: 'Download',
      subTitle: 'O seu navegador abrirá, pressione seu dedo no vídeo e aparecerá a opção de download do vídeo'
    });
    alert.present();
  }

  
}
