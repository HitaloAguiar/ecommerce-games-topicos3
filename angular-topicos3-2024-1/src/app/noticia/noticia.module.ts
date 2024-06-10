import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiaRoutingModule } from './noticia-routing.module';
import { NoticiaListComponent } from './components/noticia-list/noticia-list.component';
import { NoticiaFormComponent } from './components/noticia-form/noticia-form.component';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NoticiaListComponent,
    NoticiaFormComponent
  ],
  imports: [
    CommonModule,
    NoticiaRoutingModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    CustomPaginatorIntl
  ]
})
export class NoticiaModule { }
