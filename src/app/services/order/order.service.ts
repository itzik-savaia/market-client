import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  OrderAPI = "http://localhost:3000/order"; //all order
  order: any = []
  constructor(
    private _http: HttpClient,
    private UsersService: UsersService,
    public router: Router,
  ) { }
  GET_Order() {
    return this._http.get<any>(this.OrderAPI);
  };
  POST_Order(order) {
    this._http.post<any>(this.OrderAPI, [order, this.UsersService.user]).subscribe(res => {
      this.order = res.data
      setTimeout(() => {
        this.router.navigate(['']);
        window.location.reload();
      }, 10000);
    })
  }
}
