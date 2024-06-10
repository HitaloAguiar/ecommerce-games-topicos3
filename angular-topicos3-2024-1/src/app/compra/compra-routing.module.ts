import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCardListComponent } from './components/game-card-list/game-card-list.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { gameViewResolver } from './resolver/game-view-resolver';

const routes: Routes = [
  { path: 'produtos', component: GameCardListComponent },
  { path: 'carrinho', component: CarrinhoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
