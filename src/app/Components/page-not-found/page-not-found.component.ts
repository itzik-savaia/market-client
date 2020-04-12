import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  msg
  constructor(
    public UsersService: UsersService,
    public router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.msg = "You come back in a few seconds";
      localStorage.removeItem("AC::profile");
      this.router.navigate(['']);
      window.location.reload();
    }, 3000);
  }

}
