import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { homeDta } from '../../data/homeData';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  homeInfo = homeDta;

}
