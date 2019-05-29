import {Phone} from "./Phone";

export class ParentDetails {
  public email: string;
  public gender: string;
  public password: string;
  public img: string;
  public username: string;
  public name: string;
  public surname: string;
  public patronymic: string;
  public birthDate: string;
  public phones: Phone[];

  public static create(a: any): ParentDetails {
    const ret = new ParentDetails();
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
    this.img = a.img;
    if(a.birthDate) this.birthDate = new Date(a.birthDate).toJSON();

    this.phones = (a.phones instanceof Array) ? a.phones.map(c => Phone.create(c)) : [];
  }
}
