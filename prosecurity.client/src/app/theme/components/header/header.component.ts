import {Component, Input, OnInit} from '@angular/core';
import {NbMenuService, NbSidebarService} from "@nebular/theme";
import {LayoutService} from "../../../core/utils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              // TODO: asset 5/14/19   private userService: UserData,
              private layoutService: LayoutService) { }

  ngOnInit() {
    //todo here must be userService to get user
    this.user = {name: 'Vasya Pupkin', picture: 'assets/images/nick.png'};
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

}
