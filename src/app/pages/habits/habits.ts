import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitsService } from '../../services/habits.service';
import { Habits } from '../../interfaces/habits';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-habits',
  imports: [CommonModule, FormsModule],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class HabitsPage implements OnInit {

  private _habitsService = inject(HabitsService)
  

 
  habits: Habits[] = [];
  showForm = false;
  isEditing = false;
  
  // Formulario simple
  habitForm: Partial<Habits> = {};

  ngOnInit(): void {
    this.loadHabits();
  }

 
  loadHabits(): void {
    this._habitsService.getHabits().subscribe({
      next: (response: any) => {
        this.habits = response.data || [];
      },
      error: (error) => {
        Swal.fire({
                    title: 'Error al cargar los hábitos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
      }
    });
  }

  
  openForm(): void {
    this.showForm = true;
    this.isEditing = false;
    this.habitForm = {
      tittle: '',
      category: 'Salud',
      description: '',
      benefit: '',
      img: ''
    };
  }

  
  closeForm(): void {
    this.showForm = false;
    this.habitForm = {};
  }

  // Guardar (crear o actualizar)
  saveHabit(): void {
    if (!this.habitForm.tittle || !this.habitForm.description) {
       Swal.fire({
                    title: 'Revisa los campos del formulario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
      return;
    }

    if (this.isEditing) {
      this._habitsService.updateHabitById(this.habitForm._id!, this.habitForm as Habits).subscribe({
        next: (response: any) => {
          Swal.fire({
                      icon: 'success',
                      title: 'Información actualizada',
                      text: response.mensaje 
                    })
          this.loadHabits();
          this.closeForm();
        },
        error: (error) => {
           Swal.fire({
                    title: 'Error al actualizar la información',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
        }
      });
    } else {
      // Crear
      this._habitsService.createHabit(this.habitForm as Habits).subscribe({
        next: (response: any) => {
         Swal.fire({
                     icon: 'success',
                     title: 'Se ha creado el hábito',
                     text: response.mensaje 
                   })
          this.loadHabits();
          this.closeForm();
        },
        error: (error) => {
           Swal.fire({
                    title: 'Error al crear el hábito',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
        }
      });
    }
  }

  // Editar hábito
  editHabit(habit: Habits): void {
    this.showForm = true;
    this.isEditing = true;
    this.habitForm = { ...habit };
  }

  // Eliminar hábito
  deleteHabit(id: string): void {
    if (!confirm('¿Eliminar este hábito?')) return;
    
    this._habitsService.deleteHabitById(id).subscribe({
      next: (response: any) => {
        Swal.fire({
                    icon: 'success',
                    title: 'Se elimino correctamente',
                    text: response.mensaje
                  })
        this.loadHabits();
      },
      error: (error: any) => {
        Swal.fire({
                    title: 'Error al cargar los hábitos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
      }
    });
  }
}


