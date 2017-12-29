import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AtividadeQuestoesPage } from '../atividade-questoes/atividade-questoes';

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
    public navParams: NavParams
  ) {
    this.atividade = navParams.get('atividade');
  }

  questionsNumber(atividade) {
    const len = atividade.questoes.length;
    return len === 1 ? `${len} questão` : `${len} questões`;
  }

  iniciar(atividade) {
    this.navCtrl.push(AtividadeQuestoesPage, { atividade });
  }

}
