import { Component, inject, OnInit } from '@angular/core';
import { HabitsService } from '../../services/habits.service';
import {Habits} from '../../interfaces/habits';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {

_habitsService = inject(HabitsService);

habitsList: Habits[] = [];

ShowHabits(){
  this._habitsService.getHabits().subscribe({
    next: (response: any) => {
      this.habitsList = response.data;
    }, 
    error: (error: any) => {
      console.error(error);
    }
  });
}
ngOnInit(): void {
  this.ShowHabits();
}
}
