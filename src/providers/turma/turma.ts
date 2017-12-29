import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the TurmaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TurmaProvider {

  public turmas: Array<any> = [];
  public observer: any;
  public turmaObservable: Observable<any>;

  constructor() {

    this.turmaObservable = new Observable((observer) => {
      this.observer = observer;
    })
  }

  findTurma(chave) {
    const query = new Parse.Query('Turma');
    query.equalTo('chave', chave);
    return query.find();
  }

  inscrever(turma) {
    const Inscricao = Parse.Object.extend('Inscricao');
    const inscricao = new Inscricao();
    const user = Parse.User.current();
    inscricao.set('aluno', user);
    inscricao.set('turma', turma);
    return inscricao.save().then((turma) => {
      this.turmas.push(turma.toJSON());
      this.observer.next(this.turmas);
    });
  }

  loadTurmas() {
    const query = new Parse.Query('Inscricao');
    const user = Parse.User.current();
    query.include('turma');
    query.equalTo('aluno', user);
    return query.find().then((inscricoes) => this.turmas = inscricoes.map(ins => ins.toJSON().turma)).then(() => {
      this.observer.next(this.turmas);
      console.log(this.turmas);
    })
  }

  getTurmas() {
    return this.turmaObservable;
  }

  jaInscrito(turma) {
    const query = new Parse.Query('Inscricao');
    const user = Parse.User.current();
    query.equalTo('aluno', user);
    query.equalTo('turma', turma);
    return query.find().then(res => res.length > 0);
  }

}
