import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../core/data/smart-table';
import {ModeratorService} from "../../../core/services/moderator.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NbDateService} from "@nebular/theme";
import {EventWeb} from "../../../core/model/EventWeb";

@Component({
  selector: 'app-event-history-table',
  templateUrl: './event-history-table.component.html',
  styleUrls: ['./event-history-table.component.scss']
})
export class EventHistoryTableComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  entrances: [];
  minStart: Date;
  maxStart: Date;
  minEnd: Date;
  maxEnd: Date;
  data:EventWeb[];
  eventsPerPage = 9;
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
      firstName: {
        title: 'First Name',
        type: 'string',
        filter: false
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: false
      },
      patronymic: {
        title: 'Patronymic',
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
      date: {
        title: 'Time',
        type: 'date',
        filter: false
      },
    },
  };

  constructor(private service: SmartTableData, private moderatorService: ModeratorService,
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

    this.moderatorService.getEntranceList().then(
      res=>{
        this.entrances = res;
      }
    );

    this.moderatorService.getEventList(this.filterForm.getRawValue()).then(
      res=>{
        console.log('Cheeeeeeck', res);
        this.source.load(res);
        this.data = res;
        // this.source.setPaging(1, 2, true);

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
      'entrance': null,
      'childName': null,
      'childSurname': null,
      'childPatronymic': null,
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
    this.moderatorService.getEventList(this.filterForm.getRawValue()).then(
      res=>{
        this.source.load(res);
        this.data = res;
      }
    );
  }

  pageChange(pageIndex) {

    console.error('this.source.count()', this.source.count());
    console.error('pageIndex', pageIndex);

    this.filterForm.controls['offset'].patchValue(this.source.count());

    if(pageIndex > this.source.count() / this.filterForm.controls['limit'].value) {
      this.moderatorService.getEventList(this.filterForm.getRawValue()).then(
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
    // Object.keys(this.filterForm.controls).forEach((name) => {
    //   this.filterForm.controls[name].patchValue(null);
    // });

    this.filterForm.controls['entrance'].patchValue(null);
    this.filterForm.controls['childName'].patchValue(null);
    this.filterForm.controls['childSurname'].patchValue(null);
    this.filterForm.controls['childPatronymic'].patchValue(null);
    this.filterForm.controls['startDate'].patchValue(null);
    this.filterForm.controls['endDate'].patchValue(null);
    this.filterForm.controls['offset'].patchValue(0);
    this.search();
    this.accordion.close();
  }
}
