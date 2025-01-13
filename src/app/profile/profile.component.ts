import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class ProfileComponent {
  username: string = '';  
  isEditMode = false; 
  newUsername: string = '';

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const loggedInUser = this.authService.getLoggedInUser(); 
      this.username = loggedInUser?.username || 'User';
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.newUsername = this.username; 
  }

  saveUsername() {
    if (this.newUsername.trim()) {
      this.username = this.newUsername;
      this.authService.updateUsername(this.username);
      localStorage.setItem('username', this.username); 
      this.toggleEditMode();
    }
  }

  cancelEdit() {
    this.toggleEditMode();
  }
}
