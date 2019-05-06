
export class Child {
  public id: number;
  public fio: string;
  public gender: string;
  public img: string;
  public name: string;
  public surname: string;
  public patronymic: string;
  public notification: boolean;

  public static create(a: any): Child {
    const ret = new Child();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.id = a.id;
    this.fio = a.fio;
    this.gender = a.gender;
    this.img = 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120';
    this.name = a.name;
    this.surname = a.surname;
    this.patronymic = a.patronymic;
    this.notification = a.notification;

    // noinspection SuspiciousInstanceOfGuard
    // this.events = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
