import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../core/data/smart-table';

@Component({
  selector: 'app-event-history-table',
  templateUrl: './event-history-table.component.html',
  styleUrls: ['./event-history-table.component.scss']
})
export class EventHistoryTableComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      username: {
        title: 'Username',
        type: 'string',
      },
      enterance: {
        title: 'enterance',
        type: 'string',
      },
      date: {
        title: 'date',
        type: 'date',
      },
    },
  };

  constructor(private service: SmartTableData) {
  }

  ngOnInit() {
    const data = this.service.getData();
    this.source.load(data);
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
