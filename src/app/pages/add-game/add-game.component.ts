import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router'; // IMPORTA AQUI
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONA AQUI
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  game: Game = {
    name: '',
    genre: '',
    platform: '',
    developer: '',
    imageUrl: ''
  };

  constructor(private gameService: GameService, private router: Router) {}

  addGame() {
    Swal.fire({
      title: 'Salvando...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.gameService.addGame(this.game).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Jogo cadastrado com sucesso!',
          confirmButtonColor: '#007bff'
        }).then(() => {
          this.game = {  // Limpa o formulário
            name: '',
            genre: '',
            platform: '',
            developer: '',
            imageUrl: ''
          };
          this.router.navigate(['/list']);  // Redireciona para lista
        });
      },
      error: (error) => {
        console.error('Erro ao cadastrar', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível cadastrar o jogo.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
  
}
