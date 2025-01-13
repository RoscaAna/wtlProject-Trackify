import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  private loggedInUser: any = null;
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    if (storedLoggedInUser) {
      this.loggedInUser = JSON.parse(storedLoggedInUser);
      this.loggedInSubject.next(true);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  register(user: { email: string; password: string; username: string; }): string {
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return 'User already exists!';
    }

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return 'Account created successfully!';
  }

  login(credentials: { email: string; password: string; }): string {
    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      this.loggedInUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.loggedInSubject.next(true);
      return 'Login successful!';
    } else {
      return 'Invalid email or password!';
    }
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    this.loggedInSubject.next(false);
  }

  updateUsername(newUsername: string) {
    if (this.loggedInUser) {
      this.loggedInUser.username = newUsername;
      const userIndex = this.users.findIndex(u => u.email === this.loggedInUser.email);
      if (userIndex !== -1) {
        this.users[userIndex].username = newUsername;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    }
  }

  getUsername(): string {
    return this.loggedInUser ? this.loggedInUser.username : '';
  }

  getLoggedInStatus() {
    return this.loggedInSubject.asObservable();
  }
}
