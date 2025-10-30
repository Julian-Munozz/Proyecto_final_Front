import { Podcast } from './../../components/podcast/podcast';
import { Books } from './../../components/books/books';
import { Component } from '@angular/core';


@Component({
  selector: 'app-beyond',
  imports: [Podcast, Books],
  templateUrl: './beyond.html',
  styleUrl: './beyond.css'
})
export class Beyond {

}
