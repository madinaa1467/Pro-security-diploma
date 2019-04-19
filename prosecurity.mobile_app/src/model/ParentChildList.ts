import {EventList} from "./EventList";

export class ParentChildList {
  public id: number;
  public fio: string;
  public username: string;
  public children: EventList[];

  public static create(a: any): ParentChildList {
    const ret = new ParentChildList();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.fio = a.fio;
    this.username = a.username;
    // noinspection SuspiciousInstanceOfGuard
    this.children = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
