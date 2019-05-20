import {Injectable} from '@angular/core';
import {Auth} from "..";

@Injectable()
export class AppLoader {

  constructor(private auth: Auth) {
  }

  initApp(): Promise<any> {

    return this.auth.authenticated().then(res => {
      if (res) {
        return this.auth.loadAccountInfo().catch(error => {
          console.error("Произошла ошибка при загрузки данный сессии", error);
        });
      }
    });
  }
}
