import { Component } from '@angular/core';
import { books } from '../../data/books';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books {

  booksSugg = books
}
