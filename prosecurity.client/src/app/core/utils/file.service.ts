import {Injectable} from '@angular/core';
import {HttpService} from "../../http/services";
import {HttpResponse} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FileService {

  constructor(private http: HttpService) { }

  load(fileId: string): Observable<File> {
    return this.http.get('files/get', {fileId: fileId}, {observe: 'response', responseType: 'blob'})
      .pipe(map((response: HttpResponse<Blob>) => {
        const filename: string = response.headers.get('Content-Disposition')
          .split(';')[1]
          .split('=')[1]
          .replace(/["]/g, '');

        return this.blobToFile(response.body, filename);
      }))
  }

  private blobToFile = (blob: Blob, filename: string): File => {
    let b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = filename;

    return <File> b;
  }
}
