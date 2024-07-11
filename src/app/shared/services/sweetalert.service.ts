import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  private subject = new Subject<any>();

  constructor() {}

  showSuccessMessage(): Observable<any> {
    Swal.fire({
      title: 'Success!',
      text: 'Your order placed successfully!',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'okay'
    }).then((result: any) => {
      if (result.value) {
        this.subject.next(result);
      }
    });

    return this.subject.asObservable();
  }
}
