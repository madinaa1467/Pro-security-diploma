import {NbMenuItem} from "@nebular/theme";

export class MenuItem extends NbMenuItem {
  permission?: string | string[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Profile',
    icon: 'nb-grid-b',
    link: '/pages/profile',
    permission: ["VIEW_PARENT", "VIEW_EDIT_MODERATOR"]
  },
  {
    title: 'History',
    icon: 'nb-grid-b',
    link: '/pages/history',
    home: true,
    permission: "VIEW_EVENT_LIST"
  },
  {
    title: 'No permission',
    icon: 'nb-grid-b',
    link: '/pages/profile'
  },
];
