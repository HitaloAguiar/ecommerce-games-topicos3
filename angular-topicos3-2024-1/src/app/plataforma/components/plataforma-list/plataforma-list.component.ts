
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Plataforma } from 'src/app/models/plataforma.model';
import { PlataformaService } from 'src/app/services/plataforma.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-plataforma-list',
  templateUrl: './plataforma-list.component.html',
  styleUrls: ['./plataforma-list.component.css']
})
export class PlataformaListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  tableColumns: string[] = ['id-column', 'nome-column','ano-lancamento-column','fabricante-column','acoes-column'];
  plataformas: Plataforma[] = [];

  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private plataformaService: PlataformaService, private dialog: MatDialog, private customPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }
  
  ngOnInit(): void {

    this.carregarPlataformas();
    this.carregarTotalRegistros();
  }

  carregarPlataformas() {

    // se existe dados no filtro
    if (this.filtro) {
      this.plataformaService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.plataformas = data;
      });
    } else {
      // buscando todas as plataformas
      this.plataformaService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.plataformas = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.plataformaService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.plataformaService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(plataforma: Plataforma) {

      if (plataforma.id != null) {

        this.plataformaService.delete(plataforma).subscribe({
          next: (plataformaCadastrada) => {
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
    this.carregarPlataformas();
  }

  aplicarFiltro() {
    this.carregarPlataformas();
    this.carregarTotalRegistros();
  }

  openConfirmationDialog(plataforma: Plataforma) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Tem certeza de que deseja excluir esta plataforma?' }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.plataformaService.delete(plataforma).subscribe({
            next: () => {
              this.plataformas = this.plataformas.filter(u => u !== plataforma);
              this.carregarTotalRegistros();
              this.carregarPlataformas();
              console.log('Plataforma excluído com sucesso');
            },
            error: (error) => {
              console.error('Erro ao excluir plataforma:', error);
            }
          });
        }
      }
    });
  }
}
