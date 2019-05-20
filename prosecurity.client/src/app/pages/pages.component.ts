import {Component, OnDestroy} from '@angular/core';
import {MENU_ITEMS, MenuItem} from "./pages-menu";
import {takeWhile} from "rxjs/internal/operators";
import {CanIProvider} from "../security/services/can.i.provider";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnDestroy {
  //menu = MENU_ITEMS;

  menu: MenuItem[] = [];

  private alive = true;

  constructor(private canIProvider: CanIProvider) {


    this.canIProvider.getCans().pipe(
      takeWhile(() => this.alive),
      map((cans: Set<string>) => {
        this.menu = [];
        MENU_ITEMS.map(item => {
          if (!item.permission) {
            this.menu.push(item);
          } else {
            item.permission = Array.isArray(item.permission) ? item.permission : [item.permission];

            let permitted: boolean = item.permission.some(permitted => cans.has(permitted));
            if (permitted) {
              this.menu.push(item);
            }
          }
        });
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
