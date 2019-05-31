import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableData} from "../../../../core/data/smart-table";
import {ParentService} from "../../../../core/services/parent.service";

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss']
})
export class ChildDetailsComponent implements OnInit {


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
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'First Name',
        type: 'string',
      },
      surname: {
        title: 'Last Name',
        type: 'string',
      },
      patronymic: {
        title: 'Username',
        type: 'string',
      },
      gender: {
        title: 'Gender',
        type: 'option',
        editable: false,
      },
      birthDate: {
        title: 'Birth Date',
        type: 'date',
        editable: false,
      },
    },
  };

  constructor(private service: SmartTableData, private parentService: ParentService) {
    this.parentService.getChildList().then(
      res=>{
        res.splice(0, 1);
        this.source.load(res);
      }
    );
  }

  ngOnInit() {
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
