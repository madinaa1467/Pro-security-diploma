import {Component, OnInit} from '@angular/core';
import {Child} from "../../../core/model/Child";

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss']
})
export class ParentProfileComponent implements OnInit {

  child: Child = new Child();

  constructor() {
    this.child.patronymic = 'Ивановичь';
    this.child.surname = 'Иванов';
    this.child.name = 'Иван';
  }

  ngOnInit() {
  }
}
