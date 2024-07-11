import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { MycartComponent } from './mycart/mycart.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    MycartComponent,
    AddproductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class HomeModule { }
