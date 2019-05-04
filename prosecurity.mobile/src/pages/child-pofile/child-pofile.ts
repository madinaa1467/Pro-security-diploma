import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../providers/services/parent.service";
import {Phone} from "../../model/Phone";
import {ToSave} from "../../model/ToSave";
import {Subscription} from "rxjs/Subscription";
import {Child} from "../../model/Child";

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
export class ChildPofile implements OnInit {;

  public child = Child;
  public action: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private parentService: ParentService) {
    this.child = this.navParams.get('child');
    this.action = this.navParams.get('action');
    if(!this.child){
      this.child = Child;
    }
    console.error('Modaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal', this.child);
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
    console.log('ionViewDidLoad ChildPofile Modal -Page');
  }


  handleFile(files: any) {
    console.log({files})
  }
}
