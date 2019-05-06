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
export class ChildPofile implements OnInit {

  public child = Child;
  public action: string;
  childForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private parentService: ParentService) {
    this.buildForm();
    this.child = this.navParams.get('child');
    this.action = this.navParams.get('action');
    if(!this.child){
      this.child = Child;
    }
    console.error('Modaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal', this.child);
    this.childForm.patchValue(this.child);
  }

  ngOnInit() {

  }

  selectChange(e) {
    console.log(e);
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
  buildForm() {
    this.childForm = this.fb.group({
      'onay_number': ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*[ -]*[a-zA-Z]*$'),
      ]
      ],
      'name': ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*[ -]*[a-zA-Z]*$'),//'^[\\w\u0430-\u044f]*[ -]*[\\w\u0430-\u044f]*$'
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'surname': ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*[ -]*[a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'patronymic': ['', [
        Validators.pattern('^[a-zA-Z]*[ -]*[a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'birthDate': ['', [
        Validators.required
      ]
      ],
      'gender': ['', [
        Validators.required
      ]
      ],
      'notification': ['', []
      ]
    });
  }
}
