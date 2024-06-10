import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Genero } from 'src/app/models/genero.model';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.css']
})
export class GeneroListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  tableColumns: string[] = ['id-column', 'nome-column', 'acoes-column'];
  generos: Genero[] = [];

  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private generoService: GeneroService, private dialog: MatDialog, private customPaginatorIntl: CustomPaginatorIntl) {}

  ngOnInit(): void {

    this.carregarGeneros();
    this.carregarTotalRegistros();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }
  
  carregarGeneros() {

    // se existe dados no filtro
    if (this.filtro) {
      this.generoService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.generos = data;
      });
    } else {
      // buscando todos os generos
      this.generoService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.generos = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.generoService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.generoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(genero: Genero) {

      if (genero.id != null) {

        this.generoService.delete(genero).subscribe({
          next: (generoCadastrado) => {
            this.ngOnInit();
          },
          error: (err) => {
            console.log('Erro ao excluir' + JSON.stringify(err));
          }
        })
      }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarGeneros();
  }

  aplicarFiltro() {
    this.carregarGeneros();
    this.carregarTotalRegistros();
  }

  openConfirmationDialog(genero: Genero) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Deseja excluir este genero?' }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.generoService.delete(genero).subscribe({
            next: () => {
              this.generos = this.generos.filter(u => u !== genero);
              this.carregarTotalRegistros();
              this.carregarGeneros();
              console.log('Genero excluído com sucesso');
            },
            error: (error) => {
              console.error('Erro ao excluir genero:', error);
            }
          });
        }
      }
    });
  }
}
