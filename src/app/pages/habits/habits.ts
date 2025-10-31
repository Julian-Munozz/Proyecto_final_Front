import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitsService } from '../../services/habits.service';
import { Habits } from '../../interfaces/habits';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-habits',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class HabitsPage implements OnInit {

  private _habitsService = inject(HabitsService);

  habits: Habits[] = [];
  showForm = false;
  isEditing = false;
  selectedFile: File | null = null;

  habitForm = new FormGroup({
    _id: new FormControl(''),
    tittle: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    benefit: new FormControl(''),
    img: new FormControl('')
  });

  ngOnInit(): void {
    this.getHabits();
  }

  fileChange(event: any) {
    const input = event.target.files[0];
    if (input) {
      this.selectedFile = input;
      console.log('Archivo seleccionado:', this.selectedFile);
    }
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

  openForm(): void {
    this.showForm = true;
    this.isEditing = false;
    this.selectedFile = null;
    this.habitForm.reset({
      _id: '',
      tittle: '',
      category: 'Salud',
      description: '',
      benefit: '',
      img: ''
    });
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedFile = null;
    this.habitForm.reset();
  }

  handleSubmit(): void {
    if (this.habitForm.invalid) {
      Swal.fire({
        title: 'Revisa los campos del formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (this.isEditing) {
      this.updateHabitsById();
    } else {
      this.createPost();
    }
  }

  createPost(): void {
    const habitData: FormData = new FormData();

    habitData.append('tittle', this.habitForm.value.tittle || '');
    habitData.append('category', this.habitForm.value.category || '');
    habitData.append('description', this.habitForm.value.description || '');
    habitData.append('benefit', this.habitForm.value.benefit || '');
    habitData.append('img', this.selectedFile || '');

    this._habitsService.createHabit(habitData).subscribe({
      next: (response: any) => {
        console.log('Hábito creado:', response);
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Se ha creado el hábito',
            text: response.mensaje
          });
          this.getHabits();
          this.closeForm();
        }
      },
      error: (error) => {
        console.error('Error al crear:', error);
        Swal.fire({
          title: 'Error al crear el hábito',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  updateHabitsById(): void {
    const habitData: FormData = new FormData();

    habitData.append('tittle', this.habitForm.value.tittle || '');
    habitData.append('category', this.habitForm.value.category || '');
    habitData.append('description', this.habitForm.value.description || '');
    habitData.append('benefit', this.habitForm.value.benefit || '');
    
    if (this.selectedFile) {
      habitData.append('img', this.selectedFile);
    }

    this._habitsService.updateHabitById(this.habitForm.value._id!, habitData).subscribe({
      next: (response: any) => {
        console.log('Hábito actualizado:', response);
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Información actualizada',
            text: response.mensaje
          });
          this.getHabits();
          this.closeForm();
        }
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        Swal.fire({
          title: 'Error al actualizar la información',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  editHabit(habit: Habits): void {
    this.showForm = true;
    this.isEditing = true;
    this.selectedFile = null;
    this.habitForm.patchValue({
      _id: habit._id,
      tittle: habit.tittle,
      category: habit.category,
      description: habit.description,
      benefit: habit.benefit || '',
      img: habit.img || ''
    });
  }

  deleteHabitsById(id: string): void {
    this._habitsService.deleteHabitById(id).subscribe({
      next: (response: any) => {
        console.log('Hábito eliminado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Se eliminó correctamente',
          text: response.mensaje
        });
        this.getHabits();
      },
      error: (error: any) => {
        console.error('Error al eliminar:', error);
        Swal.fire({
          title: 'Error al eliminar el hábito',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}


