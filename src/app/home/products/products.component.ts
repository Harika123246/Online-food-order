import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productlist: any;
  cartlist: any;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCart();
  }

  getAllProducts() {
    this.apiService.getAllProducts().pipe(
      map(products => products.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
    ).subscribe((product) => {
      this.productlist = product;
      console.log(this.productlist);
    });
  }

  getAllCart() {
    this.apiService.getCart().subscribe((res) => {
      this.cartlist = res;
    });
  }

  redirectToProduct(type?: string, id?: string) {
    if (type === 'edit') {
      this.router.navigate([`/addproduct/${id}`]);
    } else {
      this.router.navigate(['/addproduct']);
    }
  }

  deleteProduct(id: string) {
    this.apiService.deleteproductById(id).subscribe((product) => {
      if (product) {
        this.getAllProducts();
      }
    });
  }

  addCart(item: any) {
    // Check if the product is already in the cart
    const existingCartItem = this.cartlist.find(
      (data: any) => data.id === item.id
    );

    let quantityToAdd = existingCartItem ? existingCartItem.quantity + 1 : 1;

    const productPayload = {
      id: item.id || '',
      name: item.name || '',
      imagepath: item.imagepath || '',
      description: item.description || '',
      price: item.price || '',
      quantity: quantityToAdd,
    };

    if (existingCartItem) {
      this.apiService
        .editCart(item.id, productPayload)
        .subscribe((response: any) => {
          if (response) {
            this.router.navigate(['/mycart']);
          }
        });
    } else {
      this.apiService.addToCart(productPayload).subscribe((res) => {
        if (res) {
          this.router.navigate(['/mycart']);
        }
      });
    }
  }
}
