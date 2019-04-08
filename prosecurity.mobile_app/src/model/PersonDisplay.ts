import {UserCan} from "./UserCan";
import {ChildEvents} from "./ChildEvents";

export class PersonDisplay {
  public fio: string;
  public username: string;
  public children: ChildEvents[];

  public static of(a: any): PersonDisplay {
    const ret = new PersonDisplay();
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
