import {Phone} from "./Phone";

export class ToSave {
  public email: string;
  public gender: string;
  public password: string;
  // public img: string;
  public surname: string;
  public name: string;
  public patronymic: string;
  public birth_date: Date;
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
    this.surname = a.surname;
    this.name = a.name;
    this.patronymic = a.patronymic;
    this.birth_date = a.birth_date;
    this.phones = (a.phones instanceof Array) ? a.phones.map(c => Phone.create(c)) : [];
  }
}
