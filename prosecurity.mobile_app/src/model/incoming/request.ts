export class Request {
  public uid: string;
  public title: string;
  public description: string;
  public requestGroupId: number;
  public requestGroupName: string;
  public statusName: string;
  public priorityName: string;
  public createDate: Date;
  public createrUid: string;
  public createrFIO: string;
  public executerUid: string;
  public executerFIO: string;
  public executerDate: Date;
  public state: string;
  public dateTime: Date;

  public static create(a: any): Request {
    const ret: Request = new Request();
    ret.assign(a);
    return ret;
  }

  private assign(a: any) {
    this.uid = a.uid;
    this.title = a.title;
    this.description = a.description;
    this.requestGroupId = a.requestGroupId;
    this.requestGroupName = a.requestGroupName;
    this.statusName = a.statusName;
    this.priorityName = a.priorityName;
    this.createDate = a.createDate;
    this.createrUid = a.createrUid;
    this.createrFIO = a.createrFIO;
    this.executerUid = a.executerUid;
    this.executerFIO = a.executerFIO;
    this.executerDate = a.executerDate;
    this.state = a.state;
    this.dateTime = a.dateTime;
  }
}
