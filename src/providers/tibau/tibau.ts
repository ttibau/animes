import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class TibauProvider {

  constructor(public http: HttpClient, private db: AngularFireDatabase, private loadingCtrl: LoadingController) {
    
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

}
