import { Routes } from '@angular/router';
import { AddGameComponent } from './pages/add-game/add-game.component';
import { ListGamesComponent } from './pages/list-games/list-games.component';

export const routes: Routes = [
    { path: 'add', component: AddGameComponent },
    { path: 'list', component: ListGamesComponent },
    { path: '', redirectTo: '/add', pathMatch: 'full' } // Primeiro abre o Cadastro
  ];
  
