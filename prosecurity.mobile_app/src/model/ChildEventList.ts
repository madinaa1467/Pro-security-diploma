export class ChildEventList {
  public id: number;
  public fio: string;
  public events: Event[];

  public static create(a: any): ChildEventList {
    const ret = new ChildEventList();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.fio = a.fio;
    // noinspection SuspiciousInstanceOfGuard
    this.events = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
