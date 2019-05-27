import {Component, OnInit} from '@angular/core';
import {SmartTableData} from "../../../core/data/smart-table";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'app-child-event-list',
  templateUrl: './child-event-list.component.html',
  styleUrls: ['./child-event-list.component.scss']
})
export class ChildEventListComponent implements OnInit {

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
