import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {ToSave} from "../../model/ToSave";
import {Phone} from "../../model/Phone";
import {Auth} from "../../providers/auth/auth";

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
  birth_date = new FormControl(new Date());

  public phoneTypes: phoneType[] = [
    {
      'value': 'mob',
      'viewValue': 'Mobile'
    },
    {
      'value': 'home',
      'viewValue': 'Home'
    },
    {
      'value': 'work',
      'viewValue': 'Work'
    },
  ];
  public defaultPhoneType = this.phoneTypes[0].value;

  public toSave: ToSave = new ToSave();
  public phones: Phone[] = [];

  userForm: FormGroup;
  phoneList: FormArray;
  formErrors = {
    'email': '',
    'password': '',
    'password2': '',
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder, public translate: TranslateService,
              private translatePipe: TranslatePipe, private auth: Auth) {
  }

  ngOnInit() {
    this.buildForm();
    // this.userForm.controls.phones.type.setValue(this.phoneTypes[0])
    console.log(this.userForm);
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
      'birth_date': ['', [
        Validators.required
      ]
      ],
      'gender': ['', [
        Validators.required
      ]
      ],
      'phones': this.fb.array([this.createPhone()])

    }, {validator: this.checkIfMatchingPasswords('password', 'password2')});

    this.userForm.valueChanges.subscribe(data => {

      this.onValueChanged(data);
      Object.keys(this.userForm.controls).forEach(value => {
        console.log(value, ' - ', this.userForm.controls[value].valid);
        // console.log(this.userForm.controls[value]);
        // console.log(this.userForm.controls[value].valid);
      });
      console.log('userForm:', this.userForm.value);

    });

    this.phoneList = this.userForm.get('phones') as FormArray;
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
    console.log('onValueChanged: ', data);
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
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa', this.userForm.getRawValue());
    this.toSave = ToSave.create(this.userForm.getRawValue());
    this.auth.register(this.toSave);
  }

  goToSignin() {
    this.navCtrl.pop();
  }

  public savePhone() {

    // this.phones.push({ number: "", type: "mob", parent: 0, oldNumber: ""});
    this.phoneList.push(this.createPhone());
  }

  getPhoneError(phoneErrorsArray) {
      console.log(phoneErrorsArray);

      if(phoneErrorsArray['pattern'] !== undefined){
        console.log("AAAAAAAA pattern", phoneErrorsArray);
        return 'The Phone must be in format +7';
      } else if(phoneErrorsArray['required'] !== undefined){
        console.log("AAAAAAAA required", phoneErrorsArray);
        return 'Please enter your Phone';
      }
  }


  public deletePhone(phoneId) {
    // this.phones.splice(phoneId, 1);
    this.phoneList.removeAt(phoneId);
  }

  createPhone(): FormGroup {
    return this.fb.group({
      type: ['', [Validators.required]],
      number: ['', [
        Validators.required,
        Validators.pattern('^[+]*[0-9 -()]*[0-9 -]*[0-9]$'),
        // Validators.pattern(new RegExp('^\\\+[0-9]?()[0-9](\d[0-9]{9})\$')),
      ]
      ],
    });
  }

  get phoneForms() {
    return this.userForm.get('phones') as FormArray;
  }
}

export interface phoneType {
  value: string;
  viewValue: string;
}

