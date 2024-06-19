import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent {

  formGroup: FormGroup;
  apiResponse: any = null;

  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) {

    const game: Game = this.activatedRoute.snapshot.data['game'];
    this.formGroup = formBuilder.group({
      id:[(game && game.id)? game.id : null],
      nome:[(game && game.nome)? game.nome : '', Validators.required],
      preco:[(game && game.preco)? game.preco : '', Validators.required],
      descricao:[(game && game.descricao)? game.descricao : '', Validators.required],
      developer:[(game && game.developer)? game.developer : '', Validators.required],
      genero:[(game && game.genero)? game.genero : '', Validators.required],
      plataforma:[(game && game.plataforma)? game.plataforma : '', Validators.required]
    })

    if (game && game.nomeImagem) {
      this.imagePreview = this.gameService.getUrlImagem(game.nomeImagem);
      this.fileName = game.nomeImagem;
    }
  }

  ngOnInit(): void {
    
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoGame = this.formGroup.value;
      if (novoGame.id == null) {

        this.gameService.save(novoGame).subscribe({
          next: (gameCadastrado) => {
            this.uploadImage(gameCadastrado.id);
          },
          error: (errorResponse) => {

            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('develope')?.setErrors({ apiError: this.getErrorMessage('developer') });
            this.formGroup.get('genero')?.setErrors({ apiError: this.getErrorMessage('genero') });
            this.formGroup.get('plataforma')?.setErrors({ apiError: this.getErrorMessage('plataforma') });
            this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });

            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      }
      else {

        this.gameService.update(novoGame).subscribe({
          next: (gameCadastrado) => {
            this.uploadImage(gameCadastrado.id);
          },
          error: (errorResponse) => {

            this.apiResponse = errorResponse.error;

            // Associar erros aos campos do formulário
            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('developer')?.setErrors({ apiError: this.getErrorMessage('developer') });
            this.formGroup.get('genero')?.setErrors({ apiError: this.getErrorMessage('generos') });
            this.formGroup.get('plataforma')?.setErrors({ apiError: this.getErrorMessage('plataformas') });
            this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });

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

  private uploadImage(gameId: number) {

    if (this.selectedFile) {
      this.gameService.uploadImagem(gameId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/games/list');
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      })
    } else {
      this.router.navigateByUrl('/admin/games/list');
    }
  }
}
