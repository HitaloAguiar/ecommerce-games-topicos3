import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer } from 'src/app/models/developer.model';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
  selector: 'app-developer-form',
  templateUrl: './developer-form.component.html',
  styleUrls: ['./developer-form.component.css']
})
export class DeveloperFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private developerService: DeveloperService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {

    const developer: Developer = this.activatedRoute.snapshot.data['developer'];
    this.formGroup = formBuilder.group({
      id:[(developer && developer.id)? developer.id : null],
      nome:[(developer && developer.nome)? developer.nome : '', Validators.required],
      anoFundacao:[(developer && developer.anoFundacao)? developer.anoFundacao : '', Validators.required],
      classificacao:[(developer && developer.classificacao)? developer.classificacao : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoDeveloper = this.formGroup.value;
      if (novoDeveloper.id == null) {

        this.developerService.save(novoDeveloper).subscribe({
          next: (developerCadastrado) => {
            this.router.navigateByUrl('/admin/developers/list');
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

        this.developerService.update(novoDeveloper).subscribe({
          next: (developerCadastrado) => {
            this.router.navigateByUrl('/admin/developers/list');
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
