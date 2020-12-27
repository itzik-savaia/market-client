import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

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
  subcategorys: any = [];
  filter_categorys: any = [];
  filter_products: any = [];
  categorys: any = [];
  products: any = [];
  error_msg;

  constructor(
    private OrderService: OrderService,
    private ProductService: ProductService,
    public ItemService: ItemService,
    public UserService: UsersService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    /**
     * GET Quantity of Orders
     */
    this.OrderService.GET_Order().subscribe(res => {
      this.order = res.Quantity_Of_Orders;
    });
    /**
     * GET Quantity of Products
     */
    this.ProductService.GET_Product().subscribe(res => {
      this.product = res.Quantity_Of_Products;
    });
    /**
     * GET Products
     */
    this.ProductService.GET_Product().subscribe(res => {
      this.products = res.data
    });
    /**
     * GET Categorys
     */
    this.ProductService.GET_Category().subscribe(res => {
      this.categorys = res.data
    });
    /**
     * GET Sub category
     */
    this.ProductService.GET_Sub_Category().subscribe(res => {
      this.subcategorys = res.data
    });
  };

  Categorys(e): void {
    const filter = this.categorys.filter(({ Sub_categoryId }) => Sub_categoryId === e.target.id)
    if (e.target.id = filter) {
      this.filter_categorys = filter
    }
  }

  onSearch(e) {
    const filter = this.products.filter(({ CategoryId }) => CategoryId === e.target.id)
    if (e.target.id = filter) {
      this.filter_products = filter
    }
  }

  plus_one(p): void {
    if (this.UserService.is_login === false) {
      this.openDialog();
    } else {
      const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
      if (find) {
        find.Quantity++
        this.ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is added to your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      } else {
        this.ItemService.transactions.push({
          ProductID: p._id,
          Name: p.Name,
          CategoryId: p.CategoryId,
          CategoryName: p.CategoryName,
          Img: p.ImagePath,
          Price: p.Price,
          Quantity: 1
        });
        const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
        this.ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is added to your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      }
    }
  }
  minus_one(p): void {
    if (this.UserService.is_login === false) {
      this.openDialog();
    } else {
      const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
      if (find) {
        if (find.Quantity === 1 || find.Quantity === 0) {
          this.error_msg = 'It is not possible to have less than 1'
          setTimeout(() => {
            this.error_msg = ''
          }, 5000);
        } else {
          find.Quantity--
          this.ItemService.NewItem(find)
          this.snackBar.open(`#${find.Name} - Is removed from your cart`);
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 2000);
        }
      } else {
        this.ItemService.transactions.push({
          ProductID: p._id,
          Name: p.Name,
          CategoryId: p.CategoryId,
          CategoryName: p.CategoryName,
          Img: p.ImagePath,
          Price: p.Price,
          Quantity: 1
        });
        const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
        this.ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is removed from your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      }
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(GoustDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
};

@Component({
  selector: 'app-goustDialog',
  templateUrl: './dialog.home.component.html',
})
export class GoustDialog { }