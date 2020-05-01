import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

//sevices
import { OrderService } from "../../services/order/order.service";
import { ProductService } from "../../services/product/product.service";
import { UsersService } from 'src/app/services/users/users.service';
import { ItemService } from '../../services/item/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

export class HomeComponent implements OnInit {
  profile = localStorage.getItem("AC::profile");

  order: OrderService[] = [];
  product: ProductService[] = [];

  constructor(
    private OrderService: OrderService,
    private ProductService: ProductService,
    private UsersService: UsersService,
    public ItemService: ItemService,
    public router: Router,
  ) { }

  ngOnInit() {
    //order
    this.OrderService.GET_Order().subscribe(result => {
      this.order = result.Quantity_Of_Orders;
    });
    //product
    this.ProductService.GET_Product().subscribe(result => {
      this.product = result.Quantity_Of_Products;
    });
  };



};