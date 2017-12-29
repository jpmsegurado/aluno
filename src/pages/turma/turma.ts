import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TurmaProvider } from '../../providers/turma/turma';
import { AtividadePage } from '../atividade/atividade';

/**
 * Generated class for the TurmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-turma',
  templateUrl: 'turma.html',
})
export class TurmaPage {

  public turma: any;
  public atividades: Array<any> = [];
  public loading: Boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public turmaProvider: TurmaProvider,
  ) {
    this.turma = navParams.get('turma');
  }

  ionViewDidLoad() {
    this.turmaProvider.getAtividades(this.turma.objectId).then((atividades) => {
      this.atividades = atividades;
      this.loading = false;
    }, () => this.loading = false)
  }

  openAtividade(atividade) {
    this.navCtrl.push(AtividadePage, { atividade });
  }

}
