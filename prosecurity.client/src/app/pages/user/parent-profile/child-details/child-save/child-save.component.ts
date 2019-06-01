import {Component, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Child} from "../../../../../core/model/Child";
import {GenderType, genderTypes} from "../../../../../core/model/gender/gender-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../../../../core/services/parent.service";
import {ChildToSave} from "../../../../../core/model/ChildToSave";

@Component({
  selector: 'app-child-save',
  templateUrl: './child-save.component.html',
  styleUrls: ['./child-save.component.scss']
})
export class ChildSaveComponent implements OnInit {

  constructor(protected ref: NbDialogRef<ChildSaveComponent>,
              private fb: FormBuilder,
              private parentServics: ParentService) { }

  child: Child = new Child;
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
    // this.child.fio = this.child.surname + ' ' + this.child.name + ' ' + this.child.patronymic;
    let childToSave = ChildToSave.create(this.child);
    childToSave.password = this.firstForm.controls['password'].value;
    childToSave.cardNumber = this.firstForm.controls['cardNumber'].value;
    this.parentServics.save(childToSave).then(_resp => {
      alert(`Child changed!`);
      this.ref.close(this.child);
    }).catch(err => {
      if (err.status == 400) {
        let errors = err.error;
        alert(`Error, Try again!`);
        errors.forEach((error) => {

          console.error("error", error);
          // let field = this.childForm.controls[error.code];
          // field.setErrors({[error.message]: true});
        });

        return;
      }
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }


  buildForm() {
    this.firstForm = this.fb.group({
      'cardNumber': ['', [
        Validators.required,
      ]
      ],
      'password': ['', [
        Validators.required,
      ]
      ]
    });
    this.firstForm.valueChanges.subscribe(data => {
      Object.keys(this.firstForm.controls).forEach(value => {
        // console.log('AAAA', this.childForm.controls);
        console.log(value, ' - ', this.firstForm.controls[value].value, this.firstForm.controls[value].valid);
      })

    });


  }

  changeStepper() {

    if (this.stepper.selectedIndex == 0) {
      console.log("Send: ", this.child);
      this.parentServics.getChildByCard(
        this.firstForm.controls['cardNumber'].value.replace(/\D/g, '').substring(0, 19),
        this.firstForm.controls['password'].value,
        this.child.id)
        .then(list => {
          console.error("Answer: ", list);
          console.error("this.childForm: ", this.firstForm.controls);
          this.stepper.selectedIndex = 1;
        }).catch(err => {
        if (err.status == 400) {

          let errors = err.error;

          errors.forEach((error) => {
            alert(`Password is not correct!`);
            let field = this.firstForm.controls[error.code];
            field.setErrors({[error.message]: true});
          });
          return;
        }
      });
    } else {
      this.stepper.selectedIndex = this.stepper.selectedIndex == 0 ? 1 : 0;
    }
  }
}
