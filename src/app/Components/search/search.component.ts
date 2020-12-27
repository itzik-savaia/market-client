import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

//services
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from "../../services/cart/cart.service";
import { ItemService } from 'src/app/services/item/item.service';
import { UsersService } from 'src/app/services/users/users.service';

//components
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  /**
   * State
   */
  displayedColumns: string[] = ['img', 'name', 'price', 'add'];
  dataSource = new MatTableDataSource<Element>();
  error_msg
  products: any = []
  values: any = []
  marker
  /**
   * constructor
   * @param _ProductService 
   * @param _CartService 
   * @param _ItemService 
   * @param snackBar 
   * @param UserService 
   * @param HomeComponent 
   */
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ItemService: ItemService,
    public snackBar: MatSnackBar,
    public UserService: UsersService,
    public HomeComponent: HomeComponent,
  ) { }

  ngOnInit() {
    /**
     * GET Product
     */
    this._ProductService.GET_Product().subscribe(res => {
      this.products = res.data
    });
  }
  /**
   * Plus button
   * @param p 
   */
  plus_one(p): void {
    if (this.UserService.is_login === false) {
      this.HomeComponent.openDialog();
    } else {
      const find = this._ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
      if (find) {
        find.Quantity++
        this._ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is added to your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      } else {
        this._ItemService.transactions.push({
          ProductID: p._id,
          Name: p.Name,
          CategoryId: p.CategoryId,
          CategoryName: p.CategoryName,
          Img: p.ImagePath,
          Price: p.Price,
          Quantity: 1
        });
        const find = this._ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
        this._ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is added to your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      }
    }
  }
  /**
   * Minus button
   * @param p 
   */
  minus_one(p): void {
    if (this.UserService.is_login === false) {
      this.HomeComponent.openDialog();
    } else {
      const find = this._ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
      if (find) {
        if (find.Quantity === 1 || find.Quantity === 0) {
          this.error_msg = 'It is not possible to have less than 1'
          setTimeout(() => {
            this.error_msg = ''
          }, 5000);
        } else {
          find.Quantity--
          this._ItemService.NewItem(find)
          this.snackBar.open(`#${find.Name} - Is removed from your cart`);
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 2000);
        }
      } else {
        this._ItemService.transactions.push({
          ProductID: p._id,
          Name: p.Name,
          CategoryId: p.CategoryId,
          CategoryName: p.CategoryName,
          Img: p.ImagePath,
          Price: p.Price,
          Quantity: 1
        });
        const find = this._ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
        this._ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is removed from your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      }
    }
  }
  input_Change(e) {
    const value = e.target.value;
    this.dataSource.data = this.products
    this.dataSource.filter = value.trim().toLowerCase()
    this.marker = value
  }
}

