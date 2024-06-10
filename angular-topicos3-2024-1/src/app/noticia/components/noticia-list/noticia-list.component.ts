import { Noticia } from 'src/app/models/noticia.model';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';

@Component({
  selector: 'app-noticia-list',
  templateUrl: './noticia-list.component.html',
  styleUrls: ['./noticia-list.component.css']
})
export class NoticiaListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  tableColumns: string[] = ['id-column', 'titulo-column', 'data-publicacao-column', 'autor-column', 'topico-principal-column', 'acoes-column'];
  noticias: Noticia[] = [];

  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private noticiaService: NoticiaService, private CustomPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.CustomPaginatorIntl; // Configuração da internacionalização
    }
  }
  
  ngOnInit(): void {

    this.carregarNoticias();
    this.carregarTotalRegistros();
  }

  carregarNoticias() {

    // se existe dados no filtro
    if (this.filtro) {
      this.noticiaService.findByTitulo(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.noticias = data;
      });
    } else {
      // buscando todos os noticias
      this.noticiaService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.noticias = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.noticiaService.countByTitulo(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.noticiaService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(noticia: Noticia) {

      if (noticia.id != null) {

        this.noticiaService.delete(noticia).subscribe({
          next: (noticiaCadastrado) => {
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
    this.carregarNoticias();
  }

  aplicarFiltro() {
    this.carregarNoticias();
    this.carregarTotalRegistros();
  }
}
