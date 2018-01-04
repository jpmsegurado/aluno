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
    })
  }

  getOne(id) {
    const query = new Parse.Query('Turma');
    query.equalTo('objectId', id);
    query.include('professor');
    return query.first().then(item => item.toJSON());
  }

  getAtividades(turmaId) {
    const query = new Parse.Query('Atividade');
    const Turma = Parse.Object.extend('Turma');
    const turma = new Turma();
    turma.id = turmaId;
    query.equalTo('turma', turma);
    return query.find().then(atividades => atividades.map(item => item.toJSON()));
  }

  sendAnswer(questoes, atividadeId) {
    const Resposta = Parse.Object.extend('Resposta');
    const Atividade = Parse.Object.extend('Atividade');
    const resposta = new Resposta();
    const atividade = new Atividade();
    const user = Parse.User.current();
    atividade.id = atividadeId;
    resposta.set('aluno', user);
    resposta.set('atividade', atividade);
    resposta.set('questoes', questoes)
    return resposta.save();
  }
  getAnswer(atividadeId) {
    const query = new Parse.Query('Resposta');
    const Atividade = Parse.Object.extend('Atividade');
    const atividade = new Atividade();
    const user = Parse.User.current();
    atividade.id = atividadeId;
    query.equalTo('atividade', atividade);
    query.equalTo('aluno', user);
    return query.find();
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
