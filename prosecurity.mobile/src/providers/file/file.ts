import {Injectable} from '@angular/core';
import {Api} from "..";
import {FileModel} from "../../model/file-model";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";


@Injectable()
export class FileProvider {

  constructor (private api: Api) {
  }

  upload (file: File): Observable<string> {

    return new Observable<string>((observerArg) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {

        const fileModel = FileModel.fromFile(file);
        console.log(reader.result.toString());

        let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }

        fileModel.src = encoded;
        this.uploadFile(fileModel, 0, 100000, observerArg);
      };
    });
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
    console.log("toByte:", toByte, 'fileToSave.src:', fileToSave.src.length, 'fileModel.src:', fileModel.src.length);

    const isLast = fileToSave.src == null || toByte > fileModel.src.length;

    this.api.post('files/save', {file: JSON.stringify(fileToSave), isLast: isLast}).toPromise()
      .then(res => {
        if (fromByte === 0) {
          fileModel.id = res + '';
        }

        if (!isLast) {
          this.uploadFile(fileModel, toByte, portion, observer);
        } else {
          fileModel.id = res + '';
          observer.next(fileModel.id);
          observer.complete();
        }
      }, error => {
        observer.error(error);
      });
  }
}
