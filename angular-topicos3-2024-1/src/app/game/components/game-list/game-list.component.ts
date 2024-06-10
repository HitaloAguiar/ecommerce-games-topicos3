import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  tableColumns: string[] = ['id-column', 'nome-column', 'ano-lancamento-column', 'developer-column', 'genero-column', 'plataforma-column', 'preco-column', 'acoes-column'];
  games: Game[] = [];

  totalRegistros = 0;
  pageSize = 4;
  pagina = 0;
  filtro: string = "";

  constructor(private gameService: GameService, private CustomPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.CustomPaginatorIntl; // Configuração da internacionalização
    }
  }

  ngOnInit(): void {

    this.carregarGames();
    this.carregarTotalRegistros();
  }

  carregarGames() {

    // se existe dados no filtro
    if (this.filtro) {
      this.gameService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
      });
    } else {
      // buscando todos os games
      this.gameService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
      });
    }
  }

  gerarRelatorio(filtro: string): void {
    this.gameService.gerarRelatorio(filtro).subscribe({
      next: (data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Simula um clique em um link invisível para iniciar o download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio.pdf';
        link.dispatchEvent(new MouseEvent('click'));

        // Libera a URL do objeto Blob
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao baixar o relatório', error);
      }
    });
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.gameService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.gameService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(game: Game) {

      if (game.id != null) {

        this.gameService.delete(game).subscribe({
          next: (gameCadastrado) => {
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
    this.carregarGames();
  }

  aplicarFiltro() {
    this.carregarGames();
    this.carregarTotalRegistros();
  }
}
