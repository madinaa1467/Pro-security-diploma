export class Event {
  public id: number;
  public date: Date;
  public time: String;
  public action: String;

  public childId: number;
  public fio: string;
  public img: string;

  public static create(a: any): Event {
    const ret = new Event();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.id = a.id;
    this.date = a.date;
    this.time = a.time;
    this.action = a.action;
    this.childId = a.childId;
    this.fio = a.fio;
    this.img = a.img;

    // noinspection SuspiciousInstanceOfGuard
    // this.events = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
