import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../services/cart/cart.service";
import { ItemService } from "../../../services/item/item.service"
import { UsersService } from "../../../services/users/users.service"
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';


@Component({
  selector: 'app-costomer',
  templateUrl: './costomer.component.html',
  styleUrls: ['./costomer.component.css']
})
export class CostomerComponent implements OnInit {
  transactions: any = []; //items + product
  products: any = [];
  items: any = [];
  IsEmpty
  error_msg
  chack: any = [];
  chackresult: any = []
  emptycart
  Date
  is_login = true
  constructor(
    private _CartService: CartService,
    private _ItemService: ItemService,
    private _UserService: UsersService,
    private _ProductService: ProductService,
    private _OrderService: OrderService,
    public router: Router,
  ) {
    this.router.navigate(['/product']);
    this._UserService.is_login
    this._UserService.is_admin
    this._CartService.GET_date()
    this.Date = this._CartService.cart_date
  }

  ngOnInit() {
    this._ProductService.GET_Product()
      .subscribe(result => {
        this.products = result.data
      });
    this._ItemService.GET_Item()
  }
  getTotalCost() {
    return this._ItemService.transactions.map(t => t.Price * t.Quantity).reduce((acc, value) => acc + value, 0);
  }
  getTotalValue() {
    return this._ItemService.transactions.map(t => t.Quantity).reduce((acc, value) => acc + value, 0);
  }
  plus_one(p): void {
    if (p) {
      p.Quantity++
      this._ItemService.NewItem(p)
    }
  }
  minus_one(p): void {
    if (p.Quantity > 1) p.Quantity--
    else {
      this.error_msg = 'It is not possible to have less than 1'
      setTimeout(() => {
        this.error_msg = ''
      }, 5000)
    }
    this._ItemService.NewItem(p)
  }
  delete_one(p): void {
    while (p.Quantity > 0) {
      p.Quantity--
    }
    return this._ItemService.NewItem(p)
  }
  delete_all() {
    this._ItemService.transactions.forEach(e => {
      while (e.Quantity > 0) {
        e.Quantity--
      }
      return this._ItemService.NewItem(e)
    });
  }
  buy() {
    this.router.navigate(['order']);
  }
}
