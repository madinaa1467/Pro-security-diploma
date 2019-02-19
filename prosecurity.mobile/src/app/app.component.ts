import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Subject} from "rxjs/Subject";

import {INCOMING_PAGE, LOGIN_PAGE, OUTGOING_PAGE} from "../pages";
import {Auth} from "../providers";
import {UserInfo} from "../model/auth/user-info";
import {AccountInfo} from "../model/auth/account-info";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = LOGIN_PAGE;
  activePage = new Subject();

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;

  placeholder = 'assets/img/avatar/girl-avatar.png';
  chosenPicture: any;

  constructor(private auth: Auth,
              private menuCtrl: MenuController,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Входящие', component: INCOMING_PAGE, active: true, icon: 'home'},
      {title: 'Исходящие', component: OUTGOING_PAGE, active: false, icon: 'map'}
    ];

    this.initializeApp();


    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        console.log("title:",page.title,"selectedPage:",selectedPage.title, "active:", page.active);
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authenticationState.subscribe(state => {
        console.log("state: "+state)
        let rootPage: any = LOGIN_PAGE;
        if (state) {
          rootPage = INCOMING_PAGE;
        }
        /*else {
          this.rootPage = LOGIN_PAGE;
        }*/

        this.menuCtrl.enable(state);
        this.nav.setRoot(rootPage);
      })
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  get accountInfo(): AccountInfo {
    return this.auth.accountInfo;
  }

  logout() {
    this.auth.logout();
  }
}
