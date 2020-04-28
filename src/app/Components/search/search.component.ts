import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from "../../services/cart/cart.service";
import { ItemService } from 'src/app/services/item/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['img', 'name', 'price', 'add'];
  dataSource = new MatTableDataSource<Element>();
  error_msg
  products: any = []
  values: any = []
  marker
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ItemService: ItemService,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this._ProductService.GET_Product().subscribe(res => {
      this.products = res.data
    });
  }
  plus_one(p): void {
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
  minus_one(p): void {
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
  input_Change(e) {
    const value = e.target.value;
    this.dataSource.data = this.products
    this.dataSource.filter = value.trim().toLowerCase()
    this.marker = value
  }
}