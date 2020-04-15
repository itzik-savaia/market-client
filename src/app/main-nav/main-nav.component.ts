import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product/product.service';
import { OrderService } from '../services/order/order.service';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  citys = [
    { name: 'Jerusalem', option: 'Jerusalem', number: 1 },
    { name: 'Tel-Aviv', option: 'Tel-Aviv', number: 2 },
    { name: 'Haifa', option: 'Haifa', number: 3 },
    { name: 'Rishon Lezion', option: 'Rishon Lezion', number: 4 },
    { name: 'Petah Tiqwa', option: 'Petah Tiqwa', number: 5 },
    { name: 'Ashdod', option: 'Ashdod', number: 6 },
    { name: 'Netanya', option: 'Netanya', number: 7 },
    { name: 'Beersheba the South', option: 'Beersheba the South', number: 8 },
    { name: 'Holon', option: 'Holon', number: 9 },
    { name: 'Bnei Brak', option: 'Bnei Brak', number: 10 },
  ];
  USERNAME
  token
  msg
  error_msg
  register_msg
  register_success
  order: OrderService[] = [];
  product: ProductService[] = [];
  users: UsersService[] = [];
  singup_form_1: FormGroup;
  singup_form_2: FormGroup;
  login_form: FormGroup;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public breakpointObserver: BreakpointObserver,
    public OrderService: OrderService,
    public ProductService: ProductService,
    public UserService: UsersService,
    public formBuilder: FormBuilder,
    public router: Router,
    public ItemService: ItemService,
  ) {
    this.UserService.is_login
    this.UserService.is_admin
  }

  ngOnInit() {
    this.login_form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', ([Validators.required, Validators.minLength(8)])],
    });
    this.singup_form_1 = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', ([Validators.required, Validators.minLength(8)])],
      ConfirmPassword: ['', ([Validators.required, Validators.minLength(8)])],
      Email: ['', [Validators.required, Validators.email]],
      ID: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]]
    });
    this.singup_form_2 = this.formBuilder.group({
      Citys: [this.citys, Validators.required],
      Street: ['', Validators.required],
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
    });
  };

  On_Connect(): void {
    const username = this.login_form.value.username;
    const password = this.login_form.value.password;
    if (username === undefined || password === undefined) {
      this.error_msg = 'somting is missing'
      setTimeout(() => {
        this.error_msg = undefined
      }, 2000);
    } else {
      try {
        this.UserService.POST_User_LOGIN(username, password).pipe().subscribe({
          next: (res) => {
            console.log(res);
            this.token = res.access
            this.USERNAME = res.UserName
            localStorage.setItem("AC::profile", this.token);
            this.UserService.is_admin = res.is_admin
            this.UserService.POST_TOKEN();
          },
          error: (error) => {
            console.log(error)
            this.error_msg = error.error.mes
            setTimeout(() => {
              this.msg = ''
            }, 2000);
          },
          complete: () => {
            this.msg = 'Welcome'
            if (this.UserService.profile !== null) {
              this.UserService.is_login = true
              this.USERNAME
            }
          }
        })
      } catch (err) { console.log(err); this.msg = err }
    }
  };


  sing_out() {
    if (localStorage.getItem("AC::profile") !== null) {
      localStorage.removeItem("AC::profile");
      this.router.navigate(['']);
      this.UserService.is_login = false
      this.UserService.is_admin = false
      this.login_form.value.username = '';
      this.login_form.value.password = '';
    }
  }
  On_Send_1(): void {
    const value = this.singup_form_1.value;
    const Username = value.Username;
    const Password = value.Password;
    if (Username === undefined || Password === undefined) {
      this.error_msg = 'somting is missing'
      setTimeout(() => {
        this.error_msg = undefined
      }, 2000);
    }
    const ConfirmPassword = value.ConfirmPassword;
    const Email = value.Email;
    const ID_Card = value.ID;
    let Send_1 = [Username, Password, ConfirmPassword, Email, ID_Card];
    this.UserService.POST_test_1(Send_1)

  };
  On_Send_2(): void {
    const value2 = this.singup_form_2.value;
    const value1 = this.singup_form_1.value;
    const City = value2.Citys
    const Street = value2.Street;
    const Name = value2.Name;
    const LastName = value2.LastName;
    const Username = value1.Username;
    const Password = value1.Password;
    const ConfirmPassword = value1.ConfirmPassword;
    const Email = value1.Email;
    const ID_Card = value1.ID;
    let Send_2 = [City, Street, Name, LastName, Email, ID_Card, Username, Password, ConfirmPassword];
    this.UserService.POST_New_User(Send_2).pipe().subscribe({
      next: (res) => {
        this.register_success = res.success
        this.token = res.access
        this.USERNAME = res.UserName
        localStorage.setItem("AC::profile", this.token);
        this.UserService.profile
        setTimeout(() => {
          this.router.navigate(['/product']);
        }, 3000);
      },
      error: (err) => {
        this.register_msg = err.error.text;
        setTimeout(() => {
          this.register_msg = '';
        }, 5000);
      },
      complete: () => {
        this.msg = 'Welcome'
        setTimeout(() => {
          if (this.UserService.profile !== null) {
            this.UserService.is_login = true
            this.USERNAME
          }
        }, 3000);
      }
    })
  };
}
