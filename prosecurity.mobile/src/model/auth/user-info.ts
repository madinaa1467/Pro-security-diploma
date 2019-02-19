import {Organization} from "./organization";
import {Department} from "./department";
import {Employee} from "./employee";

export class UserInfo {
  public organization: Organization = new Organization();
  public department: Department = new Department();
  public employee: Employee = new Employee();

  public static create(a: any): UserInfo {
    const ret = new UserInfo();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    if (a.organization) this.organization = Organization.create(a.organization);
    if (a.department) this.department = Department.create(a.department);
    if (a.employee) this.employee = Employee.create(a.employee);
  }
}
