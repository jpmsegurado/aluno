import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as Parse from 'parse';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { BlankStateComponent } from '../components/blank-state/blank-state';
import { AddTurmaPage } from '../pages/add-turma/add-turma';
import { TurmaProvider } from '../providers/turma/turma';
import { TurmaPage } from '../pages/turma/turma';
import { AtividadePage } from '../pages/atividade/atividade';
import { AtividadeQuestoesPage } from '../pages/atividade-questoes/atividade-questoes';
import { ConteudoProvider } from '../providers/conteudo/conteudo';
import { OneSignal } from '@ionic-native/onesignal';

Parse.serverURL = 'https://professor-server.herokuapp.com/parse';
Parse.initialize('9ac78096f6a609ac63227bc1ba09a004b8d513f7', '9ac78096f6a609ac63227bc1ba09a004b8d513f7');

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BlankStateComponent,
    AddTurmaPage,
    TurmaPage,
    AtividadePage,
    AtividadeQuestoesPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BlankStateComponent,
    AddTurmaPage,
    TurmaPage,
    AtividadePage,
    AtividadeQuestoesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    TurmaProvider,
    ConteudoProvider,
    OneSignal
  ]
})
export class AppModule {}
