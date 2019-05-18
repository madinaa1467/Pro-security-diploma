import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {isNullOrUndefined} from "util";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  private url(endpoint: string): string {
    return `${environment.urlPrefix}${endpoint}`;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    let defReqOpts = {
      withCredentials: true,
      params: new HttpParams()
    };

    if (reqOpts) {
      for (let k in reqOpts) {
        defReqOpts[k] = reqOpts[k];
      }
    }

    // Support easy query params for GET requests
    if (params) {
      defReqOpts.params = new HttpParams();
      for (let k in params) {
        let value = params[k];
        if (!isNullOrUndefined(value))
          defReqOpts.params = defReqOpts.params.set(k, value as string);
      }
    }

    return this.http.get(this.url(endpoint), defReqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {

    let defReqOpts = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    if (reqOpts) {
      for (let k in reqOpts) {
        defReqOpts[k] = reqOpts[k];
      }
    }

    let params: URLSearchParams = new URLSearchParams();

    for (let key in body) {
      let value = body[key];
      if (!isNullOrUndefined(value)) params.append(key, value as string);
    }

    return this.http.post(this.url(endpoint), params.toString(), defReqOpts);
  }

  request(method: string, endpoint: string, reqOpts: any) {
    let defReqOpts = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    if (reqOpts) {
      for (let k in reqOpts) {
        defReqOpts[k] = reqOpts[k];
      }
    }

    return this.http.request(method, this.url(endpoint), defReqOpts);
  }


}
