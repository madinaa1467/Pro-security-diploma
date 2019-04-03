export class Child {
  public fio: string;
  public events: Event[];

  public static of(a: any): Child {
    const ret = new Child();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.fio = a.fio;
    // noinspection SuspiciousInstanceOfGuard
    this.events = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
