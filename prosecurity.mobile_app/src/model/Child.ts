
export class Child {
  public id: number;
  public user_name: string;
  public gender: string;
  public img: string;

  public static create(a: any): Child {
    const ret = new Child();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.id = a.id;
    this.user_name = a.name;
    this.gender = a.gender;
    this.img = 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120';

    // noinspection SuspiciousInstanceOfGuard
    // this.events = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
