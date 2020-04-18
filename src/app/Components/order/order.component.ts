import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ItemService } from 'src/app/services/item/item.service';
import { OrderService } from 'src/app/services/order/order.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['img', 'name', 'price', 'quantity'];
  dataSource = new MatTableDataSource<Element>();
  transactions: any = []; //items + product
  products: any = [];
  values: any = [];
  error_msg
  order_step: FormGroup;
  DB_city
  DB_street
  constructor(
    public ProductService: ProductService,
    public CartService: CartService,
    public ItemService: ItemService,
    public UserService: UsersService,
    public OrderService: OrderService,
    public router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.CartService.GET_date()
    this.CartService.cart_date
  }

  ngOnInit() {
    this.ProductService.GET_Product().subscribe(res => {
      this.products = res.data
    });
    this.order_step = this.formBuilder.group({
      City: ['', Validators.required],
      Street: ['', Validators.required],
      OrderDate: [moment(), Validators.required],
      CreditCard: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]]
    });
    console.log(this.UserService.user);

  }
  input_Change(e) {
    const value = e.target.value;
    this.dataSource.data = this.products
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getTotalCost() {
    return this.ItemService.transactions.map(t => t.Price * t.Quantity).reduce((acc, value) => acc + value, 0);
  }
  getTotalValue() {
    return this.ItemService.transactions.map(t => t.Quantity).reduce((acc, value) => acc + value, 0);
  }
  on_send() {
    const value = this.order_step.value;
    const order = this.ItemService.transactions.filter(({ Quantity }) => Quantity !== 0);
    const City = value.City;
    const Street = value.Street;
    const order_date = value.OrderDate
    const CreditCard = value.CreditCard;
    const FinalPrice = this.getTotalCost()
    const cart_Id = this.CartService.cart_date
    if (this.DB_city !== undefined || this.DB_street !== undefined) {
      const on_send = [
        {
          CartId: cart_Id,
          city: this.DB_city,
          street: this.DB_street,
          delivery_date: order_date,
          CreditCard: CreditCard,
          order: order,
          final_price: FinalPrice
        }
      ]
      const chack_if_empty = [cart_Id, this.DB_city, this.DB_street, CreditCard, order, FinalPrice]
      for (let i = 0; i < chack_if_empty.length; i++) {
        if (chack_if_empty[i] === undefined) {
          this.error_msg = 'somting is missing'
          setTimeout(() => {
            this.error_msg = undefined
          }, 5000);
        }
      }
      if (this.error_msg !== 'somting is missing') {
        this.OrderService.POST_Order(on_send)
      }
    } else {
      const on_send = [
        {
          CartId: cart_Id,
          city: City,
          street: Street,
          delivery_date: order_date,
          CreditCard: CreditCard,
          order: order,
          final_price: FinalPrice
        }
      ]
      const chack_if_empty = [cart_Id, City, Street, CreditCard, order, FinalPrice]
      for (let i = 0; i < chack_if_empty.length; i++) {
        if (chack_if_empty[i] === undefined) {
          this.error_msg = 'somting is missing'
          setTimeout(() => {
            this.error_msg = undefined
          }, 5000);
        }
      }
      if (this.error_msg !== 'somting is missing') {
        this.OrderService.POST_Order(on_send)
      }
    }
  }
  db_city() {
    this.DB_city = this.UserService.user.City
  };
  db_street() {
    this.DB_street = this.UserService.user.Street
  };
}
