import { Injectable } from '@angular/core';
import * as Parse from 'parse';

/*
  Generated class for the ConteudoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConteudoProvider {

  constructor() {

  }

  get(turmaId) {
    const query = new Parse.Query('Conteudo');
    const turma = new (Parse.Object.extend('Turma'))();
    turma.id = turmaId;
    query.equalTo('turma', turma);
    return query.find().then(conteudos => conteudos.map(item => item.toJSON()));
  }

}
