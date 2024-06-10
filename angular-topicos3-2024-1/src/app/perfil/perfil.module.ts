import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewComponent } from './components/view/view.component';
import { UpdateComponent } from './components/update/update.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    ViewComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class PerfilModule { }