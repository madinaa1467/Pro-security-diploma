import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../providers/services/parent.service";
import {Phone} from "../../model/Phone";
import {ToSave} from "../../model/ToSave";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the ChildPofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-child-pofile',
  templateUrl: 'child-pofile.html',
})
export class ChildPofile implements OnInit {
  birth_date = new FormControl(new Date());

  // You can get this data from your API. This is a dumb data for being an example.
  public user_data = {
    profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
    name: 'Can Delibas',
    surname: 'Can Delibas',
    patronymic: 'patronymic',
    username: 'candelibas',
    website: 'https://github.com/candelibas',
    description: 'Software developer, open-source lover & Invoker spammer',
    email: 'candelibas00@gmail.com',
    phone: '',
    gender: 'male'
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private parentService: ParentService) {
  }

  ngOnInit() {

  }


  updateProfile() {
    let loader = this.loadingCtrl.create({
      duration: 200
    });
    loader.present().then(() => this.navCtrl.pop()); // Get back to profile page. You should do that after you got data from API
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Edit -Page');
  }


  handleFile(files: any) {
    console.log({files})
  }
}
