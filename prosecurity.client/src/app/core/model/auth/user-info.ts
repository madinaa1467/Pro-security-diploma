export class UserInfo {
  public displayName: string;
  public username: string;
  public img: string;
  public role: string;
  public cans: Set<string>;

  public static of(a: any): UserInfo {
    const ret: UserInfo = new UserInfo();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.displayName = a.displayName;
    this.username = a.username;
    this.img = a.img;
    this.role = a.role;
    this.cans = (a.cans instanceof Array) ? new Set(a.cans) : new Set();
  }

}
