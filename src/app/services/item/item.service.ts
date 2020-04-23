import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  ItemAPI = "https://m-market-s.herokuapp.com/item";
  // ItemAPI = "http://localhost:3000/item"
  transactions = []
  item;
  public itemedit = new BehaviorSubject({});
  currentProduct = this.itemedit.asObservable()

  constructor(
    private _http: HttpClient,
    private UsersService: UsersService,
    private _CartService: CartService,
  ) { }

  NewItem(item) {
    const USERNAME = this.UsersService.user
    const find = this.transactions.find(({ ProductID }) => ProductID === item.ProductID)
    const ALL = { USERNAME, find }
    this._http.post<any>(this.ItemAPI, ALL).subscribe(res => {
      const find = this.transactions.find(({ ProductID }) => ProductID === item.ProductID)
    })
  }

  GET_Item() {
    this._http.get<any>(this.ItemAPI).subscribe(res => {
      this.transactions = res
    })
  }
  edititem(p: string) {
    this.itemedit.next(p)
    this.item = p;
  }

}
