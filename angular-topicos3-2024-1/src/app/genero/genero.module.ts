import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { GeneroRoutingModule } from './genero-routing.module';
import { GeneroListComponent } from './components/genero-list/genero-list.component';
import { GeneroFormComponent } from './components/genero-form/genero-form.component';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GeneroListComponent,
    GeneroFormComponent
  ],
  imports: [
    CommonModule,
    GeneroRoutingModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    CustomPaginatorIntl
  ]
})
export class GeneroModule { }
