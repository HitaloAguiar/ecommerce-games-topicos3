import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';

import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { TelefoneFormComponent } from './components/telefone-form/telefone-form.component';

@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent,
    TelefoneFormComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [
    CustomPaginatorIntl
  ]
})
export class UsuarioModule { }
