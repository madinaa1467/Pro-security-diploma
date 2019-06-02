import {Auth} from "../../providers/auth/auth";
import {PhoneType, phoneTypes} from "../../model/phone/phone-type";
import {GenderType, genderTypes} from "../../model/gender/gender-type";
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {Component, OnInit} from "@angular/core";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [TranslatePipe]
})
export class SignupPage implements OnInit {
  //https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic
  //https://ionicframework.com/docs/v3/developer-resources/forms/   ---style

  public phoneTypes: PhoneType[] = phoneTypes;
  public genderTypes: GenderType[] = genderTypes;

  mask: any[] = ['8', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  myModel:string;

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': '',
    'password2': '',
    'username': '',
    'name': '',
    'surname': '',
    'gender': '',
    'patronymic': '',
    'phones': '',
  };

  validationMessages = {
    'email': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.EMAIL_REQUIRED'),
      'email': this.translatePipe.transform('SIGN_UP_VALIDATOR.EMAIL_VALID'),
      'alreadyInUse': this.translatePipe.transform('SIGN_UP_VALIDATOR.in_use'),
    },
    'password': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.pass_req'),
      'pattern': this.translatePipe.transform('SIGN_UP_VALIDATOR.pass_pattern'),
      'minlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.pass_min'),
      'maxlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.pass_max'),
    },
    'password2': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.conf_pass_req'),
      'notEquivalent': this.translatePipe.transform('SIGN_UP_VALIDATOR.conf_pass_not_equal'),
    },
    'username': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.username_req'),
      'pattern': this.translatePipe.transform('SIGN_UP_VALIDATOR.username_pattern'),
      'minlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.username_min'),
      'maxlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.username_max'),
      'alreadyInUse': this.translatePipe.transform('SIGN_UP_VALIDATOR.username_in_use'),
    },
    'name': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.name_req'),
      'pattern': this.translatePipe.transform('SIGN_UP_VALIDATOR.name_pattern'),
      'minlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.name_min'),
      'maxlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.name_max'),
    },
    'surname': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.surname_req'),
      'pattern': this.translatePipe.transform('SIGN_UP_VALIDATOR.surname_pattern'),
      'minlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.surname_min'),
      'maxlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.surname_max'),
    },
    'patronymic': {
      'pattern': this.translatePipe.transform('SIGN_UP_VALIDATOR.patronymic_pattern'),
      'minlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.patronymic_min'),
      'maxlength': this.translatePipe.transform('SIGN_UP_VALIDATOR.patronymic_max'),
    },
    'gender': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.gender_req'),
    },
    'phones': {
      'required': this.translatePipe.transform('SIGN_UP_VALIDATOR.phone_req')
      // 'pattern': 'The Phone must be in format +7',
    },
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private fb: FormBuilder,
              public translate: TranslateService,
              private translatePipe: TranslatePipe,
              private auth: Auth) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'password2': ['', [
        Validators.required,
      ]
      ],
      'username': ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9_.]+$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'name': ['', [
        Validators.required,
        Validators.pattern('^[А-Яа-яA-Za-z]*[ _-]*[А-Яа-яA-Za-z]+$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'surname': ['', [
        Validators.required,
        Validators.pattern('^[А-Яа-яA-Za-z]*[ _-]*[А-Яа-яA-Za-z]+$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'patronymic': ['', [
        Validators.pattern('^[А-Яа-яA-Za-z]*[ _-]*[А-Яа-яA-Za-z]+$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'birthDate': [new Date().toJSON(), [
        Validators.required
      ]
      ],
      'gender': [genderTypes[0].value, [
        Validators.required
      ]
      ],
      'phones': this.fb.array([this.createPhone()])

    }, {validator: this.checkIfMatchingPasswords('password', 'password2')});

    this.userForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });

    this.onValueChanged();
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    const form = this.userForm;
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  register() {
    const loading = this.loadingCtrl.create();
    loading.present();

    this.auth.register(this.userForm.getRawValue()).then(res=>{
      loading.dismiss();

      const alert = this.alertCtrl.create({
        //todo change by languge
        title: this.translatePipe.transform('SIGN_UP.notification'),
        message: this.translatePipe.transform('SIGN_UP.success_register'),
        buttons: [{
          text: this.translatePipe.transform('SIGN_UP.ok_button'),
          handler: data => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();

    }).catch(err => {
      loading.dismiss();

      if (err.status == 400) {
        let errors = err.error;

        errors.forEach((error) => {
          let field = this.userForm.controls[error.code];
          field.setErrors({[error.message]: true});
        });

        this.onValueChanged();
        return;
      }

      const alert = this.alertCtrl.create({
        title: this.translatePipe.transform('SIGN_UP.exception'),
        message: err.error.error_description,
        buttons: [this.translatePipe.transform('SIGN_UP.try_again')]
      });
      alert.present();
    });
  }

  public savePhone() {
    this.phones.push(this.createPhone());
  }

  getPhoneError (phoneErrorsArray) {
      if(phoneErrorsArray['pattern'] !== undefined){
        return this.translatePipe.transform('SIGN_UP_VALIDATOR.phone_format');
      } else if(phoneErrorsArray['required'] !== undefined){
        return this.translatePipe.transform('SIGN_UP_VALIDATOR.phone_req');
      }
  }


  public deletePhone(phoneId) {
    this.phones.removeAt(phoneId);
  }

  createPhone(number?:string): FormGroup {
    return this.fb.group({
      type: [this.phoneTypes[0].value, [Validators.required]],
      number: [number, [
        Validators.required,
        Validators.pattern('[\\d]{1}\\(?[\\d]{3}\\)?[\\d]{3}-?[\\d]{2}-?[\\d]{2}[\\w]?')
      ]
      ],
    });
  }

  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  trimLastCharacter(value, index){
    if (value.length > 15) {
      let filed = this.phones.controls[index];
      filed.patchValue({number: value.slice(0, -1)});
    }
  }

}
