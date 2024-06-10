import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { UpdateComponent } from './components/update/update.component';
import { usuarioResolver } from './resolver/usuario-resolver';

const routes: Routes = [
  {path: 'view', component: ViewComponent},
  {path: 'update/:id', component: UpdateComponent, resolve: {usuario: usuarioResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
