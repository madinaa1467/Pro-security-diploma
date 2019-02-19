import {Injectable} from '@angular/core';
import {HttpService} from "../http.service";
import {PersonDisplay} from "../../model/PersonDisplay";
import {UserCan} from "../../model/UserCan";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public username: string = '';
  public password: string = '';

  public personDisplay: PersonDisplay | null = null;

  public loading = true;

  constructor(private http: HttpService) {}

  private started = false;

  public get isAuthenticated(): boolean {
    return !!this.personDisplay;
  }

  public get canViewUsers(): boolean {
    return this.hasCan(UserCan.VIEW_USERS);
  }

  public get canViewAbout(): boolean {
    return this.hasCan(UserCan.VIEW_ABOUT);
  }

  private hasCan(needCan: UserCan) {
    if (!this.personDisplay) return false;
    return this.personDisplay.cans
      .map(can => can == needCan)
      .reduce((prev, curr) => prev || curr, false);
  }

  async start() {
    if (this.started) return;
    this.started = true;
    await this.refresh();
  }

  async refresh() {
    this.loading = true;
    try {
      this.personDisplay = await this.getPersonDisplay();
      this.loading = false;
    } catch (e) {
      this.http.token = null;
      this.personDisplay = null;
      this.loading = false;
    }
  }

  async getPersonDisplay(): Promise<PersonDisplay> {
    return this.http.get("/auth/displayPerson").toPromise().then(resp => PersonDisplay.of(resp.body));
  }

  async login() {
    try {
      this.loading = true;
      this.http.token = await this.http.post("/auth/login", {
        username: this.username,
        password: this.password,
      }, "text").toPromise().then(resp => resp.body as string);
      await this.refresh();
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log("e = ", e)
    }
  }

  async exit() {
    this.loading = true;
    try {
      await this.http.get("/auth/exit").toPromise();
      await this.refresh();
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }
}
