import {Phone} from "./Phone";

export class ToSave {
  public email: string;
  public gender: string;
  public password: string;
  public img: string;
  public username: string;
  public name: string;
  public surname: string;
  public patronymic: string;
  public birthDate: Date;
  public phones: Phone[];

  public static create(a: any): ToSave {
    const ret = new ToSave();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.email = a.email;
    this.password = a.password;
    this.gender = a.gender;
    this.username = a.username;
    this.name = a.name;
    this.surname = a.surname;
    this.patronymic = a.patronymic;
    this.birthDate = a.birthDate;
    this.img = a.img;
    this.phones = (a.phones instanceof Array) ? a.phones.map(c => Phone.create(c)) : [];
  }
}
