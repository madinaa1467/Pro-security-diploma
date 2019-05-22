import {Pipe, PipeTransform} from '@angular/core';
import {FileService} from "../../core/utils";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {
  constructor(private fileService: FileService) {}

  transform(fileId: string) {
    return new Promise((resolve, reject) => {
      if (isNullOrUndefined(fileId)) {
        resolve(null);
        return;
      }

      this.fileService.load(fileId).toPromise()
        .then(response => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(response);
        })
        .catch(err => reject(err));
    });
  }

}
