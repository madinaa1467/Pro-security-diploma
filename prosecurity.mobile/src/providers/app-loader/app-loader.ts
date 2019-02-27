import {Injectable} from '@angular/core';
import {Auth} from "..";

@Injectable()
export class AppLoader {

  constructor(private auth: Auth) {
  }

  initApp(): Promise<any> {

    return this.auth.authenticated().then(res => {
      if (res) {
        return this.auth.getPersonDisplay().catch(error => {
          console.error("Произошла ошибка при загрузки данный сессии");
        });
      }
    });

    /*return new Promise((resolve,reject) => {

      this.auth.authenticated().then(res => {
        return this.auth.getUserInfo().then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });

        /!*if (res) {
          this.auth.getUserInfo().then(res => {
              resolve(res);
            },
            error => {
              reject(error);
            });
        } else {
          resolve();
        }*!/
      });

    });*/

    /* return this.auth.authenticated().then(res => {
       if (res) {
         return this.auth.getUserInfo();
       }
     });*/

    /*return new Promise((resolve,reject) => {
      /!*if (!this.auth.isAuthenticated()) {
        this.auth.logout();
      }
      resolve();
      *!/

      this.auth.authenticated().then(res => {
        if (res) {

        }

        resolve();
      }).catch(error => {
        this.auth.logout();
        reject(error);
      });
    });*/
  }
}
