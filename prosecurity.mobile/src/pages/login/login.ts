import {Component} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../../providers";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;


  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public app: App,
              private auth: Auth,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      grant_type: ["password"]
    });
  }

  ionViewCanEnter() {
    return !this.auth.isAuthenticated();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Logged in!',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();

    this.auth.login(this.form.getRawValue()).catch(err => {
    });

  }
}
