import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../core/data/smart-table';
import {ModeratorService} from "../../../core/services/moderator.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NbDateService} from "@nebular/theme";

@Component({
  selector: 'app-event-history-table',
  templateUrl: './event-history-table.component.html',
  styleUrls: ['./event-history-table.component.scss']
})
export class EventHistoryTableComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  formControl = new FormControl(new Date());
  selectedItemFormControl = new FormControl();

  minStart: Date;
  maxStart: Date;
  minEnd: Date;
  maxEnd: Date;

  filterForm: FormGroup;

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      patronymic: {
        title: 'Patronymic',
        type: 'string',
      },
      parentFio: {
        title: 'Parent',
        type: 'string',
        filter: false
      },
      entrance: {
        title: 'Entrance',
        type: 'string',
      },
      date: {
        title: 'Time',
        type: 'date',
      },
    },
  };

  constructor(private service: SmartTableData, private moderatorService: ModeratorService,
              protected dateService: NbDateService<Date>,
              private fb: FormBuilder) {
  this.minStart = this.dateService.addMonth(this.dateService.today(), -1);
  this.maxStart = this.dateService.addMonth(this.dateService.today(), 1);
}

  ngOnInit() {
    this.buildForm();

    let data = [];
    this.moderatorService.getEventList().then(
      res=>{
        console.log('Cheeeeeeck', res);
        data = res;
        this.source.load(data);
      }
    );

  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  buildForm() {
    this.filterForm = this.fb.group({
      'childName': null,
      'childSurname': null,
      'childPatronymic': null,
      '': null,
    });

    this.filterForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.filterForm) {
      return;
    }
    const form = this.filterForm;

  }





}
