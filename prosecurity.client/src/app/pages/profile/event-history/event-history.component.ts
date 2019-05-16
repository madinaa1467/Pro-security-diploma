import {Component, Input} from '@angular/core';
import {Tickets} from "../../../model/Tickets";

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent {

  _ticket: Tickets;

  @Input()
  set ticket(val: any) {
    this._ticket = val;
  }

}
