import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public tP: TibauProvider, public platform: Platform) {
    this.episodioTitulo = this.navParams.get('episodioTitulo');
    this.episodioUrl =  this.navParams.get('episodioUrl');
    this.proximoEpisodio = this.navParams.get('episodioSeguinte');
    this.episodioAnterior = this.navParams.get('episodioAnterior');

    this.countEpisodiosAssistidos = parseInt(localStorage.getItem('episodiosAssistidos'));
  }

  changeEpisode(ep){
    // Vai verificar se a quantidade de episódios assistidos é maior que 3
    this.tP.verificaCountEpisodios();

    this.countEpisodiosAssistidos++;
    // QUANDO O USUÁRIO CLICAR NO PRÓXIMO OU PREV, VAI MANDAR PRO BD A QUANTIDADE DE EPISÓDIOS  ASSISTIDOS + 1
    // APÓS ADICIONAR UM EPISÓDIOASSISTIDO NO BANCO, JOGA NO LOCALSTORAGE O NOVO VALOR
    this.tP.adicionarEpisodioAssistido(this.countEpisodiosAssistidos);
    
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
