import {Pipe, PipeTransform} from '@angular/core';
import {FileService} from "../../core/utils";
import {map} from "rxjs/internal/operators";
import {of as observableOf} from "rxjs";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {
  constructor(private fileService: FileService) {}

  transform(fileId: string) {
    if (isNullOrUndefined(fileId)) return observableOf(null);

    return this.fileService.load(fileId).pipe(
      map(res => {
        let source = null;

        const reader = new FileReader();
        reader.onloadend = () => source = reader.result;
        reader.readAsDataURL(res);

        return source;
      })
    );
  }

}
