import {Observable} from "rxjs/Rx";

export abstract class CanIProvider {

  abstract getCans(): Observable<Set<string>>;

}
