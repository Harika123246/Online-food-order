import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss'],
})
export class MycartComponent implements OnInit {
  cartlist: any = [];
  totalAmount: number = 0;

  constructor(
    private apiservice: ApiService,
    private alertService: SweetalertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCart();
  }

  getAllCart() {
    this.apiservice.getCart().subscribe((res) => {
      this.cartlist = res;
      this.calculateTotalAmount();
    });
  }

  deleteCart(id: any) {
    this.apiservice.deletecart(id).subscribe((response) => {
      if (response) {
        this.getAllCart();
      }
    });
  }
  deleteAll() {
    if(this.cartlist?.length) {
      this.cartlist.forEach((ele: any) => {
        this.deleteCart(ele.id);
      });
    }
  }
 

  onQuantityChange(cartitem: any): void {
    if (cartitem?.quantity) {
      this.apiservice
        .editCart(cartitem.id, cartitem)
        .subscribe((response: any) => {
          if (response) {
            this.getAllCart();
          }
        });
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = 0;
    // Iterate through cartlist and calculate total amount
    this.cartlist.forEach((item: any) => {
      this.totalAmount += item.price * item.quantity;
    });
  }

  onCheckOut() {
    this.alertService.showSuccessMessage().subscribe((result: any) => {
      console.log(result,"res")
      if (result.isConfirmed) {
        this.deleteAll()
        this.router.navigate(['/products']);
      }
    });
  }
}
