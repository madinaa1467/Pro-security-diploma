import {Component} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: any;
  form: FormGroup;
  isShowLang: boolean = false;

  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public app: App,
              private auth: Auth,
              private fb: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams, public translate: TranslateService,
              private toastNotificationService: ToastNotificationService) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ionViewCanEnter() {
    return !this.auth.isAuthenticated();
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    const loading = this.loadingCtrl.create();
    loading.present();

    this.auth.login(this.form.getRawValue())//{username:Madina, password:Madina123madina, grant_type:password}
      .then(res => {
        //loading.onDidDismiss(() => {});
        loading.dismiss();
      }).catch(err => {
      console.error('err:', err);

      loading.dismiss();
      // this.toastNotificationService.presentToast('Произошла ошибка');
      const alert = this.alertCtrl.create({
        title: 'Ошибка',
        message: err.error,
        buttons: ['Отклонять']
      });
      alert.present();
    });

  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  colors = new Array(
    [117, 208, 227],
    [101, 197, 218],
    [119, 166, 228],
    [119, 148, 228],
    [119, 133, 228],
    [122, 119, 228]);

  step = 0;
  // color table indices for:
  // [current color left,next color left,current color right,next color right]
  colorIndices = [0, 1, 2, 3];

  // transition speed
  gradientSpeed = 0.00005;
  gradient = '';

  updateGradient() {

    const c00 = this.colors[this.colorIndices[0]];
    const c01 = this.colors[this.colorIndices[1]];
    const c10 = this.colors[this.colorIndices[2]];
    const c11 = this.colors[this.colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c00[0] + this.step * c01[0]);
    const g1 = Math.round(istep * c00[1] + this.step * c01[1]);
    const b1 = Math.round(istep * c00[2] + this.step * c01[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c10[0] + this.step * c11[0]);
    const g2 = Math.round(istep * c10[1] + this.step * c11[1]);
    const b2 = Math.round(istep * c10[2] + this.step * c11[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    this.gradient = `-webkit-gradient(linear, left top, right bottom, from(${color1}), to(${color2}))`;
    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] =
        (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

      this.colorIndices[3] =
        (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

    }

    setInterval(() => {
      this.updateGradient();
    }, 40);
  }

  showLang() {

  }
}
