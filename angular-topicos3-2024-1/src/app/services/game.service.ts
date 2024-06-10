import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseURL}/games`);
  }

  findAllPaginado(pagina: number, tamanhoPagina: number): Observable<Game[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Game[]>(`${this.baseURL}/games/paginado`, { params });
  }

  findById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseURL}/games/${id}`);
  }

  save(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseURL}/games`, game);
  }

  update(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseURL}/games/${game.id}`, game);
  }

  delete(game: Game): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/games/${game.id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Game[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Game[]>(`${this.baseURL}/games/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/games/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/games/search/${nome}/count`);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseURL}/games/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', nomeImagem);
    formData.append('imagem', imagem, imagem.name);

    return this.http.patch<Game>(`${this.baseURL}/games/image/upload`, formData);
  }

  gerarRelatorio(filtro: string): Observable<any> {

    let url;

    if (filtro == null) {

      url = `${this.baseURL}/games/relatorio`;
    }

    else {

      url = `${this.baseURL}/games/relatorio/${filtro}`;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Change Content-Type to application/json
      'Accept': 'application/pdf'
    });

    const options = {
      headers: headers,
      responseType: 'arraybuffer' as 'json'
    };

    return this.http.get(url, options);
  }
}
