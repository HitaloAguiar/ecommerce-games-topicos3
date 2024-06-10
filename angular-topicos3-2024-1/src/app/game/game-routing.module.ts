import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { gameResolver } from './resolver/game-resolver';
import { GameCardListComponent } from './components/game-card-list/game-card-list.component';

const routes: Routes = [
  {path: 'list', component: GameListComponent},
  {path: 'new', component: GameFormComponent},
  {path: 'edit/:id', component: GameFormComponent, resolve: {game: gameResolver}},
  {path: 'card-list', component: GameCardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
