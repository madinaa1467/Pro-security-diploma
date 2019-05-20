import {Component, Input, OnInit} from '@angular/core';
import {NbMenuService, NbSidebarService} from "@nebular/theme";
import {LayoutService} from "../../../core/utils";
import {UserInfo, UserService} from "../../../core/data/users";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [
    {
      title: 'Profile'
    },
    {
      title: 'Log out',
      link: '/auth/logout',
    }];

  sidebarEnd = false;
  expanded = false;
  wasExpanded = false;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    //this.user = {name: 'Vasya Pupkin', picture: 'assets/images/nick.png'};
    this.userService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.user = {
        name: userInfo.displayName,
        picture: 'assets/images/nick.png'
      };
    })
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
