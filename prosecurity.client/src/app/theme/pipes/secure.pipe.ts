import {Pipe, PipeTransform} from '@angular/core';
import {FileService} from "../../core/utils";
import {map} from "rxjs/internal/operators";

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {
  constructor(private fileService: FileService) {}

  transform(fileId: string) {
    return this.fileService.load(fileId).pipe(
      map(res => {
        const reader = new FileReader();
        //reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(res);
      })
    );
  }

}
