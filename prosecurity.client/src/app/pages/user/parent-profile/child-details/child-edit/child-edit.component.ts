import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Child} from "../../../../../core/model/Child";
import {GenderType, genderTypes} from "../../../../../core/model/gender/gender-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../../../../core/services/parent.service";

@Component({
  selector: 'app-child-edit',
  templateUrl: './child-edit.component.html',
  styleUrls: ['./child-edit.component.scss']
})
export class ChildEditComponent implements OnInit{

  constructor(protected ref: NbDialogRef<ChildEditComponent>,
              private fb: FormBuilder,
              private parentServics: ParentService) { }

  @Input()
  child: Child;
  public genderTypes: GenderType[] = genderTypes;
  firstForm: FormGroup;
  secondForm: FormGroup;
  @ViewChild('stepper') stepper;


  ngOnInit(): void {
    this.buildForm();
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.child.fio = this.child.surname + ' ' + this.child.name + ' ' + this.child.patronymic;
    this.ref.close(this.child);
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }


  buildForm() {
    this.firstForm = this.fb.group({
      'cardNumber': [this.child.cardNumber, [
        Validators.required,
      ]
      ],
      'password': ['', [
        Validators.required,
      ]
      ]
    });
    this.firstForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
      Object.keys(this.firstForm.controls).forEach(value => {
        // console.log('AAAA', this.childForm.controls);
        console.log(value, ' - ', this.firstForm.controls[value].value, this.firstForm.controls[value].valid);
      })

    });

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    // if (!this.childForm) {
    //   return;
    // }
    // const form = this.childForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
  }

  changeStepper(){

    if(this.stepper.selectedIndex == 0){
      console.log("Send: ", this.child);
      this.parentServics.getChildByCard(
        this.firstForm.controls['cardNumber'].value.replace(/\D/g, '').substring(0, 19),
        this.firstForm.controls['password'].value,
        this.child.id)
        .then(list => {
          console.error("Answer: ", list);
          console.error("this.childForm: ", this.firstForm.controls);
        }).catch(err => {
        if (err.status == 400) {
          let errors = err.error;

          errors.forEach((error) => {
            let field = this.firstForm.controls[error.code];
            field.setErrors({[error.message]: true});
          });

          this.onValueChanged();
          this.stepper.selectedIndex = 0;
          return;
        }
      });
    }


    this.stepper.selectedIndex = this.stepper.selectedIndex == 0 ? 1 : 0;
  }
}
