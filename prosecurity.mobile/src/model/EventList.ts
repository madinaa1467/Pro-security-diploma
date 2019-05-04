import {Event} from "./Event";

export class EventList {
  public date: string;
  public events: Event[];

  public static create(a: any): EventList {
    const ret = new EventList();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.date = a.date;
    this.events = (a.events instanceof Array) ? a.events.map(c => Event.create(c)) : [];
  }
}
