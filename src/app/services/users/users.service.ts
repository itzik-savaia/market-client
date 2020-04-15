import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  profile = localStorage.getItem("AC::profile");
  UserAPI = "https://m-market-client.herokuapp.com/users/";
  USERNAME
  user
  user_err
  is_admin
  is_login
  username
  constructor(
    private _http: HttpClient,
    public router: Router,
  ) {
    if (this.profile !== null) {
      this.POST_TOKEN();
    } else if (this.profile === null) {
      this.is_login = false
      this.is_admin = false
    }
  }

  POST_User_LOGIN(username, password) {
    this.username = username
    const user = { username, password };
    return this._http.post<any>(this.UserAPI, user)
  }


  POST_test_1(Send_1) {
    const send_1 = { Send_1 };
    for (let i = 0; i < Send_1.length; i++) {
      if (Send_1[i] == null || Send_1[i] == '' || Send_1[i] == undefined) {
      }
    } if (Send_1.Password !== Send_1.ConfirmPassword) {
    }

  }
  POST_New_User(Send_2) {
    const send_2 = { Send_2 };
    for (let i = 0; i < Send_2.length; i++) {
      if (Send_2[i] == null || Send_2[i] == '' || Send_2[i] == undefined) {
      }
    } if (Send_2.Password !== Send_2.ConfirmPassword) {
      console.log('Confirm-password and Password Not similar');
    } else {
      return this._http.post<any>(this.UserAPI + "new", send_2)
    }
  }
  POST_TOKEN() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem("AC::profile"));
    this._http.get(this.UserAPI + "token", { headers: headers }).subscribe(
      res => {
        this.user = res
        this.is_login = true
        if (this.user.RoleName === "admin") {
          this.is_admin = true
        } else {
          this.is_admin = false
        }
      },
      err => {
        this.user_err = err
      }
    )
  }
};
