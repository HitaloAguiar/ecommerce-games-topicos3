import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiaListComponent } from './components/noticia-list/noticia-list.component';
import { NoticiaFormComponent } from './components/noticia-form/noticia-form.component';
import { noticiaResolver } from './resolver/noticia-resolver';

const routes: Routes = [
  {path: 'list', component: NoticiaListComponent},
  {path: 'new', component: NoticiaFormComponent},
  {path: 'edit/:id', component: NoticiaFormComponent, resolve: {noticia: noticiaResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiaRoutingModule { }
