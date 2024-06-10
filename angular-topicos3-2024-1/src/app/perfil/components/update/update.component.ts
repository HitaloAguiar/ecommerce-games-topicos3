import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage-service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  formGroup: FormGroup;
  private subscription = new Subscription();
  apiResponse: any = null;
  usuarioLogado: Usuario | null = null;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute) {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    this.formGroup = formBuilder.group({
      id: [(usuario && usuario.id) ? usuario.id : null],
      nome: [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      cpf: [(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
      email: [(usuario && usuario.email) ? usuario.email : '', Validators.required],
      login: [(usuario && usuario.login) ? usuario.login : '', Validators.required],
      perfil: [(usuario && usuario.perfil) ? usuario.perfil : '', Validators.required],
      telefones: (usuario && usuario.telefones) ? this.formBuilder.array(usuario.telefones) : this.formBuilder.array([])
    })
  }

  ngOnInit(): void {

    console.log("Calling ngOnInit");
    this.obterUsuarioLogado();
  }

  obterUsuarioLogado() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  get telefones() {
    return this.formGroup.get('telefones') as FormArray;
  }

  adicionarTelefone() {
    this.telefones.push(this.formBuilder.control(''));
  }

  removerTelefone(index: number) {
    this.telefones.removeAt(index);
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoUsuario = this.formGroup.value;

      this.usuarioService.update(novoUsuario).subscribe({
        next: (usuarioCadastrado) => {
          if (this.usuarioLogado?.perfil == 'ADMIN') {
            this.router.navigateByUrl('/admin/perfil/view');
          } else if (this.usuarioLogado?.perfil == 'USER') {
            this.router.navigateByUrl('/user/perfil/view');
          }
          this.authService.updateUsuarioLogado(usuarioCadastrado);
        },
        error: (errorResponse) => {

          this.apiResponse = errorResponse.error;

          // Associar erros aos campos do formulário
          this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
          this.formGroup.get('cpf')?.setErrors({ apiError: this.getErrorMessage('cpf') });
          this.formGroup.get('email')?.setErrors({ apiError: this.getErrorMessage('email') });
          this.formGroup.get('login')?.setErrors({ apiError: this.getErrorMessage('login') });
          this.formGroup.get('senha')?.setErrors({ apiError: this.getErrorMessage('senha') });
          this.formGroup.get('perfil')?.setErrors({ apiError: this.getErrorMessage('perfil') });
          this.formGroup.get('telefones')?.setErrors({ apiError: this.getErrorMessage('telefones') });

          console.log('Erro ao atualizar' + JSON.stringify(errorResponse));
        }
      })
    }
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }

  voltar() {
    if (this.usuarioLogado?.perfil == 'ADMIN') {
      this.router.navigateByUrl('/admin/perfil/view');
    } else if (this.usuarioLogado?.perfil == 'USER') {
      this.router.navigateByUrl('/user/perfil/view');
    }
  }
}
