import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private estadoService: EstadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const estado: Estado = this.activatedRoute.snapshot.data['estado'];
    this.formGroup = formBuilder.group({
      id:[(estado && estado.id)? estado.id : null],
      nome:[(estado && estado.nome)? estado.nome : '', Validators.required],
      sigla:[(estado && estado.sigla)? estado.sigla : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoEstado = this.formGroup.value;
      if (novoEstado.id == null) {

        this.estadoService.save(novoEstado).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/admin/estados/list');
          },
          error: (errorResponse) => {
            // Processar erros da API
            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('sigla')?.setErrors({ apiError: this.getErrorMessage('sigla') });

            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      }
      else {

        this.estadoService.update(novoEstado).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/admin/estados/list');
          },
          error: (errorResponse) => {

            // Processar erros da API
            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('sigla')?.setErrors({ apiError: this.getErrorMessage('sigla') });
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
