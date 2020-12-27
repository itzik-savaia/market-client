import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { AdminComponent } from './Components/USERS/admin/admin.component';
import { CostomerComponent } from './Components/USERS/costomer/costomer.component';
import { OrderComponent } from './Components/order/order.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: 'product', component: ProductComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  PageNotFoundComponent,
  HomeComponent,
  ProductComponent,
  AdminComponent,
  CostomerComponent,
  OrderComponent,
];
