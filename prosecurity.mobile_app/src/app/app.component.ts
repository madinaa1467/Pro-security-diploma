import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {Auth} from "../providers";
import {TranslateService} from "@ngx-translate/core";

class SignalRProvider {
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = 'LoginPage';
  @ViewChild(Nav) nav: Nav;


  constructor(private platform: Platform, private statusBar: StatusBar,
              private splashScreen: SplashScreen, private auth: Auth, public translate: TranslateService) {
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
      this.statusBar.show();
      this.splashScreen.hide();

      if (this.platform.is("Android")) {
        /*this.localNotifications.on('trigger').subscribe(res => {
          console.log("res:", res);
        });*/

        // this.showBannerAd()
      }


      this.auth.authenticationState.subscribe(state => {
        let rootPage: any = 'LoginPage';
        if (state) {
          rootPage = TabsPage;

          //
          // this.auth.getUsername().then((userName: string) => {
          //
          //   this.signalr.register(userName).then(() => {
          //     this.signalr.send().subscribe((res: any[]) => {
          //       let notifications: ILocalNotification[] = [];
          //
          //       res.forEach((x: string) => {
          //         notifications.push(this.createNotification(JSON.parse(x)));
          //       });
          //       this.scheduleNotifications(notifications);
          //     });
          //   });
          // });
        }

        this.nav.setRoot(rootPage);
      });
    });
  }

}
//test
