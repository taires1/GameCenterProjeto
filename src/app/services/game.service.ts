import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/backend';

  constructor(private http: HttpClient) { }

  addGame(game: Game) {
    return this.http.post(`${this.baseUrl}/add_game.php`, game, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/list_games.php`);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_game.php?id=${id}`);
  }
}
