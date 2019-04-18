import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {isUndefined} from "util";

@Injectable()
export class Api {

  private _url: string = 'http://localhost:1313/prosecurity/api';

  constructor(private http: HttpClient) {
  }

  private url(endpoint: string): string {
    return `${this._url}/${endpoint}`;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    let defReqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      withCredentials: true,
      params : new HttpParams()
    };

    // if (reqOpts) {
    //   for (let k in reqOpts) {
    //     defReqOpts[k] = reqOpts[k];
    //   }
    // }
    // else {
    // if (!reqOpts) {
    //   reqOpts = {
    //     params : new HttpParams()
    //   };
    // }

    // Support easy query params for GET requests
    if (params) {
      defReqOpts.params = new HttpParams();
      for (let k in params) {
        let value = params[k];
        if (!isUndefined(value))
          defReqOpts.params = defReqOpts.params.set(k, value as string);
      }
    }
    return this.http.get(this.url(endpoint), defReqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    let defReqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      withCredentials: true
    };

    if (reqOpts) {
      for (let k in reqOpts) {
        defReqOpts[k] = reqOpts[k];
      }
    }

    let params: HttpParams = new HttpParams();

    for (let key in body) {
      let value = body[key];
      if (!isUndefined(value)) params = params.set(key, value as string);
    }


    return this.http.post(this.url(endpoint), params.toString(), defReqOpts);
  }

}
