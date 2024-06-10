import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CidadeRoutingModule } from './cidade-routing.module';
import { CidadeListComponent } from './components/cidade-list/cidade-list.component';
import { CidadeFormComponent } from './components/cidade-form/cidade-form.component';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
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
    CidadeListComponent,
    CidadeFormComponent
  ],
  imports: [
    CommonModule,
    CidadeRoutingModule,
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
    FormsModule
  ],
  providers: [
    CustomPaginatorIntl
  ]
})
export class CidadeModule { }
