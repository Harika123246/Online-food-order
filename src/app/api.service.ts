import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  name: string;
  imagepath: string;
  description: string;
  price: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //create
  addproduct(product: Product) {
    return this.http.post('http://localhost:3000/products', product);
  }

  //get

  getAllProducts() {
    return this.http.get<any>('http://localhost:3000/products');
  }

  // update case
  editproduct(productId: any, product: any) {
    return this.http.put(
      `http://localhost:3000/products/${productId}`,
      product
    );
  }

  // get by id case
  getProductById(productId: any) {
    return this.http.get<any>(`http://localhost:3000/products/${productId}`);
  }

  // delete by id case
  deleteproductById(deleteId: any) {
    return this.http.delete<any>(`http://localhost:3000/products/${deleteId}`);
  }

  //create userdetails
  adduser(user: any) {
    return this.http.post('http://localhost:3000/userdetails', user);
  }

  //get all user
  getAllUsers() {
    return this.http.get<any>('http://localhost:3000/userdetails');
  }

  //get user by id
  getUserById(userId: any) {
    return this.http.get<any>(`http://localhost:3000/userdetails/${userId}`);
  }

  // create

  addToCart(product: any) {
    return this.http.post('http://localhost:3000/cart', product);
  }

  // get
  getCart() {
    return this.http.get<any>('http://localhost:3000/cart');
  }

  //update
  editCart(productId: any, product: any) {
    return this.http.put(`http://localhost:3000/cart/${productId}`, product);
  }

  // delete
  deletecart(productId: any) {
    return this.http.delete<any>(`http://localhost:3000/cart/${productId}`);
  }
  
}
