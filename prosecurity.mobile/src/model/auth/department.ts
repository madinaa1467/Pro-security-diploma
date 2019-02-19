export class Department {
  public id: string;
  public NameRu: string;
  public OrganizationId: string;

  public static create(a: any): Department {
    const ret = new Department();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    this.id = a.id;
    this.NameRu = a.NameRu;
    this.OrganizationId = a.OrganizationId;
  }
}
