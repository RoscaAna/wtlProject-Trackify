import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-tracks',
  templateUrl: './my-tracks.component.html',
  styleUrls: ['./my-tracks.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MyTracksComponent implements OnInit {
  tracks = [
    {
      name: 'Song 1',
      artist: 'Artist 1',
      releaseYear: 2022,
      genres: ['Pop', 'Dance'],
      rating: 4.5
    },
    {
      name: 'Song 2',
      artist: 'Artist 2',
      releaseYear: 2020,
      genres: ['Rock', 'Alternative'],
      rating: 4.0
    }
  ];

  filteredTracks = [...this.tracks]; 
  isModalOpen = false;
  isDeleteModalOpen = false;
  newTrack = {
    name: '',
    artist: '',
    releaseYear: 0,
    genres: '',
    rating: 0
  };

  searchTerm = {
    name: '',
    artist: '',
    releaseYear: null,
    genres: ''
  };

  trackToDelete: any;
  trackIndexToDelete: number = -1;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserTracks();
  }

  loadUserTracks() {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser) {
      const storedTracks = localStorage.getItem(`${loggedInUser.email}-tracks`);
      if (storedTracks) {
        this.tracks = JSON.parse(storedTracks);
        this.filteredTracks = [...this.tracks];
      }
    }
  }

  filterTracks() {
    this.filteredTracks = this.tracks.filter(track => {
      const matchesName = track.name.toLowerCase().includes(this.searchTerm.name.toLowerCase());
      const matchesArtist = track.artist.toLowerCase().includes(this.searchTerm.artist.toLowerCase());
  
      const matchesYear = this.searchTerm.releaseYear
        ? track.releaseYear.toString().includes(this.searchTerm.releaseYear)
        : true;
  
      const matchesGenres = track.genres.some(genre => genre.toLowerCase().includes(this.searchTerm.genres.toLowerCase()));
  
      return matchesName && matchesArtist && matchesYear && matchesGenres;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDeleteModal(track: any, index: number) {
    this.trackToDelete = track;
    this.trackIndexToDelete = index;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  deleteTrack() {
    if (this.trackIndexToDelete !== -1) {
      this.tracks.splice(this.trackIndexToDelete, 1);
      this.filterTracks(); 
      this.saveUserTracks(); 
      this.closeDeleteModal();
    }
  }

  addTrack() {
    const genresArray = this.newTrack.genres.split(',').map(genre => genre.trim());
    const newTrack = { ...this.newTrack, genres: genresArray };
    this.tracks.push(newTrack);
    this.saveUserTracks(); 
    this.filterTracks(); 
    this.newTrack = { name: '', artist: '', releaseYear: 0, genres: '', rating: 0 };
    this.closeModal();
  }

  saveUserTracks() {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser) {
      localStorage.setItem(`${loggedInUser.email}-tracks`, JSON.stringify(this.tracks));
    }
  }
}
