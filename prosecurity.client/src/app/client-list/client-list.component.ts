import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {ClientListService} from "./client-list.service";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(public login: LoginService, public listService: ClientListService) {}

  ngOnInit() {
    this.listService.load();
  }

}
