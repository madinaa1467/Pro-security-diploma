export class EventWeb {
  public id: number;
  public date: Date;
  public time: String;
  public action: String;
  public gender: String;
  public entrance: String;
  public parentFio: String;

  public childId: number;
  public fio: string;
  public img: string;
  public firstName: String;
  public lastName: String;
  public patronymic: String;

  public when: string;
  public timeUnit: string;

  public static create(a: any): EventWeb {
    const ret = new EventWeb();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.id = a.id;
    this.date = a.date;
    this.time = a.time;
    this.action = a.action;
    this.childId = a.childId;
    this.fio = a.fio;
    this.gender = a.gender;
    this.img = a.img;
    this.entrance = a.entrance;
    this.firstName = a.firstName;
    this.lastName = a.lastName;
    this.patronymic = a.patronymic;
    this.parentFio = a.parentFio;

    if(a.when)
      this.when = a.when;
    if(a.timeUnit)
      this.timeUnit = a.timeUnit;
  }
}
