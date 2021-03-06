import {Component, OnInit, ViewChild} from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Platform,
  ToastController,
  ViewController
} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../providers/services/parent.service";
import {PhoneType, phoneTypes} from "../../model/phone/phone-type";
import {GenderType, genderTypes} from "../../model/gender/gender-type";
import {Camera} from "@ionic-native/camera";
import {File as NativeFile} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {Crop} from "@ionic-native/crop";
import {ParentDetails} from "../../model/parent-details";
import {ImagePickerComponent} from "../../components/image-picker/image-picker";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfile implements OnInit {

  // You can get this data from your API. This is a dumb data for being an example.
  public user_data = {
    profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
    //profile_img: 'http://localhost:1313/prosecurity/api/files/get?fileId=2h8nnf5Y0c6oG',
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

  @ViewChild(ImagePickerComponent) imagePicker: ImagePickerComponent;

  placeholder: string;
  chosenPictureId: string;

  public phoneTypes: PhoneType[] = phoneTypes;
  public genderTypes: GenderType[] = genderTypes;
  mask: any[] = ['8', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'username': '',
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
      'alreadyInUse': 'Email is already in use',
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
      'pattern': 'The Phone must be in format +7',
    },
  };


  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private camera:Camera,
    private cropService: Crop,
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: NativeFile,
    private filePath: FilePath,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private parentService: ParentService,
    private toastNotificationService: ToastNotificationService) {
  }

  ngOnInit() {

    this.buildForm();
    this.parentService.loadParentInfo().then((list: ParentDetails) => {
      if(list.phones){
        list.phones.forEach(x => {
          this.phones.push(this.createPhone())
        });
      }

      this.userForm.patchValue(list);

      this.chosenPictureId = this.userForm.get("img").value;
    });
  }

  updateProfile() {

    const loading = this.loadingCtrl.create();
    loading.present();

    this.imagePicker.getValue().then(img => {
      this.userForm.patchValue({img: img});

      this.parentService.save(this.userForm.getRawValue()).then(_ => {
        loading.dismiss();
        this.navCtrl.pop();
        this.toastNotificationService.presentToast('Ваш профиль успешно изменен изменен!');

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
      });
    }).catch(err => console.error("err:", err));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'img': null,
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'username': ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9_.]+$'),//'^[\\w\u0430-\u044f]*[ -]*[\\w\u0430-\u044f]*$'
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
      'birthDate': ['', [
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
    });

    this.onValueChanged();

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

  static ionViewDidLoad() {
    console.log('ionViewDidLoad Edit -Page');
  }

  public savePhone() {
    this.phones.push(this.createPhone());
  }

  getPhoneError(phoneErrorsArray) {
    if(phoneErrorsArray['pattern'] !== undefined){
      return 'The Phone must be in format +7';
    } else if(phoneErrorsArray['required'] !== undefined){
      return 'Please enter your Phone';
    }
  }

  public deletePhone(phoneId) {
    this.phones.removeAt(phoneId);
  }

  get phones():FormArray {
    return this.userForm.get('phones') as FormArray;
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

  trimLastCharacter(value, index){
    if (value.length > 15) {
      let filed = this.phones.controls[index];
      filed.patchValue({number: value.slice(0, -1)});
    }
  }

}
