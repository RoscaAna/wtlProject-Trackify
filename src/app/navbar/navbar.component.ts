import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service'; 
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-navbar',
  standalone: true, 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule], 
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false;
  private authSubscription: Subscription | null = null;  

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.getLoggedInStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false; 
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
