import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartAPI = "https://m-market-s.herokuapp.com/cart/"
  // CartAPI = "http://localhost:3000/cart"
  cart_date: any = {}

  public sidenav: MatSidenav

  constructor(
    private _http: HttpClient,
    private UsersService: UsersService,

  ) { }

  GET_date() {
    this._http.get<any>(this.CartAPI + this.UsersService.user._id).subscribe(res => {
      this.cart_date = res.data
    })
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }
  public open() {
    return this.sidenav.open();
  }
  public close() {
    return this.sidenav.close();
  }
}