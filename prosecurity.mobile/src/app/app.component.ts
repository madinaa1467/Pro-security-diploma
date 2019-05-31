import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {Auth} from "../providers";
import {TranslateService} from "@ngx-translate/core";
import {Push, PushObject, PushOptions} from "@ionic-native/push";

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
              private push:Push) {


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
        }
        this.nav.setRoot(rootPage);
      });

      const options:PushOptions = {
        android: {
          sound:true,
          vibrate: true,
          forceShow:true,
        },
        ios:{
          alert: 'true',
          badge: true,
          sound: 'false'
        }
      };

      const pushObject: PushObject = this.push.init(options);
      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
      pushObject.on('error').subscribe(error => console.log('Error with Push plugin', error));
      /*pushObject.unregister().then(()=> {
        const pushObject1: PushObject = this.push.init(options);
        pushObject1.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
        pushObject1.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
        pushObject1.on('error').subscribe(error => console.log('Error with Push plugin', error));
      });*/

    });
  }

  private setStatusBarColor() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#000');
  }

}
