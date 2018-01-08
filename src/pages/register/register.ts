import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    nome: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
  })

  public loading: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
  ) {

  }

  signUp(form: FormGroup) {
    this.loading = true;
    this.userProvider.signUp(form.value).then(() => {
      this.navCtrl.setRoot(HomePage, null, { animate: true });
      this.loading = false;
      this.userProvider.startOneSignal();
    }, () => {
      this.loading = false;
      this.alertCtrl.create({
        message: 'Email ou senha inválidos',
        buttons: ['Ok'],
      });
    });
  }

}
