import {Component, OnDestroy} from "@angular/core";
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from "@nebular/theme";
import {delay, takeWhile, withLatestFrom} from "rxjs/internal/operators";
import {UserCan} from "../../../core/model/UserCan";
import {MessagingService} from "../../../core/utils";

@Component({
  selector: 'app-page-layout',
  styleUrls: ['./page.layout.scss'],
  templateUrl: './page.layout.html',
})
export class PageLayoutComponent implements OnDestroy {

  ADMIN: UserCan = UserCan.ADMIN;
  MODERATOR: UserCan = UserCan.MODERATOR;

  sideBarEnd: boolean = false;
  tag: string = 'menu-sidebar';

  private alive = true;

  constructor(private menuService: NbMenuService,
              protected themeService: NbThemeService,
              private bpService: NbMediaBreakpointsService,
              private sidebarService: NbSidebarService,
              private messagingService: MessagingService) {

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse(this.tag);
        }
      });

    this.messagingService.onMessage().pipe(
      takeWhile(() => this.alive)
    ).subscribe(message => console.log('message:', message));
    //this.message = this.messagingService.currentMessage

  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
