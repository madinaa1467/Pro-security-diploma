import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {EventWeb} from "../../core/model/EventWeb";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SmartTableData} from "../../core/data/smart-table";
import {NbDateService} from "@nebular/theme";
import {ParentService} from "../../core/services/parent.service";
import {Child} from "../../core/model/Child";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  children: Child[];
  minStart: Date;
  maxStart: Date;
  minEnd: Date;
  maxEnd: Date;
  data:EventWeb[];
  eventsPerPage = 15;
  @ViewChild('item') accordion;

  filterForm: FormGroup;

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      perPage: this.eventsPerPage
    },
    columns: {
      fio: {
        title: 'Child',
        type: 'string',
        filter: false
      },
      parentFio: {
        title: 'Parent',
        type: 'string',
        filter: false
      },
      entrance: {
        title: 'Entrance',
        type: 'string',
        filter: false
      },
      time: {
        title: 'Time',
        type: 'string',
        filter: false
      },
      action: {
        title: 'Action',
        type: 'string',
        filter: false
      },
    },
  };

  constructor(private service: SmartTableData, private parentService: ParentService,
              protected dateService: NbDateService<Date>,
              private fb: FormBuilder) {
    this.maxStart = this.dateService.today();//this.dateService.addDay(this.dateService.today(), 0);
    this.maxEnd = this.dateService.today();//this.dateService.addDay(this.dateService.today(), 0);
  }

  ngOnInit() {
    this.buildForm();

    this.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChange(change.paging.page);
      }
    });

    this.parentService.getChildList().then(
      res=>{
        this.children = res;
      }
    );

    this.parentService.getEventList(this.filterForm.getRawValue()).then(
      res=>{
        console.log('Cheeeeeeck', res);
        this.source.load(res);
        this.data = res;
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
      'offset': 0,
      'limit': this.eventsPerPage + 1,
      'childId': null,
      'startDate': null,
      'endDate': null,
    });

    this.filterForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
      Object.keys(this.filterForm.controls).forEach(value => {
        console.log(value, ' - ', this.filterForm.controls[value].value);
      })
      // console.error('this.source', this.source);
    });


    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.filterForm) {
      return;
    }
    if(this.filterForm.controls['startDate'] != null){
      this.minEnd = this.filterForm.controls['startDate'].value;
    }
    if(this.filterForm.controls['endDate'] != null){
      this.maxStart = this.filterForm.controls['endDate'].value;
    }

  }


  search() {
    this.filterForm.controls['offset'].patchValue(0);
    this.parentService.getEventList(this.filterForm.getRawValue()).then(
      res=>{
        this.source.load(res);
        this.data = res;
      });
    this.accordion.close();
  }

  pageChange(pageIndex) {

    console.error('this.source.count()', this.source.count());
    console.error('pageIndex', pageIndex);

    this.filterForm.controls['offset'].patchValue(this.source.count());

    if(pageIndex > this.source.count() / this.filterForm.controls['limit'].value) {
      this.parentService.getEventList(this.filterForm.getRawValue()).then(
        res => {
          console.log('pagination', res);
          res.forEach(d => this.data.push(d));
          console.log("this.data", this.data);
          this.source.load(this.data);
          this.source.setPaging(pageIndex, this.eventsPerPage, true);
        }
      );

    }
  }

  clearFilter() {
    this.filterForm.controls['childId'].patchValue(0);
    this.filterForm.controls['startDate'].patchValue(null);
    this.filterForm.controls['endDate'].patchValue(null);
    this.filterForm.controls['offset'].patchValue(0);
    this.search();
  }
}
