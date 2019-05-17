import {Pipe, PipeTransform} from '@angular/core';
import {ImagePickerProvider} from "../providers";

@Pipe({
  name: 'secure',
})
export class SecurePipe implements PipeTransform {
  constructor(private imgProvider: ImagePickerProvider) {}

  transform(fileId: string) {
    return this.imgProvider.getFileById(fileId);
  }
}
