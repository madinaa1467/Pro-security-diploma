import {NbMenuItem} from "@nebular/theme";
import {UserCan} from "../core/data/users";

export class MenuItem extends NbMenuItem {
  permission?: string | string[]
}

export const MENU_ITEMS: MenuItem[] = [

  {
    title: 'Profile',
    icon: 'nb-grid-b',
    link: '/pages/profile',
    permission: [UserCan.VIEW_PARENT, UserCan.VIEW_EDIT_MODERATOR]
  },
  {
    title: 'History',
    icon: 'nb-grid-b',
    link: '/pages/history',
    home: true,
    permission: UserCan.VIEW_EVENT_LIST
  },
  {
    title: 'No permission',
    icon: 'nb-grid-b',
    link: '/pages/profile'
  },
];
