import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  tableColumns: string[] = ['id-column', 'nome-column', 'cpf-column', 'email-column', 'login-column', 'telefones-column', 'perfil-column', 'acoes-column'];
  usuarios: Usuario[] = [];

  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private usuarioService: UsuarioService, private customPaginatorIntl: CustomPaginatorIntl) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl = this.customPaginatorIntl; // Configuração da internacionalização
    }
  }

  ngOnInit(): void {

    this.carregarUsuarios();
    this.carregarTotalRegistros();
  }

  carregarUsuarios() {

    // se existe dados no filtro
    if (this.filtro) {
      this.usuarioService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.usuarios = data;
      });
    } else {
      // buscando todos os usuarios
      this.usuarioService.findAll().subscribe(data => {
        this.usuarios = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.usuarioService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.usuarioService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  excluir(usuario: Usuario) {

      if (usuario.id != null) {

        this.usuarioService.delete(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.ngOnInit();
          },
          error: (err) => {
            console.log('Erro ao excluir' + JSON.stringify(err));
          }
        })
      }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarUsuarios();
  }

  aplicarFiltro() {
    this.carregarUsuarios();
    this.carregarTotalRegistros();
  }
}
