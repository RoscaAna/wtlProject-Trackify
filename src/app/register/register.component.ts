import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class RegisterComponent {
  email = '';
  password = '';
  username = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const result = this.authService.register({ 
      email: this.email, 
      password: this.password, 
      username: this.username 
    });

    if (result === 'Account created successfully!') {
      this.message = result;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.message = result;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
