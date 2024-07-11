import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  productDetails!: [];
  productForm!: FormGroup;
  productId !: string;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private location: Location,
    private apiService: ApiService
  ) {}

  // ngOnInit() {
  //   this.productForm = new FormGroup({
  //     name: new FormControl(''),
  //     url: new FormControl(''),
  //     description: new FormControl(''),
  //     price: new FormControl(''),
  //   });
  // }

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });

    // edit case
    if (this.productId) {
      this.getProductId();
    }
  }

  addProduct() {
    const productPayload = {
      name: this.productForm.value.name || '',
      imagepath: this.productForm.value.url || '',
      description: this.productForm.value.description || '',
      price: this.productForm.value.price || '',
      updatedAt: new Date().toISOString(),
    };

    if (!this.productId) {
      // create case
      this.apiService.addproduct(productPayload).subscribe((res) => {
        if (res) {
          this.router.navigate(['/products']);
        }
      });
    } else {
      // edit case
      this.apiService.editproduct(this.productId, productPayload).subscribe((res) => {
        if (res) {
          this.router.navigate(['/products']);
        }
      });
    }
  }

  resetForm() {
    this.productForm.reset();
  }

  getPreviousUrl(): void {
    this.location.back();
  }
  

  getProductId() {
    this.apiService.getProductById(this.productId).subscribe((data) => {
      this.productDetails = data;

      this.productForm.patchValue({
        name: data.name,
        url: data.imagepath,
        description: data.description,
        price: data.price,
      }); 
    });
  }
}
