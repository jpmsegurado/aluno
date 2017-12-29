import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddTurmaPage } from '../add-turma/add-turma';
import { TurmaProvider } from '../../providers/turma/turma';
import { TurmaPage } from '../turma/turma';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public turmas: Array<any> = [];
  public loading: Boolean = true;

  constructor(
    public navCtrl: NavController,
    public turmaProvider: TurmaProvider,
  ) {

    this.turmaProvider.getTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });

  }

  ionViewDidLoad() {
    this.loading = true;
    this.turmaProvider.loadTurmas().then(() => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  openTurma(turma) {
    this.navCtrl.push(TurmaPage, { turma });
  }

  addTurma() {
    this.navCtrl.push(AddTurmaPage);
  }

}
