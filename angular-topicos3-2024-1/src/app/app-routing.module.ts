import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminTemplateComponent } from './shared/components/admin-template/admin-template.component';
import { EstadoFormComponent } from './estado/components/estado-form/estado-form.component';
import { UserTemplateComponent } from './shared/components/user-template/user-template.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule)
  },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    children: [
      {
        path: 'estados', loadChildren:
          () => import('./estado/estado.module')
            .then(m => m.EstadoModule)
      },
      {
        path: 'cidades', loadChildren:
          () => import('./cidade/cidade.module')
            .then(m => m.CidadeModule)
      },
      {
        path: 'games', loadChildren:
          () => import('./game/game.module')
            .then(m => m.GameModule)
      },
      {
        path: 'usuarios', loadChildren:
          () => import('./usuario/usuario.module')
            .then(m => m.UsuarioModule)
      },
      {
        path: 'perfil', loadChildren:
          () => import('./perfil/perfil.module')
            .then(m => m.PerfilModule)
      }
    ],
  },
  {
    path: 'user',
    component: UserTemplateComponent,
    children: [
      // { path: 'login', component: LoginComponent },
       {
        path: 'compras', loadChildren:
          () => import('./compra/compra.module')
            .then(m => m.CompraModule)
      },{
        path: 'perfil', loadChildren:
          () => import('./perfil/perfil.module')
            .then(m => m.PerfilModule)
      },

      // { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '', redirectTo: '/compras/produtos', pathMatch: 'full' }, // Rota padrão
   { path: '**', redirectTo: '/compras/produtos' }, // Rota para tratamento de erro


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
