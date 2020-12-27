import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * components
 */
import { MainNavComponent } from './main-nav/main-nav.component';
import { SearchComponent } from '../app/Components/search/search.component';
import { CartComponent } from './main-nav/cart/cart.component';
import { HomeComponent, GoustDialog } from "./Components/home/home.component";
/**
 * material
 */
import { MaterialModule } from "./material/material.module";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainNavComponent,
    SearchComponent,
    CartComponent,
    HomeComponent, GoustDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
