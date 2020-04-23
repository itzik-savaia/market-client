import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart/cart.service";
import { ItemService } from "../../services/item/item.service"
import { UsersService } from "../../services/users/users.service"
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  step = 0;
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
    public CartService: CartService,
    public ItemService: ItemService,
    public UserService: UsersService,
    public ProductService: ProductService,
    public OrderService: OrderService,
    public router: Router,
  ) {
    this.router.navigate(['/product']);
    this.UserService.is_login
    this.UserService.is_admin
    if (UserService.USERNAME) {
      this.CartService.GET_date()
      this.Date = this.CartService.cart_date
    }
  }

  ngOnInit() {
    this.ProductService.GET_Product()
      .subscribe(result => {
        this.products = result.data
      });
    this.ItemService.GET_Item()
  }
  getTotalCost() {
    return this.ItemService.transactions.map(t => t.Price * t.Quantity).reduce((acc, value) => acc + value, 0);
  }
  getTotalValue() {
    return this.ItemService.transactions.map(t => t.Quantity).reduce((acc, value) => acc + value, 0);
  }
  plus_one(p): void {
    if (p) {
      p.Quantity++
      this.ItemService.NewItem(p)
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
    this.ItemService.NewItem(p)
  }
  delete_one(p): void {
    while (p.Quantity > 0) {
      p.Quantity--
    }
    return this.ItemService.NewItem(p)
  }
  delete_all() {
    this.ItemService.transactions.forEach(e => {
      while (e.Quantity > 0) {
        e.Quantity--
      }
      return this.ItemService.NewItem(e)
    });
  }
  buy() {
    this.router.navigate(['order']);
  }
  setStep(index: number) {
    this.step = index;
  }
}
