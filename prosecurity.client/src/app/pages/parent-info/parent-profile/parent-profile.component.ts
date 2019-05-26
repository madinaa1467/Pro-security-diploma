import {Component, OnInit} from '@angular/core';
import {ClientData} from "../../../model/ClientData";

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss']
})
export class ParentProfileComponent implements OnInit {

  client: ClientData = new ClientData();

  constructor() {
    this.client.midname = 'Ивановичь';
    this.client.surname = 'Иванов';
    this.client.name = 'Иван';
    this.client.addFakePhone();
    this.client.addFakeTickets();
  }

  ngOnInit() {
  }
}
