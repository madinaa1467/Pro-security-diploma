export class Organization {
  public id: string;
  public NameRu: string;
  public NameKz: string;
  public Address: string;
  public BIN: string;
  public IsDeleted: boolean;


  public static create(a: any): Organization {
    const ret = new Organization();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    this.id = a.id;
    this.NameRu = a.NameRu;
    this.NameKz = a.NameKz;
    this.Address = a.Address;
    this.BIN = a.BIN;
    this.IsDeleted = a.IsDeleted;
  }
}
