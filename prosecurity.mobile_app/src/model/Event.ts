export class Event {
  public id: number;
  public date: Date;
  public time: String;
  public action: String;

  public childId: number;
  public fio: string;
  public img: string;

  public when: string;
  public timeUnit: string;

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

    if(a.when)
      this.when = a.when;
    if(a.timeUnit)
      this.timeUnit = a.timeUnit;
  }
}
