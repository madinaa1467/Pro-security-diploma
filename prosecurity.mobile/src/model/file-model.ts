export class FileModel {
  public id: string;
  public type: string;
  public name: string;
  public src: any;


  public static fromFile (f: File): FileModel {
    if (f == null) return null;
    let ret = new FileModel();
    ret.id = null;
    ret.name = f.name;
    //ret.title = f.name;
    ret.type = f.type;
    return ret;
  }

  public static fromFileModel (f: FileModel): FileModel {
    if (f == null) return null;
    let ret = new FileModel();
    ret.id = f.id;
    ret.name = f.name;
    //ret.title = f.title;
    ret.type = f.type;
    ret.src = f.src;

    return ret;
  }

}
