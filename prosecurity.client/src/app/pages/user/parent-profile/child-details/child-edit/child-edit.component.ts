import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Child} from "../../../../../core/model/Child";
import {GenderType, genderTypes} from "../../../../../core/model/gender/gender-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-child-edit',
  templateUrl: './child-edit.component.html',
  styleUrls: ['./child-edit.component.scss']
})
export class ChildEditComponent implements OnInit{

  constructor(protected ref: NbDialogRef<ChildEditComponent>, private fb: FormBuilder) { }

  @Input()
  child: Child;
  public genderTypes: GenderType[] = genderTypes;
  firstForm: FormGroup;
  secondForm: FormGroup;

  ngOnInit(): void {
    this.firstForm = this.fb.group({
      card: ['', Validators.required],
    },{
      password: ['', Validators.required],
    });
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
}
