import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  userdata = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required),
      },
      { validator: this.mustMatch('password', 'confirmpassword') }
    );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (
        confirmPassControl.errors &&
        !confirmPassControl.errors['mustMatch']
      ) {
        // return if another validator has already found an error on the confirmPassword
        return;
      }

      // set error on confirmPassword if validation fails
      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  adduser() {
    const user = {
      name: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    this.apiService.adduser(user).subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }
}
