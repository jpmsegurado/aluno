import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TurmaProvider } from '../../providers/turma/turma';

/**
 * Generated class for the AtividadeQuestoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-atividade-questoes',
  templateUrl: 'atividade-questoes.html',
})
export class AtividadeQuestoesPage {

  public atividade: any;
  public questoes: Array<any> = [];
  public index: any = 0;
  public atual: any = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public turmaProvider: TurmaProvider,
  ) {
    this.atividade = navParams.get('atividade');
    this.questoes = this.atividade.questoes;
    this.atual = this.questoes[0];
  }

  next() {
    if(this.index >= this.questoes.length - 1) return;
    this.index = this.index + 1;
    this.atual = this.questoes[this.index];
  }

  previous() {
    if(this.index === 0) return;
    this.index = this.index - 1;
    this.atual = this.questoes[this.index];
  }

  send(questoes, atividadeId) {
    const loading = this.loadingCtrl.create({
      content: 'Carregando...',
    });
    loading.present();
    this.turmaProvider.sendAnswer(questoes, atividadeId).then(() => {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'Respostas enviadas com sucesso',
        buttons: ['Ok']
      }).present();
      this.navCtrl.pop();
    }, () => {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'Não foi possível enviar suas respostas no momento, tente novamente mais tarde.',
        buttons: ['Ok']
      }).present();
    })
  }

  finish() {
    this.alertCtrl.create({
      message: 'Tem certeza que deseja enviar suas respostas?',
      buttons: [{
        text: 'não'
      }, {
        text: 'sim',
        handler: () => {
          this.send(this.questoes, this.atividade.objectId);
        }
      }]
    }).present();
  }

}
