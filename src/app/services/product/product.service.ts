import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ProductAPI = "http://localhost:3000/product/"; //all product
  CategoryAPI = "http://localhost:3000/category/"; //all category
  Sub_CategoryAPI = "http://localhost:3000/subcategory/"; // all subcategory
  msg
  constructor(private _http: HttpClient) { }
  GET_Product() {
    //GET-ALL
    return this._http.get<any>(this.ProductAPI);
  };

  GET_Category() {
    //GET-ALL
    return this._http.get<any>(this.CategoryAPI)
  }
  GET_Sub_Category() {
    //GET-ALL
    return this._http.get<any>(this.Sub_CategoryAPI)
  }
  POST_New_Product(fb) {
    //POST-NEW
    return this._http.post<any>(this.ProductAPI, fb)
  }
  EDIT_ITEM(fb, p) {
    //PUT
    this._http.put<any>(this.ProductAPI + "/" + p._id, fb).subscribe(
      result => {
        this.msg = 'secees to upload'
        setTimeout(() => {
          this.msg = undefined
        }, 2000);
      })
  }
};
