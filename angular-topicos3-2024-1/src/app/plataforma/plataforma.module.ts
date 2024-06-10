import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { PlataformaListComponent } from './components/plataforma-list/plataforma-list.component';
import { PlataformaFormComponent } from './components/plataforma-form/plataforma-form.component';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlataformaListComponent,
    PlataformaFormComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
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
    FormsModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    CustomPaginatorIntl
  ]
})
export class PlataformaModule { }
