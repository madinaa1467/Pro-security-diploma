export class Child {
  public id: number;
  public fio: string;
  public gender: string;
  public img: string;
  public imgId: string;
  public name: string;
  public surname: string;
  public patronymic: string;
  public birthDate: string;
  public cardNumber: string;
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

    // TODO: msultanova 5/17/19 remove me
    this.imgId = a.img;
    this.img = a.img;
    /*
    if (a.img)
      this.img = a.img;
    else
      this.img = '../../assets/src/unknown.png';*/

    this.name = a.name;
    this.surname = a.surname;
    this.patronymic = a.patronymic;
    if (a.birthDate) this.birthDate = new Date(a.birthDate).toJSON();
    this.cardNumber = a.cardNumber;
    this.notification = a.notification;

    // noinspection SuspiciousInstanceOfGuard
    // this.events = (a.events instanceof Array) ? a.events.map(c => c) : [];
  }
}
