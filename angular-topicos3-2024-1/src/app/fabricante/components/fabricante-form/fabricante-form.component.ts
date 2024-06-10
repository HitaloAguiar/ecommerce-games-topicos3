import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fabricante } from 'src/app/models/fabricante.model';
import { FabricanteService } from 'src/app/services/fabricante.service';

@Component({
  selector: 'app-fabricante-form',
  templateUrl: './fabricante-form.component.html',
  styleUrls: ['./fabricante-form.component.css']
})
export class FabricanteFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private fabricanteService: FabricanteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {

    const fabricante: Fabricante = this.activatedRoute.snapshot.data['fabricante'];
    this.formGroup = formBuilder.group({
      id:[(fabricante && fabricante.id)? fabricante.id : null],
      nome:[(fabricante && fabricante.nome)? fabricante.nome : '', Validators.required],
      anoFundacao:[(fabricante && fabricante.anoFundacao)? fabricante.anoFundacao : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoFabricante = this.formGroup.value;
      if (novoFabricante.id == null) {

        this.fabricanteService.save(novoFabricante).subscribe({
          next: (fabricanteCadastrado) => {
            this.router.navigateByUrl('/admin/fabricantes/list');
          },
          error: (errorResponse) => {

            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('anoFundacao')?.setErrors({ apiError: this.getErrorMessage('anoFundacao') });

            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      }
      else {

        this.fabricanteService.update(novoFabricante).subscribe({
          next: (fabricanteCadastrado) => {
            this.router.navigateByUrl('/admin/fabricantes/list');
          },
          error: (errorResponse) => {

            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('anoFundacao')?.setErrors({ apiError: this.getErrorMessage('anoFundacao') });

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
