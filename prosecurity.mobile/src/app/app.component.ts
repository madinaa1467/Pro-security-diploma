import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {Auth, NotificationProvider} from "../providers";
import {TranslateService} from "@ngx-translate/core";

class SignalRProvider {
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = 'LoginPage';
  @ViewChild(Nav) nav: Nav;


  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private auth: Auth,
              public translate: TranslateService,
              private notification: NotificationProvider) {


    console.log("LANG" + navigator.language);
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');

    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.show();
      this.setStatusBarColor();
      this.splashScreen.hide();

      this.auth.authenticationState.subscribe(state => {
        let rootPage: any = 'LoginPage';
        if (state) {
          rootPage = TabsPage;
          this.notification.register();
        }
        this.nav.setRoot(rootPage);
      });
    });
  }

  private setStatusBarColor() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#000');
  }

}
