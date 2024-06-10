import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlataformaListComponent } from './components/plataforma-list/plataforma-list.component';
import { PlataformaFormComponent } from './components/plataforma-form/plataforma-form.component';
import { plataformaResolver } from './resolver/plataforma-resolver';

const routes: Routes = [
  {path: 'list', component: PlataformaListComponent},
  {path: 'new', component: PlataformaFormComponent},
  {path: 'edit/:id', component: PlataformaFormComponent, resolve: {plataforma: plataformaResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }
