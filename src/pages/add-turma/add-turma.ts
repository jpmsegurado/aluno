import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TurmaProvider } from '../../providers/turma/turma';

/**
 * Generated class for the AddTurmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-turma',
  templateUrl: 'add-turma.html',
})
export class AddTurmaPage {

  public form: FormGroup = new FormGroup({
    chave: new FormControl('', Validators.required),
  });

  public loading: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public turmaProvivider: TurmaProvider,
    public alertCtrl: AlertController,
  ) {

  }

  submit(form: FormGroup) {
    this.loading = true;
    this.turmaProvivider.findTurma(form.value.chave).then((turmas) => {
      if(turmas.length === 0) {
        this.loading = false;
        this.alertCtrl.create({
          message: 'Não encontramos nenhuma turma com essa chave de inscrição',
          buttons: ['Ok']
        }).present();
      } else {
        this.turmaProvivider.jaInscrito(turmas[0]).then((inscrito) => {
          if(inscrito) {
            this.loading = false;
            this.alertCtrl.create({
              message: 'Você já está inscrito nesta turma.',
              buttons: ['Ok']
            }).present();
          } else {
            this.turmaProvivider.inscrever(turmas[0]).then(() => {
              this.loading = false;
              this.navCtrl.pop();
            })
          }
        })
      }
    }, () => {
      this.loading = false;
      this.alertCtrl.create({
        message: 'Não encontramos nenhuma turma com essa chave de inscrição',
        buttons: ['Ok']
      }).present();
    })
  }

}
