import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToSave} from "../../model/ToSave";
import {Phone} from "../../model/Phone";
import {Subscription} from "rxjs/Subscription";
import {ParentService} from "../../providers/services/parent.service";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfile implements OnInit {
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
  private parentInfoChanges$: Subscription;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private parentService: ParentService) {
    //this.buildForm();

    // this.userForm = this.fb.group(
    //   {
    //     name: [null],
    //     surname: [null]
    //   });
  }

  ngOnInit() {
    this.load();
    this.parentService.loadParentInfo().then(list => {
      console.log("AAAAAAAAAAAAAAAAAAAAAAA parentInfoChanges$", list);
      console.log("list", list);
      console.log("this.userForm:", this.userForm);
      this.userForm.patchValue({
        birth_date: new Date(),
        gender: "male",
        name: "Александр",
        password: null,
        patronymic: "Сергеевич",
        phones: [
          {number: "+1111111111", type: "mob"},
          {number: "+2222222222", type: "home"}
        ],
        surname: "Пушкин"
      });
      /*for (const key of Object.keys(list)) {
        this.userForm.get(key).setValue(list[key]);
      }*/
    });
    // this.userForm.controls.phones.type.setValue(this.phoneTypes[0])
    console.log(this.userForm);
  }

  async load(){
    await this.buildForm();

  }

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
      'required': 'Please enter your email',
      'email': 'Please enter your valid email',
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

  updateProfile() {
    //console.log("userForm.value:",this.userForm.getRawValue())
    let loader = this.loadingCtrl.create({
      duration: 200
    });
    loader.present().then(() => this.navCtrl.pop()); // Get back to profile page. You should do that after you got data from API
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buildForm() {
    let array:FormArray = this.fb.array([this.createPhone(),this.createPhone()]);

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
      'phones': array

    }, {validator: this.checkIfMatchingPasswords('password', 'password2')});

    this.userForm.valueChanges.subscribe(data => {

      this.onValueChanged(data);
      // Object.keys(this.userForm.controls).forEach(value => {
      //   console.log(value, ' - ', this.userForm.controls[value].valid);
      //   // console.log(this.userForm.controls[value]);
      //   // console.log(this.userForm.controls[value].valid);
      // });
      // console.log('userForm:', this.userForm.value);

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
    // console.log('onValueChanged: ', data);
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
    console.log('ionViewDidLoad Edit -Page');
  }

  public savePhone() {

    // this.phones.push({ number: "", type: "mob", parent: 0, oldNumber: ""});
    this.phoneList.push(this.createPhone());
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
        // Validators.pattern('^[+]*[0-9 -()]*[0-9 -]*[0-9]$'),
        // Validators.pattern(new RegExp('^\\\+[0-9]?()[0-9](\d[0-9]{9})\$')),
      ]
      ],
    });
  }

  get phoneForms() {
    return this.userForm.get('phones') as FormArray;
  }

  handleFile(files: any) {
    console.log({files})
  }
}

export interface phoneType {
  value: string;
  viewValue: string;
}
