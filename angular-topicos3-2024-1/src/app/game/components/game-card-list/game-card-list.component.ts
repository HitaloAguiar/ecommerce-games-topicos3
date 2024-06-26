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
  }

  carregarGames() {

    this.gameService.findAll().subscribe(data => {
      this.games = data;
    });
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

  carregarCards() {
    const cards: Card[] = [];
    this.games.forEach(game => {
      cards.push({
        titulo: game.nome,
        developer: game.developer,
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
  }
}
