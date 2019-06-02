import {Component, OnDestroy} from "@angular/core";
import {
  NbGlobalPhysicalPosition,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbToastrService
} from "@nebular/theme";
import {delay, takeWhile, withLatestFrom} from "rxjs/internal/operators";
import {UserCan} from "../../../core/model/UserCan";
import {MessagingService} from "../../../core/utils";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";

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
              private toastrService: NbToastrService,
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

    this.messagingService.onMessage()
    //.pipe(takeWhile(() => this.alive))
      .subscribe(notification => {
      let status: NbToastStatus = notification.data.action == "in" ? NbToastStatus.SUCCESS : NbToastStatus.INFO;

      this.showToast(status, notification['notification']);

    });
    //this.message = this.messagingService.currentMessage

  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  private showToast(type: NbToastStatus, message: any) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(message.body, message.title, config);
  }
}
