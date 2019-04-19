import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
})
export class SignupPage implements OnInit  {
 //https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic
  //https://ionicframework.com/docs/v3/developer-resources/forms/   ---style
  birth_date = new FormControl(new Date());

  genders: Genders[] = [
    {value: 1, viewValue: 'Male'},
    {value: 2, viewValue: 'Female'},
  ];

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': '',
    'password2': '',
    'name': '',
    'surname': '',
    'phone': '',
    'gender': '',
    'patronymic': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'Please enter your vaild email'
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
    'phone': {
      'required': 'Please enter your Phone',
      'pattern': 'The Phone must contain numbers',
      'minlength': 'Please enter more than 2 characters',
      'maxlength': 'Please enter less than 25 characters',
    },
    'gender': {
      'required': 'Please choose your sex',
    },
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder) {
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
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        // // Validators.pattern('password')
        // Validators.minLength(6),
        // Validators.maxLength(25)
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
      'phone': ['', [
        Validators.required,
        Validators.pattern('^[+]*[0-9 -()]*[0-9 -]*[0-9]$'),
        Validators.minLength(2),
        Validators.maxLength(25)
      ]
      ],
      'gender': ['', [
        Validators.required,
      ]
      ],

    }, {validator: this.checkIfMatchingPasswords('password', 'password2')});// PasswordValidator.areEqual(this.formGroup));

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
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

  register(){
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa', this.userForm);
  }

  goToSignin() {
    this.navCtrl.pop();
  }
}
export interface Genders {
  value: number;
  viewValue: string;
}

