import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  showSuccessModal = false;
  showErrorModal = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const loginResult = this.authService.login({ email: this.email, password: this.password });
    if (loginResult === 'Login successful!') {
      this.showSuccessModal = true;
      document.body.classList.add('body-blur'); 
      setTimeout(() => {
        this.router.navigate(['/my-tracks']);
        this.closeModal(); 
      }, 2000);
    } else {
      this.errorMessage = loginResult;
      this.showErrorModal = true;
      document.body.classList.add('body-blur'); 
    }
  }
  
  closeModal() {
    this.showSuccessModal = false;
    this.showErrorModal = false;
    document.body.classList.remove('body-blur'); 
  }
  
}
