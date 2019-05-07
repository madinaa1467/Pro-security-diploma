export class Phone {
  public number: string;
  public type: string;

  public static create(a: any): Phone {
    const ret = new Phone();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.number = !! a.number? a.number.replace(/\D+/g, ''): a.number;
    this.type = a.type;
  }
}
