import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Usuario } from 'src/app/models/usuario.model';
import { LocalStorageService } from 'src/app/services/local-storage-service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  qtdItensCarrinho: number = 0;

  constructor(private sidebarService: SidebarService,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
    this.obterUsuarioLogado();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.qtdItensCarrinho = itens.length
    });
  }

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  deslogar() {

    this.finishLogout();
    this.router.navigateByUrl('/compras/produtos');


  }
  finishLogout() {
    this.authService.removeToken()
    this.authService.removeUsuarioLogado();
    this.carrinhoService.removerTudo();
  }

  acessarPerfil() {
    if (this.usuarioLogado?.perfil == 'ADMIN') {
      this.router.navigateByUrl('/admin/perfil/view');
    } else if (this.usuarioLogado?.perfil == 'USER') {
      this.router.navigateByUrl('/user/perfil/view');
    }
  }

}

