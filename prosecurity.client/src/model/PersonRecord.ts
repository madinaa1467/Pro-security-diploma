export class PersonRecord {
  public id: string;
  public fio: string;
  public username: string;
  public birthDate: string;
  public cans: string;

  public static create(a: any): PersonRecord {
    const ret = new PersonRecord();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.id = a.id;
    this.fio = a.fio;
    this.username = a.username;
    this.birthDate = a.birthDate;
    this.cans = a.cans;
  }
}
