import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  
  tableColumns: string[] = ['id-column', 'nome-column', 'sigla-column', 'acoes-column'];
  estados: Estado[] = [];

  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private estadoService: EstadoService, private customPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }
  
  ngOnInit(): void {

    this.carregarEstados();
    this.carregarTotalRegistros();
  }

  carregarEstados() {

    // se existe dados no filtro
    if (this.filtro) {
      this.estadoService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.estados = data;
      });
    } else {
      // buscando todos os estados
      this.estadoService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.estados = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.estadoService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.estadoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(estado: Estado) {

      if (estado.id != null) {

        this.estadoService.delete(estado).subscribe({
          next: (estadoCadastrado) => {
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
    this.carregarEstados();
  }

  aplicarFiltro() {
    this.carregarEstados();
    this.carregarTotalRegistros();
  }
}
