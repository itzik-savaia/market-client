import { Component, ViewChild } from '@angular/core';
import { CartService } from './services/cart/cart.service'
import { MatSidenav } from '@angular/material/sidenav'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: CartService) {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
