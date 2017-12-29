import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Parse from 'parse';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
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

}
