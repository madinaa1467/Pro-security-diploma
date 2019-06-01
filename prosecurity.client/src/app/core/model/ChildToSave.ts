export class ChildToSave {
  public id: number;
  public gender: string;
  public img: string;
  public name: string;
  public surname: string;
  public patronymic: string;
  public birthDate: Date;
  public cardNumber: string;
  public password: string;
  public notification: number;

  public static create(a: any): ChildToSave {
    const ret = new ChildToSave();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.id = a.id;
    this.gender = a.gender;
    this.img = a.img;
    this.name = a.name;
    this.surname = a.surname;
    this.patronymic = a.patronymic;
    this.birthDate = a.birthDate;
    this.cardNumber = a.cardNumber;
    this.password = a.password;
    this.notification = (!!a.notification) ? 1 : 0;
  }
}
