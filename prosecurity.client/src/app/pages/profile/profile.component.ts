import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NbDialogService} from "@nebular/theme";
import {ClientData} from "../../model/ClientData";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  @ViewChild("stepper") stepper;

  stepperDataArr: string[] = [];

  client: ClientData = new ClientData();

  constructor(private fb: FormBuilder, private dialogService: NbDialogService) {
    this.client.midname = "Ивановичь";
    this.client.surname = "Иванов";
    this.client.name = "Иван";
    this.client.addFakePhone();
    this.client.addFakeTickets();

    this.pushStepperTestData();
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  loadNextTicket() {

  }

  nextStep() {
    this.stepper.next();
  }

  prevStep() {
    this.stepper.previous();
  }

  isStepperBegin() {

  }

  isStepperEnd() {

  }

  pushStepperTestData() {
    this.stepperDataArr.push("TEXT 1");
    this.stepperDataArr.push("TEXT 2");
    this.stepperDataArr.push("TEXT 3");
    this.stepperDataArr.push("TEXT 4");
  }

  openConfirmDialog() {
    // this.dialogService.open(ConfirmTicketDialogComponent, {
    //   closeOnBackdropClick: true,
    // })
    //   .onClose.subscribe(name => {
    //   if (name) {
    //   }
    // });
  }
}
