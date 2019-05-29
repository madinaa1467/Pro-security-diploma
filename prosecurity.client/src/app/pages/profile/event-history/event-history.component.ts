import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent {


  @Input()
  set ticket(val: any) {
  }

}
