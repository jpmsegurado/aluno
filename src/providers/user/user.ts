import { Injectable, } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as Parse from 'parse';
import { OneSignal } from '@ionic-native/onesignal';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(
    public onesignal: OneSignal,
    public platform: Platform,
  ) {
    
  }

  getCurrentUser() {
    return Parse.User.current();
  }

  signIn(email, password) {
    return Parse.User.logIn(email, password);
  }

  logout() {
    return Parse.User.logOut();
  }

  signUp(value) {
    const user = new Parse.User();
    user.set('username', value.email);
    user.set('nome', value.nome);
    user.set('password', value.password);
    user.set('email', value.email);
    return user.save();
  }

  startOneSignal() {
    this.onesignal.startInit('056e24e4-d4f5-44f0-a824-f221918ff023');
    const user = Parse.User.current();
    this.onesignal.endInit();

    return this.onesignal.getIds().then((ids) => {
      user.set('playerId', ids.userId);
      return user.save();
    });
  }

}
