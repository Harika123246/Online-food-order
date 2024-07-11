import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userList = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', Validators.required),
    });

    this.getAllUsers();
  }

  login() {
    console.log(this.loginForm.value,"login");
    const filteredUser = this.userList.find(
      (user: any) =>
        user.name.toUpperCase() ==
          this.loginForm.value.username.toUpperCase() &&
        user.password == this.loginForm.value.password
    );

    if (filteredUser) {
      localStorage.setItem('currentUser', JSON.stringify(filteredUser));
      this.router.navigate(['/products']);
    } else {
      alert('Invalid credentials');
    }
  }
 


  getAllUsers() {
    this.apiService.getAllUsers().subscribe((users) => {
      this.userList = users;
    });
  }

  
}
