import { Component, OnInit } from '@angular/core';
import {ClientData} from '../../../model/ClientData';

@Component({
  selector: 'app-prorile-info',
  templateUrl: './prorile-info.component.html',
  styleUrls: ['./prorile-info.component.scss']
})
export class ProrileInfoComponent implements OnInit {
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
