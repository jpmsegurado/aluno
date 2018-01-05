import { Component } from '@angular/core';
import { Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  public menu = [{
    title: 'Sair',
    action: 'sair',
    icon: '',
  }];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public userProvider: UserProvider,
    public menuCtrl: MenuController,
    public app: App,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = userProvider.getCurrentUser() ? HomePage : LoginPage;
      if(userProvider.getCurrentUser()) this.userProvider.startOneSignal();
    });
  }

  openPage(page, action) {
    this.menuCtrl.close();
    if (page) this.app.getActiveNav().push(page);
    if (action === 'sair') {
      this.userProvider.logout().then(() => {
        this.app.getActiveNav().setRoot(LoginPage, null, { animate: true })
      });
    }
  }
}

