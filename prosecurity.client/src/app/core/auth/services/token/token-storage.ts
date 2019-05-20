import {Injectable} from "@angular/core";

export abstract class TokenStorage {

  abstract get(): string;

  abstract set(token: string);

  abstract clear();
}

@Injectable()
export class TokenLocalStorage extends TokenStorage {

  protected key = 'auth_app_token';

  get(): string {
    return localStorage.getItem(this.key);
  }

  set(token: string) {
    localStorage.setItem(this.key, token);
  }


  clear() {
    localStorage.removeItem(this.key);
  }
}
