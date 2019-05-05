import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Auth} from "../../providers/auth/auth";
import {PhoneType, phoneTypes} from "../../model/phone/phone-type";
import {GenderType, genderTypes} from "../../model/gender/gender-type";

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
      'alreadyInUse': 'Email is already in use',
    },
    'password': {
      'required': 'Please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 6 characters',
      'maxlength': 'Please enter less than 25 characters',
    },
    'password2': {
      'required': 'Value must be equal to password',
      'notEquivalent': 'Password confirmation must be equal to password',
    },
    'username': {
      'required': 'Please enter your Username',
      'pattern': 'The Username must contain just letters',
      'minlength': 'Please enter more than 2 characters',
      'maxlength': 'Please enter less than 25 characters',
      'alreadyInUse': 'Username is already in use',
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
    'phones': {
      'required': 'Please enter your Phone',
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
        Validators.pattern('^[a-zA-Z]*[ -]*[a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'name': ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*[ -]*[a-zA-Z]*$'),
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
        title: ' Уведомление',
        message: 'Вы успешно зарегистрировались!  и уже можете зайти....',
        buttons: [{
          text: 'Ok',
          handler: data => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();

    }).catch(err => {
      loading.dismiss();

      if (err.status) {
        let errors = err.error;

        errors.forEach((error) => {
          let field = this.userForm.controls[error.code];
          field.setErrors({[error.message]: true});
        });

        this.onValueChanged();
        return;
      }

      const alert = this.alertCtrl.create({
        title: 'Ошибка',
        message: err.error.error_description,
        buttons: ['Отклонять']
      });
      alert.present();
    });
  }

  public savePhone() {
    this.phones.push(this.createPhone());
  }

  getPhoneError (phoneErrorsArray) {
      if(phoneErrorsArray['pattern'] !== undefined){
        return 'The Phone must be in format +7';
      } else if(phoneErrorsArray['required'] !== undefined){
        return 'Please enter your Phone';
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
        Validators.pattern('^[+]*[0-9 -()]*[0-9 -]*[0-9]$')//fixme patter is not working
      ]
      ],
    });
  }

  get phones() {
    return this.userForm.get('phones') as FormArray;
  }
}
