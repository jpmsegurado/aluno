import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AtividadeQuestoesPage } from '../atividade-questoes/atividade-questoes';
import { TurmaProvider } from '../../providers/turma/turma';

/**
 * Generated class for the AtividadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-atividade',
  templateUrl: 'atividade.html',
})
export class AtividadePage {

  public atividade: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public turmaProvider: TurmaProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.atividade = navParams.get('atividade')
    if(this.atividade.respondida == null) {
      const loading = this.loadingCtrl.create({
        content: 'Carregando...',
      });
      loading.present();
      this.turmaProvider.getAnswer(this.atividade.objectId).then((respostas) => {
        loading.dismiss();
        this.atividade.respondida = respostas.length > 0;
      }, () => {
        loading.dismiss();
      })
    }
  }

  questionsNumber(atividade) {
    const len = atividade.questoes.length;
    return len === 1 ? `${len} questão` : `${len} questões`;
  }

  iniciar(atividade) {
    this.navCtrl.push(AtividadeQuestoesPage, { atividade });
  }

}
