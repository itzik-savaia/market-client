import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  NEW_PRODUCT: FormGroup;
  EDIT_PRODUCT: FormGroup;
  categorys: ProductService[] = [];
  selectedFile: File = null
  EDIT_selectedFile: File = null
  msg
  error_msg
  product
  constructor(
    public formBuilder: FormBuilder,
    public ProductService: ProductService,
    public UserService: UsersService,
    public ItemService: ItemService,

  ) {
    this.UserService.is_login
    this.UserService.is_admin
  }

  ngOnInit() {
    this.NEW_PRODUCT = this.formBuilder.group({
      Name: ['', Validators.required],
      Price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ProductImage: ['', Validators.required],
      CategoryId: ['', Validators.required],
    })
    this.EDIT_PRODUCT = this.formBuilder.group({
      EDIT_Name: ['', Validators.required],
      EDIT_Price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      EDIT_ProductImage: ['', Validators.required],
      EDIT_CategoryId: ['', Validators.required],
    })
    this.ProductService.GET_Category().subscribe(result => {
      this.categorys = result.data
    });
  }
  onFileChange(e) {
    this.selectedFile = <File>e.target.files[0]
  }
  New_Product(): void {
    const fb = new FormData();
    fb.append('image', this.selectedFile, this.selectedFile.name)
    fb.append('Name', this.NEW_PRODUCT.value.Name)
    fb.append('Price', this.NEW_PRODUCT.value.Price)
    fb.append('CategoryId', JSON.stringify(this.NEW_PRODUCT.value.CategoryId))
    const value = this.NEW_PRODUCT.value;
    const new_product = [
      value.Name,
      value.Price, value.CategoryId,
      this.selectedFile.name
    ]
    for (let i = 0; i < new_product.length; i++) {
      if (new_product[i] === undefined) {
        this.error_msg = 'somting is missing'
        setTimeout(() => {
          this.error_msg = undefined
        }, 2000);
      }
    }
    try {
      this.ProductService.POST_New_Product(fb)
        .subscribe(
          result => {
            this.msg = 'secees to upload'
            setTimeout(() => {
              this.msg = undefined
            }, 2000);
          }, error => { console.log(error); }
        )
    } catch (err) { console.log(err); }
  }
  // EDIT //
  EDIT_onFileChange(event) {
    this.EDIT_selectedFile = <File>event.target.files[0]
  }
  EDIT_Product(): void {
    this.ItemService.currentProduct.source.subscribe(res => {
      this.product = res
    })
    const fb = new FormData();
    fb.append('image', this.EDIT_selectedFile, this.EDIT_selectedFile.name)
    fb.append('Name', this.EDIT_PRODUCT.value.EDIT_Name)
    fb.append('Price', this.EDIT_PRODUCT.value.EDIT_Price)
    fb.append('CategoryId', this.EDIT_PRODUCT.value.EDIT_CategoryId._id)
    const value = this.EDIT_PRODUCT.value;
    const edit_product = [
      value.EDIT_Name,
      value.EDIT_Price,
      value.EDIT_CategoryId,
      this.EDIT_selectedFile.name
    ]
    for (let i = 0; i < edit_product.length; i++) {
      if (edit_product[i] === undefined) {
        this.error_msg = 'somting is missing'
        setTimeout(() => {
          this.error_msg = undefined
        }, 2000);
      }
    }
    try {
      this.ProductService.EDIT_ITEM(fb, this.product)
    } catch (err) { console.log(err); }
  }

}
