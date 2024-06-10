import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';

type Card = {
  titulo: string;
  developer: string;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-game-card-list',
  templateUrl: './game-card-list.component.html',
  styleUrls: ['./game-card-list.component.css']
})
export class GameCardListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  cards = signal<Card[]> ([]);
  games: Game[] = [];

  totalRegistros = 0;
  pageSize = 4;
  pagina = 0;
  filtro: string = "";

  constructor(private gameService: GameService, private customPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }

  ngOnInit(): void {
    this.carregarGames();
    this.carregarTotalRegistros();
  }

  carregarGames() {

    if (this.filtro) {
      this.gameService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
        this.carregarCards();
      });
    } else {
      // buscando todos os games
      this.gameService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
        this.carregarCards();
      });
    }
  }

  gerarRelatorio(filtro: string) {
    this.gameService.gerarRelatorio(filtro).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error) => {
        console.error('Erro ao gerar relatório', error);
      }
    );
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

  carregarCards() {
    const cards: Card[] = [];
    this.games.forEach(game => {
      cards.push({
        titulo: game.nome,
        developer: game.developer.nome,
        preco: game.preco,
        urlImagem: this.gameService.getUrlImagem(game.nomeImagem)
      });
    });
    this.cards.set(cards);
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
