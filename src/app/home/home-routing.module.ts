import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MycartComponent } from './mycart/mycart.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'mycart', component: MycartComponent, canActivate: [AuthGuard] },
      {
        path: 'addproduct',
        component: AddproductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addproduct/:id',
        component: AddproductComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
