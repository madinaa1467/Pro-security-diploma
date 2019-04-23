
export class AccountInfo {
  public id: number;
  public username: string;
  public fio:string;

  public static create(a: any): AccountInfo {
    const ret = new AccountInfo();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    this.id = a.id;
    this.username = a.username;
    this.fio = a.fio;

  }
}
