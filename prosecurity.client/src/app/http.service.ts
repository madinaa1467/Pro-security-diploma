import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {isUndefined} from "util";
import {environment} from "../environments/environment";
import {Observable} from "rxjs/Rx";

class OptionsBuilder {
  private appendingHeaders: { [key: string]: string }[] = [];
  private appendingParams: { [key: string]: string }[] = [];
  private responseType?: 'json' | 'text' | null;

  public appendHeader(key: string, value: string | null): void {
    if (!isUndefined(value)) this.appendingHeaders.push({key: key, value: value});
  }

  public appendParams(key: string, value: string | null): void {
    if (!isUndefined(value)) this.appendingParams.push({key: key, value: value});
  }

  public appendResponseType(responseType?: 'json' | 'text' | null) {
    this.responseType = responseType;
  }

  private get headers(): HttpHeaders {
    let ret: HttpHeaders = new HttpHeaders();
    this.appendingHeaders.forEach(h => {ret = ret.append(h['key'], h['value']);});
    return ret;
  }

  private get params(): HttpParams {
    let ret: HttpParams = new HttpParams();
    this.appendingParams.forEach(h => {ret = ret.append(h['key'], h['value']);});
    return ret;
  }

  public getJson(): RequestOptionsJson {
    return {
      observe: 'response',
      headers: this.headers,
      params: this.params,
      reportProgress: false,
      withCredentials: true,
      responseType: 'json'
    }
  }

  public getText(): RequestOptionsText {
    return {
      observe: 'response',
      headers: this.headers,
      params: this.params,
      reportProgress: false,
      withCredentials: true,
      responseType: 'text'
    }
  }

  public getBlob(): RequestOptionsBlob {
    return {
      observe: 'response',
      headers: this.headers,
      params: this.params,
      reportProgress: false,
      withCredentials: true,
      responseType: 'blob'
    }
  }
}

class RequestOptions {
  observe: 'response';
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

class RequestOptionsJson extends RequestOptions {
  responseType: 'json';
}

class RequestOptionsText extends RequestOptions {
  responseType: 'text';
}

class RequestOptionsBlob extends RequestOptions {
  responseType: 'blob';
}

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  private prefix(): string {
    return environment.urlPrefix;
  }

  public url(urlSuffix: string): string {
    return this.prefix() + urlSuffix;
  }

  public get(urlSuffix: string,
             keyValue?: { [key: string]: string | number | null },
             responseType?: 'json' | 'text' | null): Observable<HttpResponse<any>> {

    let ob: OptionsBuilder = this.newOptionsBuilder();

    if (keyValue) {
      for (let key in keyValue) {
        let value = keyValue[key];
        if (!isUndefined(value)) {
          ob.appendParams(key, value as string);
        }
      }
    }

    switch (responseType) {
      case 'text': {
        return this.http.get(this.url(urlSuffix), ob.getText());
      }
      default: {
        return this.http.get<any>(this.url(urlSuffix), ob.getJson());
      }
    }
  }

  public post(urlSuffix: string,
              keyValue: { [key: string]: string | number | boolean | null },
              responseType?: 'json' | 'text' | null): Observable<HttpResponse<any>> {
    let ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    let data = new URLSearchParams();
    for (let key in keyValue) {
      let value = keyValue[key];
      if (!isUndefined(value)) data.append(key, value as string);
    }

    switch (responseType) {
      case 'text': {
        return this.http.post(this.url(urlSuffix), data.toString(), ob.getText());
      }
      default: {
        return this.http.post<any>(this.url(urlSuffix), data.toString(), ob.getJson());
      }
    }
  }

  public delete(urlSuffix: string,
                keyValue?: { [key: string]: string | number | boolean | null },
                responseType?: 'json' | 'text' | null): Observable<HttpResponse<any>> {
    let ob: OptionsBuilder = this.newOptionsBuilder();

    if (keyValue) {
      for (let key in keyValue) {
        let value = keyValue[key];
        if (!isUndefined(value)) {
          ob.appendParams(key, value as string);
        }
      }
    }

    switch (responseType) {
      case 'text': {
        return this.http.delete(this.url(urlSuffix), ob.getText());
      }
      default: {
        return this.http.delete<any>(this.url(urlSuffix), ob.getJson());
      }
    }
  }

  public async downloadResource(urlSuffix: string,
                                keyValue?: { [key: string]: string | number | boolean | null }): Promise<HttpResponse<Blob>> {
    let ob: OptionsBuilder = this.newOptionsBuilder();

    if (keyValue) {
      for (let key in keyValue) {
        let value = keyValue[key];
        if (!isUndefined(value)) {
          ob.appendParams(key, value as string);
        }
      }
    }

    const response = await this.http.get(this.url(urlSuffix), ob.getBlob()).toPromise();
    const url = window.URL.createObjectURL(response.body);
    const filename: string = response.headers.get('Content-Disposition')
      .split(';')[1]
      .split('=')[1]
      .replace(/["]/g, '');

    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);
    return response;
  }

  get token(): string | null {
    return localStorage.getItem("token") || null;
  }

  set token(value: string | null) {
    localStorage.setItem("token", value || '');
  }

  private newOptionsBuilder(): OptionsBuilder {
    let ob = new OptionsBuilder();
    if (localStorage.getItem("token")) {
      ob.appendHeader("token", this.token);
    }
    return ob;
  }
}
