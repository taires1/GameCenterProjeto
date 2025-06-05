import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Importação correta
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [
    CommonModule,        // Já tinha
    
  ],
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (error) => {
        console.error('Erro ao buscar jogos', error);
      }
    });
  }

  deleteGame(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.deleteGame(id).subscribe({
          next: () => {
            Swal.fire(
              'Deletado!',
              'O jogo foi excluído com sucesso.',
              'success'
            );
            this.games = this.games.filter(game => game.id !== id); // Atualiza lista sem recarregar
          },
          error: (error) => {
            console.error('Erro ao excluir', error);
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao tentar excluir o jogo.',
              'error'
            );
          }
        });
      }
    });
  }
}
