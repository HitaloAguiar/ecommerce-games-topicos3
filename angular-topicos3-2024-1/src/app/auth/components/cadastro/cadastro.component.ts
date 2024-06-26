import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

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
      perfil:"USER",
      telefone:[(usuario && usuario.telefone)? usuario.telefone : '', Validators.required],
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoUsuario = this.formGroup.value;
      if (novoUsuario.id == null) {

        console.log(novoUsuario);

        this.usuarioService.save(novoUsuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/auth/login');
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
            this.formGroup.get('telefone')?.setErrors({ apiError: this.getErrorMessage('telefone') });

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
            this.formGroup.get('telefone')?.setErrors({ apiError: this.getErrorMessage('telefone') });

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
