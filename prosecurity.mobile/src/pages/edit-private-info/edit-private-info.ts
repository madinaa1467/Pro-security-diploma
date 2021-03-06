import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../providers/services/parent.service";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

@IonicPage()
@Component({
  selector: 'page-edit-private-info',
  templateUrl: 'edit-private-info.html',
})
export class EditPrivateInfo implements OnInit {

  @ViewChild('stepper') stepper;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private parentService: ParentService,
    private toastNotificationService: ToastNotificationService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  changePassword() {
    const loading = this.loadingCtrl.create();
    this.parentService.changePassword(this.privateInfoForm.controls['password'].value).then(_resp => {
      loading.dismiss();
      if (_resp == true) {
        this.dismiss();
        this.toastNotificationService.presentToast('Вы успешнo изменили пароль');
        //todo change by languge
      } else {
        this.dismiss();
        this.toastNotificationService.presentToast('Возникли проблемы и пароль не был изменен!');
        //todo change by languge
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad Edit Private -Page');
  }

  selectChange(e) {
    console.log(e);
    if (e == 1) {
      const loading = this.loadingCtrl.create();
      loading.present();
      this.parentService.checkPassword(this.privateInfoForm.controls['oldPassword'].value)
        .then(list => {
          loading.dismiss();
        }).catch(err => {
        loading.dismiss();
        if (err.status == 400) {
          let errors = err.error;

          errors.forEach((error) => {
            let field = this.privateInfoForm.controls[error.code];
            field.setErrors({[error.message]: true});
          });

          this.onValueChanged();
          this.stepper.selectedIndex = 0;
          return;
        }
      });
    }
  }


  privateInfoForm: FormGroup;
  formErrors = {
    'oldPassword': '',
    'password': '',
    'password2': ''
  };
  validationMessages = {
    'oldPassword': {
      'required': 'Please enter your old password',
      'notCorrect': 'Password is not correct!',
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
    }
  };

  buildForm() {
    this.privateInfoForm = this.fb.group({
      'oldPassword': ['', [
        Validators.required,
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
      ]

    }, {validator: this.checkIfMatchingPasswords('password', 'password2')});

    this.privateInfoForm.valueChanges.subscribe(data => {
      //delete
      Object.keys(this.privateInfoForm.controls).forEach(value => {
        console.log(value, ' - ', this.privateInfoForm.controls[value].value, this.privateInfoForm.controls[value].valid);
      });
      this.onValueChanged(data);
    });

    this.onValueChanged();
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  onValueChanged(data?: any) {
    if (!this.privateInfoForm) {
      return;
    }
    const form = this.privateInfoForm;
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

}
