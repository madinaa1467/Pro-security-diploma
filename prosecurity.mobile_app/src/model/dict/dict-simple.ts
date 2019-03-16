export class DictSimple {
  public id: number;
  public nameRu: string;

  public static create(a: any): DictSimple {
    const ret = new DictSimple();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    this.id = a.id;
    this.nameRu = a.nameRu;
  }
}
