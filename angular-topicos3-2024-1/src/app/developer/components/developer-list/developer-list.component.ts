
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { MatTableDataSource } from '@angular/material/table';
import { Developer } from 'src/app/models/developer.model';
import { DeveloperService } from 'src/app/services/developer.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  tableColumns: string[] = ['id-column', 'nome-column', 'ano-fundacao-column', 'classificacao-column', 'acoes-column'];
  developers: Developer[] = [];

  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private developerService: DeveloperService, private dialog: MatDialog,  private customPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }
  
  ngOnInit(): void {

    this.carregarDevelopers();
    this.carregarTotalRegistros();
  }

  carregarDevelopers() {

    // se existe dados no filtro
    if (this.filtro) {
      this.developerService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.developers = data;
      });
    } else {
      // buscando todos os developers
      this.developerService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.developers = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.developerService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.developerService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(developer: Developer) {

      if (developer.id != null) {

        this.developerService.delete(developer).subscribe({
          next: (developerCadastrado) => {
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
    this.carregarDevelopers();
  }

  aplicarFiltro() {
    this.carregarDevelopers();
    this.carregarTotalRegistros();
  }

  openConfirmationDialog(developer: Developer) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Tem certeza de que deseja excluir este developer?' }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.developerService.delete(developer).subscribe({
            next: () => {
              this.developers = this.developers.filter(u => u !== developer);
              this.carregarTotalRegistros();
              this.carregarDevelopers();
              console.log('Developer excluído com sucesso');
            },
            error: (error) => {
              console.error('Erro ao excluir developer:', error);
            }
          });
        }
      }
    });
  }

}
