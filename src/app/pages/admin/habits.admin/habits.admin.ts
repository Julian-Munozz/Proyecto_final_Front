import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HabitsService } from '../../../services/habits.service';
import { Habits } from '../../../interfaces/habits';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-habits.admin',
  imports: [CommonModule],
  templateUrl: './habits.admin.html',
  styleUrl: './habits.admin.css'
})
export class HabitsAdmin implements OnInit {
private _habitsService = inject(HabitsService);

  habits: Habits[] = [];

  ngOnInit(): void {
    this.getHabits();
  }

  getHabits(): void {
      this._habitsService.getHabits().subscribe({
        next: (response: any) => {
          this.habits = response.data || [];
        },
        error: (error) => {
          Swal.fire({
            title: 'Error al cargar los hábitos',
            icon: 'error',
            text: error.mensaje,
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
}
