import {Injectable} from '@angular/core';
import {Api} from "..";
import {FileModel} from "../../model/file-model";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {HttpResponse} from "@angular/common/http/src/response";

@Injectable()
export class FileProvider {

  constructor(private api: Api) {
  }

  upload (file: any): Observable<string> {
    return new Observable<string>((observer) => {
      if (file == null) {
        observer.next(null);
        observer.complete();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const fileModel = FileModel.fromFile(file);
        fileModel.src = reader.result ? reader.result.split(',')[1] : '';
        this.uploadFile(fileModel, 0, 100000, observer);
      };
    });
  }

  load(fileId:string) {
    return this.api.get('files/get', {fileId: fileId}, {observe: 'response', responseType: 'blob'})
      .toPromise().then( (response:HttpResponse<Blob>) => {
        //console.log('res:', response);
        const filename: string = response.headers.get('Content-Disposition')
          .split(';')[1]
          .split('=')[1]
          .replace(/["]/g, '');

        return this.blobToFile(response.body, filename);
      });
  }

  private blobToFile= (blob: Blob, filename:string):File => {
    let b:any = blob;
    b.lastModifiedDate = new Date();
    b.name = filename;

    return <File> b ;
  }


  private uploadFile (fileModel: FileModel, fromByte: number = 0, portion: number = 100000, observer: Observer<string>) {
    if (fileModel == null) {
      observer.next(null);
      observer.complete();
      return;
    }

    const toByte = fromByte + portion;

    const fileToSave: FileModel = FileModel.fromFileModel(fileModel);
    fileToSave.src = fileToSave.src.substring(fromByte, toByte);
    //console.log("toByte:", toByte, 'fileToSave.src:', fileToSave.src.length, 'fileModel.src:', fileModel.src.length);

    const isLast = fileToSave.src == null || toByte > fileModel.src.length;

    this.api.post('files/save', {file: JSON.stringify(fileToSave), isLast: isLast}).toPromise()
      .then((fileId:string) => {
        if (fromByte === 0) {
          fileModel.id = fileId ;
        }

        if (!isLast) {
          this.uploadFile(fileModel, toByte, portion, observer);
        } else {
          fileModel.id = fileId ;
          observer.next(fileModel.id);
          observer.complete();
        }
      }, error => {
        observer.error(error);
      });
  }
}
