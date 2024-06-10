import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricanteListComponent } from './components/fabricante-list/fabricante-list.component';
import { FabricanteFormComponent } from './components/fabricante-form/fabricante-form.component';
import { fabricanteResolver } from './resolver/fabricante-resolver';

const routes: Routes = [
  {path: 'list', component: FabricanteListComponent},
  {path: 'new', component: FabricanteFormComponent},
  {path: 'edit/:id', component: FabricanteFormComponent, resolve: {fabricante: fabricanteResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule { }
