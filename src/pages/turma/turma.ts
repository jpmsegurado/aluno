import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TurmaProvider } from '../../providers/turma/turma';
import { AtividadePage } from '../atividade/atividade';
import { ConteudoProvider } from '../../providers/conteudo/conteudo';
import config from '../../providers/config';

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
  public conteudos: Array<any> = [];
  public loading: Boolean = true;
  public tab: string = 'info';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public turmaProvider: TurmaProvider,
    public conteudoProvider: ConteudoProvider,
  ) {
    this.turma = navParams.get('turma');
  }

  ionViewDidLoad() {
    this.turmaProvider.getAtividades(this.turma.objectId).then((atividades: Array<any>) => {
      this.atividades = atividades.map((atividade) => {
        atividade.loading = true;
        this.turmaProvider.getAnswer(atividade.objectId).then((respostas) => {
          atividade.loading = false;
          atividade.respondida = respostas.length > 0;
        }, () => {
          atividade.loading = false;
        })
        return atividade;
      });

      this.conteudoProvider.get(this.turma.objectId).then((conteudos) => {
        this.conteudos = conteudos;
        this.loading = false;
      }, () => this.loading = false);

    }, () => this.loading = false);
  }

  openAtividade(atividade) {
    this.navCtrl.push(AtividadePage, { atividade });
  }

  openConteudo(conteudo) {
    window.open(`${config.uploadcare}${conteudo.fileId}/${conteudo.nome}`, '_system');
  }

}
