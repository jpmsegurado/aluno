import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddTurmaPage } from '../add-turma/add-turma';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public turmas: Array<any> = [];

  constructor(
    public navCtrl: NavController
  ) {

  }

  addTurma() {
    this.navCtrl.push(AddTurmaPage);
  }

}
