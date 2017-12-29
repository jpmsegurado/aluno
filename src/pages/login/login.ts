import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
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

  signIn(form: FormGroup) {
    this.loading = true;
    this.userProvider.signIn(form.value.email, form.value.password).then(() => {
      this.navCtrl.setRoot(HomePage, null, { animate: true });
      this.loading = false;
    }, () => {
      this.loading = false;
      this.alertCtrl.create({
        message: 'Email ou senha inválidos',
        buttons: ['Ok'],
      })
    })
  }

}
