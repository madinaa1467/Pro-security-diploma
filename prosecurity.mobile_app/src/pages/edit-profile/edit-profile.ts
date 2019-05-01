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

  userForm: FormGroup;
  phoneList: FormArray;
  formErrors = {
    'email': '',
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
      'pattern': 'The Phone must be in format +7',
    },
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
    this.buildForm();
    this.parentService.loadParentInfo().then(list => {
      console.log("list", list);

      if(list.phones){
        list.phones.forEach(x => {
          this.phoneForms.push(this.createPhone())
        });
      }

      this.userForm.patchValue(list);

      /*this.userForm.patchValue({
        name: "Alexandr",
        surname: "Pushkin",
        patronymic: "Sergeevich",
        email:"asd@asd",
        birth_date: "2019-05-23",
        gender: "male",
        phones: [
          {number: "+1111111111", type: "mob"},
          {number: "+2222222222", type: "home"}
        ]
      });*/

    });
  }

  updateProfile() {
    console.log("userForm.value:",this.userForm.getRawValue())
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
      'birth_date': ['', [
        Validators.required
      ]
      ],
      'gender': ['', [
        Validators.required
      ]
      ],
      'phones': this.fb.array([])

    });

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

  getPhoneError(phoneErrorsArray) {
    if(phoneErrorsArray['pattern'] !== undefined){
      return 'The Phone must be in format +7';
    } else if(phoneErrorsArray['required'] !== undefined){
      return 'Please enter your Phone';
    }
  }

  public deletePhone(phoneId) {
    // this.phones.splice(phoneId, 1);
    this.phoneList.removeAt(phoneId);
  }

  createPhone(number?:string, type?:string): FormGroup {
    return this.fb.group({
      type: [type, [Validators.required]],
      number: [number, [
          Validators.required,
          Validators.pattern('^[+]*[0-9 -()]*[0-9 -]*[0-9]$')
        ]
      ],
    });
  }

  get phoneForms():FormArray {
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
