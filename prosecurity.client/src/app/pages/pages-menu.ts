import {NbMenuItem} from "@nebular/theme";

export class MenuItem extends NbMenuItem {
  permission?: string | string[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Profile',
    icon: 'nb-grid-b',
    link: '/pages/profile',
    permission: "ASD"
  },
  {
    title: 'History',
    icon: 'nb-grid-b',
    link: '/pages/history',
    home: true,
    permission: "VIEW_USERS"
  },
  {
    title: 'Sdsd',
    icon: 'nb-grid-b',
    link: '/pages/profile'
  },
];
