import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

type Card = {
  id: number;
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
  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();
  jogosEncontrados: boolean = true

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  cards = signal<Card[]>([]);
  games: Game[] = [];

  totalRegistros = 0;
  pageSize = 6;
  pagina = 0;
  filtro: string = "";

  constructor(private gameService: GameService,
    private customPaginatorIntl: CustomPaginatorIntl,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.carregarGames();
    this.carregarTotalRegistros();
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }

  carregarGames() {
    if (this.filtro) {
      this.gameService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
        this.jogosEncontrados = this.games.length > 0; // Atualiza jogosEncontrados aqui
        this.carregarCards();
      });
    } else {
      this.gameService.findAllPaginado(this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
        this.jogosEncontrados = this.games.length > 0; // Atualiza jogosEncontrados aqui
        this.carregarCards();
      });
    }
  }


  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
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
        id: game.id,
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

  adicionarAoCarrinho(card: Card): void {



    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.id,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
      urlImagem: card.urlImagem,
    });
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}