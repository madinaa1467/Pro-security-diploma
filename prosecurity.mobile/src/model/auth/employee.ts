export class Employee {
  public id: string;
  public FIO: string;
  public OrganizationId: string;
  public DepartmentId: string;
  public SpecNameRu: string;

  public static create(a: any): Employee {
    const ret = new Employee();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    this.id = a.id;
    this.FIO = a.FIO;
    this.OrganizationId = a.OrganizationId;
    this.DepartmentId = a.DepartmentId;
    this.SpecNameRu = a.SpecNameRu;
  }
}
