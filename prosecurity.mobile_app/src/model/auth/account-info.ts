import {UserInfo} from "./user-info";

export class AccountInfo {
  public organization: string;
  public department:string;
  public fio:string;

  public static create(a: UserInfo): AccountInfo {
    const ret = new AccountInfo();
    ret.assign(a);
    return ret;
  }

  private assign(a: UserInfo) {
    this.organization = a.organization.NameRu;
    this.department = a.department.NameRu;
    this.fio = a.employee.FIO;
  }
}
