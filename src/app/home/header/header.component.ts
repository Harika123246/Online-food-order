import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      console.log(this.currentUser);
  }

  logout(){
    localStorage.removeItem('currentUser'); // Remove user data
    this.router.navigate(['/login']);

  }

}


