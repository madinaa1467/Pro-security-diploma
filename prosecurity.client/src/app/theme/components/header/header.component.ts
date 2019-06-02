import {Component, Input, OnInit} from '@angular/core';
import {NbMenuService, NbSidebarService} from "@nebular/theme";
import {LayoutService} from "../../../core/utils";
import {UserCan} from "../../../core/model/UserCan";
import {UserInfo} from "../../../core/model/auth/user-info";
import {UserService} from "../../../core/data/users";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  VIEW_MENU: UserCan = UserCan.ADMIN;
  MODERATOR: UserCan = UserCan.MODERATOR;

  placeholder: string = 'assets/images/unknown.png';

  user: any;

  userMenu = [
    {
      title: 'Log out',
      link: '/auth/logout',
    }];

  expanded = false;
  wasExpanded = false;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {

    this.userService.userInfoChange().subscribe((userInfo: UserInfo) => {
      this.user = {
        name: userInfo.displayName,
        img: userInfo.img
      };
      if (['USER'].some(permitted => userInfo.cans.has(permitted)) && this.userMenu.length < 2) {
        this.userMenu.push({
          title: 'Profile',
          link: '/pages/user/profile'
        });
        this.userMenu.push({
          title: 'Even List',
          link: '/pages/user'
        });
      }
    });


  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  toggleNotification() {
    this.sidebarService.toggle(false, 'settings-sidebar');
    this.expanded = !this.expanded;
    this.wasExpanded = true;
  }

}
