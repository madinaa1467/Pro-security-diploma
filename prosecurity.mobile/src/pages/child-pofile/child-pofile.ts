import {Child} from "../../model/Child";
import {ChildService} from "../../providers/services/child.service";
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenderType, genderTypes} from "../../model/gender/gender-type";
import {ImagePickerComponent} from "../../components/image-picker/image-picker";

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
  public genderTypes: GenderType[] = genderTypes;
  public isCheck: boolean = false;

  @ViewChild(ImagePickerComponent) imagePicker: ImagePickerComponent;
  public chosenPictureId: string;

  mask: any[] = [ /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/,  /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('stepper') stepper;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private childService: ChildService) {

    this.buildForm();
    this.child = this.navParams.get('child');
    this.action = this.navParams.get('action');
    if(!this.child){
      this.child = Child;
    }
    console.error('Opened Modal with param', this.child);
    console.error('this.child[\'imgId\']:', this.child['imgId']);
    this.childForm.patchValue(this.child);
  }

  ngOnInit() {

  }

  selectChange(e) {
    console.log(e);
    if (e == 0) {
      // TODO: msultanova 5/17/19 remove me
      this.isCheck = false;
    } else if (e == 1) {
      this.isCheck = true;
      this.chosenPictureId = this.child['imgId']; //this.childForm.get("imgId").value;
      const loading = this.loadingCtrl.create();
      let card_id = this.childForm.controls['cardNumber'].value;
      this.childForm.controls['cardNumber'].patchValue(card_id.substring(0, 23));
      console.log("Send: ", this.childForm.controls['cardNumber'].value);
      loading.present();
      this.childService.getChildByCard(card_id.replace(/\D/g,'').substring(0, 19),
        this.childForm.controls['id'].value)
        .then(list => {
        loading.dismiss();
        console.error("Answer: ", list);
        console.error("this.childForm: ", this.childForm.controls);
        this.childForm.patchValue(list);
      }).catch(err => {
        loading.dismiss();
        if (err.status == 400) {
          let errors = err.error;

          errors.forEach((error) => {
            let field = this.childForm.controls[error.code];
            field.setErrors({[error.message]: true});
          });

          this.onValueChanged();
          this.stepper.selectedIndex = 0;
          return;
        }
      });
    }
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

  saveChild() {
    const loading = this.loadingCtrl.create();
    loading.present();

    this.imagePicker.getValue().then(imgId => {

      let card_id = this.childForm.controls['cardNumber'].value;
      card_id = card_id.replace(/\D/g, '').substring(0, 19);
      // this.childForm.controls['cardNumber'].patchValue(card_id);

      this.childForm.patchValue({img: imgId, cardNumber: card_id});
      this.childService.save(this.childForm.getRawValue()).then(_resp => {
        loading.dismiss();
        let alert;
        if (this.action == 'edit') {
          alert = this.alertCtrl.create({
            //todo change by languge
            title: ' Уведомление',
            message: 'Вы успешнo изменили запись!',
            buttons: [{
              text: 'Ok',
              handler: data => {
                this.dismiss();
              }
            }]
          });
        } else {
          alert = this.alertCtrl.create({
            //todo change by languge
            title: ' Уведомление',
            message: 'Вы успешнo добавили ребенка!',
            buttons: [{
              text: 'Ok',
              handler: data => {
                this.dismiss();
              }
            }]
          });
        }
        alert.present();
      }).catch(err => {
        loading.dismiss();
        if (err.status == 400) {
          let errors = err.error;

          errors.forEach((error) => {
            let field = this.childForm.controls[error.code];
            field.setErrors({[error.message]: true});
          });

          this.onValueChanged();
          this.stepper.selectedIndex = 0;
          return;
        }
      });
    });
  }


  deleteChild(){
    //todo действительно ли вы хотите удалить?

    const deleteFor = this.alertCtrl.create({
      //todo change by languge
      title: ' ',
      message: 'Delete?',
      buttons: [{
        text: 'For all parents',
        handler: data => {
          this.delete('permanent');
        }
      }, {
        text: 'Just for me',
        handler: data => {
          this.delete('temporary');
        }
      }]
    });
    deleteFor.present();

  }


  delete(how: string){
    const loading = this.loadingCtrl.create();
    loading.present();
    let childId = this.childForm.controls['id'].value;
    if(childId) {
      this.childService.delete(childId, how).then(_resp => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          //todo change by languge
          title: ' Уведомление',
          message: 'Вы успешнo удалили запись везде!',
          buttons: [{
            text: 'Ok',
            handler: data => {
              this.dismiss();
            }
          }]
        });
        alert.present();
      });
    } else{
      const alert = this.alertCtrl.create({
        //todo change by languge
        title: ' Уведомление',
        message: 'Вы не можете удалить!',
        buttons: [{
          text: 'Ok',
          handler: data => {
            // this.dismiss();
          }
        }]
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildPofile Modal -Page');
  }

  handleFile(files: any) {
    console.log({files})
  }

  buildForm() {
    this.childForm = this.fb.group({
      'id': null,
      'img': null,
      'cardNumber': ['', [
        Validators.required,
        Validators.pattern('[\\d]{4}[- ]?[\\d]{2}[- ]?[\\d]{5}[- ]?[\\d]{4}[- ]?[\\d]{4}[\\w]?'),
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
      'birthDate': [, [
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
    this.childForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
      Object.keys(this.childForm.controls).forEach(value => {
        // console.log('AAAA', this.childForm.controls);
        console.log(value, ' - ', this.childForm.controls[value].value, this.childForm.controls[value].valid);
      })

    });

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.childForm) {
      return;
    }
    const form = this.childForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
              break;
            }
          }
        }
      }
    }


  }
  formErrors = {
    'cardNumber': '',
    'name': '',
    'surname': '',
    'patronymic': '',
    'gender': '',
    'notification' : ''
  };

  validationMessages = {
    'cardNumber': {
      'required': 'Enter onay',
      'pattern': 'Not correct!',
      'unknown': 'Unknown card, try again',
      'unavailable': 'Right now this card is unavailable',
      'alreadyInUse': 'This card already in use by someone else'
    },
    'name': {
      'required': 'Please enter your Name',
      'pattern': 'The Name must contain just letters',
      'minlength': 'Please enter more than 2 characters',
      'maxlength': 'Please enter less than 25 characters',
    },
    'surname': {
      'required': 'Please enter your Surname',
      'pattern': 'The Name must contain just letters',
      'minlength': 'Please enter more than 2 characters',
      'maxlength': 'Please enter less than 25 characters',
    },
    'patronymic': {
      'pattern': 'The Name must contain just letters',
      'minlength': 'Please enter more than 2 characters',
      'maxlength': 'Please enter less than 25 characters',
    },
    'gender': {
      'required': 'Please choose your gender',
    },
    'notification': {
    },
  };
}
