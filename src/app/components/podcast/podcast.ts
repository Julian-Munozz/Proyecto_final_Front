import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { podcast } from '../../data/podcast';

@Component({
  selector: 'app-podcast',
  imports: [CommonModule],
  templateUrl: './podcast.html',
  styleUrl: './podcast.css'
})
export class Podcast {

  podcastSugg = podcast;

}
