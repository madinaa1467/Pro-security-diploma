import {Injectable} from '@angular/core';
import {Api} from "..";


@Injectable()
export class FileProvider {

  constructor(private api: Api) {
  }

  upload(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      
    };
  }

}
