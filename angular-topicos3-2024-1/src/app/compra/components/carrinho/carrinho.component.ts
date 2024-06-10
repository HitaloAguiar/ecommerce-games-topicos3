// carrinho.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCarrinho } from 'src/app/models/item-carrinho.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { CartaoCredito } from 'src/app/models/cartao-credito.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {

  carrinhoItens: ItemCarrinho[] = [];
  continuar: boolean = false;
  pagando: boolean = false;
  selectedOption: string = '';
  private subscription = new Subscription();
  usuarioLogado: Usuario | null = null;
  enderecoSelecionado: boolean = false;
  formGroup: FormGroup;


  constructor(private carrinhoService: CarrinhoService,
    private router: Router,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    const cartao: CartaoCredito = this.activatedRoute.snapshot.data['cartaocredito'];
    this.formGroup = formBuilder.group({
      numeroCartao: [cartao?.numeroCartao || '', Validators.required],
      nomeImpressoCartao: [cartao?.nomeImpressoCartao || '', Validators.required],
      dataValidade: [cartao?.dataValidade || '', Validators.required],
      // cpfTitular: [cartao?.cpfTitular || '', Validators.required],
      bandeiraCartao: [cartao?.bandeiraCartao || '', Validators.required],
      codigoSeguranca: [cartao?.codigoSeguranca || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
    });
    this.obterUsuarioLogado();
    this.enderecoSelecionado = false;
  }

  selecionarEndereco() {
    this.enderecoSelecionado = !this.enderecoSelecionado;
    if (!this.enderecoSelecionado) {
      this.pagando = false;
    }
  }

  get bandeirasCartao() {
    return [
      { nome: 'Visa', valor: 'VISA' },
      { nome: 'American Express', valor: 'AMERICAN_EXPRESS' },
      { nome: 'Hipercard', valor: 'HIPERCARD' },
      { nome: 'Diners', valor: 'DINERS' },
      { nome: 'Mastercard', valor: 'MASTERCARD' },
      { nome: 'Elo', valor: 'ELO' },
    ];
  }

  salvarCartao() {

  }

  continuarCompra() {
    this.continuar = true;
  }

  terminarCompra() {
    this.continuar = false;
  }

  seguirParaPagamento() {
    this.pagando = true;
  }

  fecharPagamento() {
    this.pagando = false;
  }

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }

  finalizarCompra() {

    let pagamento: number = 0;

    switch (this.selectedOption) {

      case 'boleto':

        pagamento = 1;
        break;

      case 'pix':

        pagamento = 2;
        break;

      case 'cartao':

        pagamento = 3;
        break;
    }

    let cartaoCredito: CartaoCredito = new CartaoCredito();

    if (this.formGroup.valid) {

      console.log(this.formGroup.value);

      const formCartao = this.formGroup.value;

      cartaoCredito = this.formGroup.value;
    }

    console.log(cartaoCredito);
    this.pedidoService.save(this.carrinhoItens, this.usuarioLogado?.endereco, pagamento, cartaoCredito).subscribe({
      next: () => {
        this.carrinhoService.removerTudo();
        this.router.navigateByUrl('/user/compras/produtos');
      },
      error: (err) => {
        console.log('Erro ao incluir' + JSON.stringify(err));
      }
    });
  }

  abrirDialogoConfirmacao(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Tem certeza de que deseja editar o endereço?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Redirecionar para 'user/perfil/view' se o usuário confirmar
        this.redirecionarParaPerfil();
      }
    });
  }

  redirecionarParaPerfil(): void {
    this.router.navigate(['/user/perfil/view'], {
      queryParams: {
        selecionado: 'endereco',
        editandoEndereco: true
      }
    });
  }

  aumentarQuantidade(item: ItemCarrinho): void {
    // Verifica se a quantidade é menor que um valor máximo (opcional)
    if (item.quantidade < 10) {
      // Aumenta a quantidade do item no carrinho
      this.carrinhoService.aumentarQuantidade(item);
    }
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      this.carrinhoService.diminuirQuantidade(item);
    }
  }

}
