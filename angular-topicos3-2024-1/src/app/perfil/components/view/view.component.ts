import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cidade } from 'src/app/models/cidade.model';
import { Endereco } from 'src/app/models/endereco.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { CartaoCredito } from 'src/app/models/cartao-credito.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  mostrarBotaoAdicionar: boolean = false;
  usuarioLogado: Usuario | null = null;

  private subscription = new Subscription();

  apiResponse: any = null;
  selecionado: 'Informacoes do Usuario' | 'historico' | 'endereco' | 'senha' = 'Informacoes do Usuario';

  formGroup: FormGroup;
  formGroupSenhaAtual: FormGroup;
  formGroupSenhaNova: FormGroup;

  cidades: Cidade[] = [];
  urlImage: string = '';

  selecionado2: string = 'Informacoes do Usuario'; // Pode ser inicializado com o valor padrão
  editandoEndereco: boolean = false;
  editandoFoto: boolean = false;
  editandoSenha: boolean = false;

  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  historicoCompras: any[] = [];

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    private cidadeService: CidadeService,
    private el: ElementRef,
    private renderer: Renderer2) {
    const endereco: Endereco = this.activatedRoute.snapshot.data['endereco'];
    this.formGroupSenhaAtual = formBuilder.group({
      senhaAtual: ['', Validators.required],
    });

    this.formGroupSenhaNova = formBuilder.group({
      senhaNova: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    });

    this.formGroup = formBuilder.group({
      logradouro: [(endereco && endereco.logradouro) ? endereco.logradouro : '', Validators.required],
      numero: [(endereco && endereco.numero) ? endereco.numero : '', Validators.required],
      complemento: [(endereco && endereco.complemento) ? endereco.complemento : ''],
      bairro: [(endereco && endereco.bairro) ? endereco.bairro : '', Validators.required],
      cep: [(endereco && endereco.cep) ? endereco.cep : '', Validators.required],
      cidade: [(endereco && endereco.cidade) ? endereco.cidade.id : '', Validators.required],
      // idUsuario: 0
    });
  }
  ngOnInit(): void {
    this.cidadeService.findAll().subscribe((cidades: Cidade[]) => {
      this.cidades = cidades;
    }); // Substitua pelo valor real

    this.obterUsuarioLogado();
    const userLogin = this.usuarioLogado?.login || ''; // Substitua pelo campo real que contém o login
    this.setUrlImage();

    this.pedidoService.findAll(userLogin).subscribe(
      response => {
        console.log(response);
        this.historicoCompras = response;
      },
      error => {
        console.error('Erro ao obter pedidos:', error);
        // Trate o erro conforme necessário
      }
    );
  }

  obterDescricaoFormaPagamento(formaPagamento: number): string {
    switch (formaPagamento) {
      case 1:
        return 'Boleto Bancário';
      case 2:
        return 'PIX';
      case 3:
        return 'Cartão de Crédito';
      default:
        return 'Forma de pagamento não especificada';
    }
  }

  setUrlImage() {

    console.log(this.usuarioLogado);

    this.urlImage = this.usuarioLogado?.nomeImagem == undefined ? '' : this.usuarioService.getUrlImagem(this.usuarioLogado?.nomeImagem);
  }

  editarEndereco() {
    this.editandoEndereco = true;
  }

  cancelarEdicaoEndereco() {
    this.editandoEndereco = false;
  }

  editar() {
    if (this.usuarioLogado && this.usuarioLogado.id) {
      if (this.usuarioLogado.perfil == 'ADMIN') {
        this.router.navigateByUrl(`/admin/perfil/update/${this.usuarioLogado.id}`);
      } else if (this.usuarioLogado.perfil == 'USER') {
        this.router.navigateByUrl(`/user/perfil/update/${this.usuarioLogado.id}`);
      }
    } else {
      console.error('ID do usuário não disponível.');
    }
  }

  inserirImagem() {
    // Lógica para inserir a imagem
    console.log('Inserir imagem!');
  }

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  editarImagem() {
    this.editandoFoto = true;
  }

  verificarSenha() {

    if (this.formGroupSenhaAtual.valid) {

      console.log(this.formGroupSenhaAtual.value.senhaAtual);

      const formSenha = this.formGroupSenhaAtual.value;

      this.usuarioService.verificaSenha(this.usuarioLogado?.id, formSenha.senhaAtual).subscribe({
        next: (isValid) => {

          if (isValid == false) {

            this.formGroupSenhaAtual.get('senhaAtual')?.setErrors({ apiError: "Senha inserida não corresponde a senha atual" });
          }

          console.log(isValid);
          this.editandoSenha = isValid;
        },
        error: (errorResponse) => {

          this.apiResponse = errorResponse.error;

          // Associar erros aos campos do formulário
          this.formGroupSenhaAtual.get('senhaAtual')?.setErrors({ apiError: this.getErrorMessage('senhaAtual') });
          console.log('Erro ao verificar senha' + JSON.stringify(errorResponse));
        }
      })
    }

    this.formGroupSenhaAtual = this.formBuilder.group({
      senhaAtual: ['', Validators.required],
    });
  }

  salvarNovaSenha() {

    if (this.formGroupSenhaNova.valid) {

      console.log(this.formGroupSenhaNova.value.senhaAtual);

      const formSenha = this.formGroupSenhaNova.value;

      this.usuarioService.atualizarSenha(this.usuarioLogado?.id, formSenha.senhaNova, formSenha.confirmarSenha).subscribe({
        next: (usuarioAtualizado) => {

          console.log(usuarioAtualizado);

          if (usuarioAtualizado == null) {

            this.formGroupSenhaNova.get('senhaNova')?.setErrors({ apiError: "As senhas inseridas não estão iguais" });
            this.formGroupSenhaNova.get('confirmarSenha')?.setErrors({ apiError: "As senhas inseridas não estão iguais" });
          }

          else {

            console.log('Senha do usuário atualizada com sucesso:', usuarioAtualizado);
            this.authService.updateUsuarioLogado(usuarioAtualizado);
            this.editandoSenha = false;

            this.formGroupSenhaNova = this.formBuilder.group({
              senhaNova: ['', Validators.required],
              confirmarSenha: ['', Validators.required]
            });
          }
        },
        error: (errorResponse) => {

          this.apiResponse = errorResponse.error;

          // Associar erros aos campos do formulário
          this.formGroupSenhaNova.get('senhaNova')?.setErrors({ apiError: this.getErrorMessage('senhaNova') });
          this.formGroupSenhaNova.get('confirmarSenha')?.setErrors({ apiError: this.getErrorMessage('confirmarSenha') });
          console.log('Erro ao atualizar senha' + JSON.stringify(errorResponse));
        }
      })
    }
  }

  terminarEdicao() {
    this.editandoSenha = false;
  }

  salvarEndereco() {
    if (this.formGroup.valid) {
      const novoEndereco = this.formGroup.value;

      if (this.usuarioLogado && this.usuarioLogado.id) {
        // novoEndereco.idUsuario = this.usuarioLogado.id; // Substitua 'idUsuario' pelo campo correto no seu modelo Endereco

        if (!novoEndereco.id) {
          this.usuarioService.salvarEndereco(novoEndereco, this.usuarioLogado.id).subscribe({
            next: (usuarioAtualizado) => {
              console.log('Endereço do usuário cadastrado com sucesso:', usuarioAtualizado);
              this.authService.updateUsuarioLogado(usuarioAtualizado);
            },
            error: (errorResponse) => {
              this.apiResponse = errorResponse.error;
              console.log('Erro ao cadastrar endereço:', errorResponse);
            }
          });
        } else {
          this.usuarioService.atualizarEndereco(this.usuarioLogado.id, novoEndereco).subscribe({
            next: (usuarioAtualizado) => {
              console.log('Endereço do usuário atualizado com sucesso:', usuarioAtualizado);
              this.authService.updateUsuarioLogado(usuarioAtualizado);
            },
            error: (errorResponse) => {
              this.apiResponse = errorResponse.error;
              console.log('Erro ao atualizar endereço:', errorResponse);
            }
          });
        }
      } else {
        console.error('ID do usuário não disponível.');
      }
    }

    this.cancelarEdicaoEndereco();
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }

  salvarImagem() {
    if (this.selectedFile) {
      // Chame seu serviço para fazer o upload da imagem
      this.usuarioService.uploadImagem(this.usuarioLogado!.id, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: (response) => {

            this.authService.updateUsuarioLogado(response);

            console.log(this.usuarioLogado?.nomeImagem);

            this.setUrlImage();

            // console.log("Até aqui chegaste?");
            // Lógica para exibir a imagem no perfil após o upload bem-sucedido
            // this.usuarioLogado!.nomeImagem = response.nomeImagem;  // Atualize conforme necessário

            // Navegue para a visualização do perfil ou faça alguma outra ação
            if (this.usuarioLogado?.perfil == 'ADMIN') {
              this.router.navigateByUrl('/admin/perfil/view');
            } else if (this.usuarioLogado?.perfil == 'USER') {
              this.router.navigateByUrl('/user/perfil/view');
            }
          },
          error: err => {
            console.log('Erro ao fazer o upload da imagem');
            // Trate o erro conforme necessário
          }
        });
    } else {
      // Lógica para lidar com o caso em que nenhuma imagem é selecionada
      console.log('Nenhuma imagem selecionada.');
    }

    // Restaure o estado inicial
    this.cancelarEdicaoFoto();
  }

  cancelarEdicaoFoto() {
    this.editandoFoto = false;
    this.selectedFile = null;
    this.fileName = '';
    this.imagePreview = null;
  }

  carregarImagemSelecionada(event: any) {

    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onMouseOver() {
    // Adicionar lógica para escurecer gradualmente quando o mouse passar sobre a imagem
    this.renderer.setStyle(this.el.nativeElement.querySelector('img'), 'filter', 'brightness(70%)');
  }

  onMouseOut() {
    // Remover o efeito de escurecimento quando o mouse sair da imagem
    this.renderer.removeStyle(this.el.nativeElement.querySelector('img'), 'filter');
  }


  @ViewChild('fileInput') fileInput!: ElementRef;
  selecionarImagem() {
    this.fileInput.nativeElement.click();
  }

}
