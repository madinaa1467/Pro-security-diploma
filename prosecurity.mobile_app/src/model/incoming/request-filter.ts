export class RequestFilter {
  public search: string;
  public statusId: number = 1; //default value DEFAULT_STATUS_ID=1 'Новый'
  public spg: number = 1;
  public readonly sizePage: number = 10; //static default value
}
