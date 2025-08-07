import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home implements OnInit {
  user: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/users/all').subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      },
    });
  }
}
