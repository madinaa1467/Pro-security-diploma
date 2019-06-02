import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GenderType, genderTypes} from "../../../core/model/gender/gender-type";
import {AuthService} from "../../../core/auth/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  public genderTypes: GenderType[] = genderTypes;


  constructor(protected cd: ChangeDetectorRef,
              private service: AuthService,
              private router: Router) {
    this.user.gender = this.genderTypes[0].value;
    this.user.birthDate = new Date().toJSON();
  }

  register() {
    this.service.register(this.user).then(res=>{
      console.log("response from register: ", res);
      alert(`You successfully registred, and now you can log in`);
      this.router.navigate(['auth/login']);
    }).catch(err => {
      alert(`something wrong, try again!`);
    });
  }

  getConfigValue(key: string): any {
  }
}
