import {Request} from "./request";

export class RequestList {
  public currentPage: number = 0;
  public pagesCount: number = 0;

  public requests: Request[] = [];


  public static create(a: any): RequestList {
    const ret: RequestList = new RequestList();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    if (!a) return;

    this.currentPage = a.currentPage;
    this.pagesCount = a.pagesCount;
    if (a.requests) this.requests = a.requests;
  }
}
