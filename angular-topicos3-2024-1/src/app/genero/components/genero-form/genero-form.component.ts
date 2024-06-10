import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/models/genero.model';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-genero-form',
  templateUrl: './genero-form.component.html',
  styleUrls: ['./genero-form.component.css']
})
export class GeneroFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private generoService: GeneroService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const genero: Genero = this.activatedRoute.snapshot.data['genero'];
    this.formGroup = formBuilder.group({
      id:[(genero && genero.id)? genero.id : null],
      nome:[(genero && genero.nome)? genero.nome : '', Validators.required],
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoGenero = this.formGroup.value;
      if (novoGenero.id == null) {

        this.generoService.save(novoGenero).subscribe({
          next: (generoCadastrado) => {
            this.router.navigateByUrl('/admin/generos/list');
          },
          error: (errorResponse) => {
            // Processar erros da API
           this.apiResponse = errorResponse.error;

           // Associar erros aos campos do formulário
           this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      }
      else {

        this.generoService.update(novoGenero).subscribe({
          next: (generoCadastrado) => {
            this.router.navigateByUrl('/admin/generos/list');
          },
          error: (errorResponse) => {

            // Processar erros da API
            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
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
