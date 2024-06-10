import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios`);
  }

  findAllPaginado(pagina: number, tamanhoPagina: number): Observable<Usuario[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios/paginado`, {params});
  }

  findById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuarios/${id}`);
  }

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseURL}/usuarios`, usuario);
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseURL}/usuarios/${usuario.id}`, usuario);
  }

  delete(usuario: Usuario): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/usuarios/${usuario.id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Usuario[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios/search/${nome}`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/usuarios/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/usuarios/search/${nome}/count`);
  }

  getEndereco(idUsuario: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseURL}/usuarios/endereco/${idUsuario}`);
  }

  salvarEndereco(endereco: Endereco, idUsuario: number): Observable<any> {
    console.log(endereco);
    console.log(idUsuario);
    return this.http.patch(`${this.baseURL}/usuarios/endereco/insert/${idUsuario}`, endereco);
  }

  atualizarEndereco(idUsuario: number, endereco: Endereco): Observable<any> {
    return this.http.patch(`${this.baseURL}/usuarios/endereco/update/${idUsuario}`, endereco);
  }

  atualizarSenha(idUsuario: number | undefined, senhaNova: string, confirmarSenha: string): Observable<any> {

    const params = {

      novaSenha: senhaNova,
      confirmarNovaSenha: confirmarSenha
    }

    return this.http.patch(`${this.baseURL}/usuarios/update/senha/${idUsuario}`, params);
  }

  getUrlImagem(nomeImagem: string | undefined): string {
    return `${this.baseURL}/usuarios/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', nomeImagem);
    formData.append('imagem', imagem, imagem.name);

    return this.http.patch<Usuario>(`${this.baseURL}/usuarios/image/upload`, formData);
  }

  verificaSenha(idUsuario: number | undefined, senha: string): Observable<boolean> {

    return this.http.get<boolean>(`${this.baseURL}/usuarios/verifica/${senha}/${idUsuario}`);
  }

  getCartao(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/usuarios/cartao/${id}`);
  }

  insertCartao(id: number, cartaoDTO: any): Observable<any> {
    return this.http.post(`${this.baseURL}/usuarios/cartao/insert/${id}`, cartaoDTO);
  }

  deleteCartao(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/usuarios/cartao/delete/${id}`);
  }
}
