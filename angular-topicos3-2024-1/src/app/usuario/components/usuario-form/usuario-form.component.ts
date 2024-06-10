import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Telefone } from 'src/app/models/telefone.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    this.formGroup = formBuilder.group({
      id:[(usuario && usuario.id)? usuario.id : null],
      nome:[(usuario && usuario.nome)? usuario.nome : '', Validators.required],
      cpf:[(usuario && usuario.cpf)? usuario.cpf : '', Validators.required],
      email:[(usuario && usuario.email)? usuario.email : '', Validators.required],
      login:[(usuario && usuario.login)? usuario.login : '', Validators.required],
      senha:[(usuario && usuario.senha)? usuario.senha : '', Validators.required],
      perfil:[(usuario && usuario.perfil)? usuario.perfil : '', Validators.required],
      telefones: (usuario && usuario.telefones)? this.formBuilder.array(usuario.telefones) : this.formBuilder.array([])
    })
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
      if (novoUsuario.id == null) {

        this.usuarioService.save(novoUsuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/admin/usuarios/list');
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

            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      }
      else {

        this.usuarioService.update(novoUsuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/admin/usuarios/list');
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
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }
}
