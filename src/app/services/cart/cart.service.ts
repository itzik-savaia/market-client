import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartAPI = "https://m-market-server.herokuapp.com/cart/"
  cart_date: any = {}


  constructor(
    private _http: HttpClient,
    private UsersService: UsersService,
  ) { }

  GET_date() {
    this._http.get<any>(this.CartAPI + this.UsersService.user._id).subscribe(res => {
      this.cart_date = res.data
    })
  }
}