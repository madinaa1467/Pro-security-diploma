import {Component, OnInit} from '@angular/core';
import {ClientData} from '../../../model/ClientData';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
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
