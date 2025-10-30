import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-zen',
  imports: [],
  templateUrl: './zen.html',
  styleUrl: './zen.css',
  
})
export class Zen implements OnInit  {
 
  quotes: { quote: string; author: string }[] = [
  { quote: 'La disciplina supera a la motivación.', author: 'David Goggins' },
  { quote: 'El equilibrio no se encuentra, se crea cada día.', author: 'Chris Williamson' },
  { quote: 'Haz hoy lo que te acercará a quien quieres ser mañana.', author: 'Jordan Peterson' },
  { quote: 'El silencio también enseña.', author: 'Anónimo' },
  { quote: 'Sé paciente contigo mismo, el crecimiento toma tiempo.', author: 'James Clear' },
  { quote: 'La mente es tu mejor aliada o tu peor enemiga.', author: 'Napoleon Hill' },
  { quote: 'Tu futuro se crea con lo que haces hoy, no mañana.', author: 'Robert Kiyosaki' },
  { quote: 'La consistencia es más poderosa que la intensidad.', author: 'James Clear' },
  { quote: 'La calma es un superpoder.', author: 'Ryan Holiday' },
  { quote: 'El éxito no se persigue, se atrae por la persona en la que te conviertes.', author: 'Jim Rohn' },
  { quote: 'No esperes a estar motivado; actúa y la motivación vendrá.', author: 'Mel Robbins' },
  { quote: 'El dolor es temporal, pero rendirse dura para siempre.', author: 'Lance Armstrong' },
  { quote: 'La acción cura el miedo.', author: 'David Goggins' },
  { quote: 'El silencio no es ausencia de ruido, es sabiduría para escuchar.', author: 'Desconocido' },
  { quote: 'El tiempo que disfrutas desperdiciar no es tiempo desperdiciado.', author: 'Marthe Troly-Curtin' }
];

  currentQuote: { quote: string; author: string } = { quote: '', author: '' };

  ngOnInit(): void {
    this.changeQuote();

    setInterval(() => {
      this.changeQuote();
    }, 8000);
  }

  changeQuote(): void {
    const index = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[index];
    // Math.random()  → genera un número decimal aleatorio entre 0 y 1.
  //  Math.floor() → redondea ese número hacia abajo para obtener un índice entero 
  }
}


