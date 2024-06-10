import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from 'src/app/models/noticia.model';
import { TopicoPrincipal } from 'src/app/models/topico-principal.enum';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticia-form',
  templateUrl: './noticia-form.component.html',
  styleUrls: ['./noticia-form.component.css']
})
export class NoticiaFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private noticiaService: NoticiaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {

    const noticia: Noticia = this.activatedRoute.snapshot.data['noticia'];
    this.formGroup = formBuilder.group({
      id:[(noticia && noticia.id)? noticia.id : null],
      titulo:[(noticia && noticia.titulo)? noticia.titulo : '', Validators.required],
      conteudo:[(noticia && noticia.conteudo)? noticia.conteudo : '', Validators.required],
      dataPublicacao:[(noticia && noticia.dataPublicacao)? noticia.dataPublicacao : '', Validators.required],
      autor:[(noticia && noticia.autor)? noticia.autor : '', Validators.required],
      topicoPrincipal:[(noticia && noticia.topicoPrincipal)? noticia.topicoPrincipal : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novaNoticia = this.formGroup.value;
      if (novaNoticia.id == null) {

        this.noticiaService.save(novaNoticia).subscribe({
          next: (noticiaCadastrado) => {
            this.router.navigateByUrl('/admin/noticias/list');
          },
          error: (errorResponse) => {

            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('titulo')?.setErrors({ apiError: this.getErrorMessage('titulo') });
            this.formGroup.get('dataPublicacao')?.setErrors({ apiError: this.getErrorMessage('dataPublicacao') });
            this.formGroup.get('autor')?.setErrors({ apiError: this.getErrorMessage('autor') });

            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      }
      else {

        this.noticiaService.update(novaNoticia).subscribe({
          next: (noticiaCadastrado) => {
            this.router.navigateByUrl('/admin/noticias/list');
          },
          error: (errorResponse) => {

            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('titulo')?.setErrors({ apiError: this.getErrorMessage('titulo') });
            this.formGroup.get('dataPublicacao')?.setErrors({ apiError: this.getErrorMessage('dataPublicacao') });
            this.formGroup.get('autor')?.setErrors({ apiError: this.getErrorMessage('autor') });

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
