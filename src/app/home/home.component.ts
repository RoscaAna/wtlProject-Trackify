import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public greetings: string[] = [
    'Welcome to Trackify',
    'Bienvenue sur Trackify',
    'Willkommen bei Trackify',
    'бро пожаловать на Trackify',
    'Benvenuto su Trackify'
  ];
  public currentIndex: number = 0;

  public albums: string[] = [
    'assets/albums/album1.jpeg',
    'assets/albums/album2.jpg',
    'assets/albums/album3.png',
    'assets/albums/album4.jpg',
    'assets/albums/album5.png',
    'assets/albums/album6.png',
    'assets/albums/album7.jpeg',
    'assets/albums/album8.jpg',
    'assets/albums/album9.png',
    'assets/albums/album10.png',
    'assets/albums/album11.jpeg',
    'assets/albums/album12.png',
    'assets/albums/album13.png',
    'assets/albums/album14.png',
    'assets/albums/album15.png',
    'assets/albums/album16.png',
    'assets/albums/album17.png',
    'assets/albums/album18.jpg',
    'assets/albums/album19.png',
    'assets/albums/album20.png',
    'assets/albums/album21.png',
    'assets/albums/album22.png',
  ];

  ngOnInit(): void {
    this.startGreetingCarousel();
  }

  startGreetingCarousel(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.greetings.length;
    }, 3000); 
  }
}
