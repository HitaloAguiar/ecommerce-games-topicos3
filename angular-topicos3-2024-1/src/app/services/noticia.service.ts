import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.baseURL}/noticias`);
  }

  findAllPaginado(pagina: number, tamanhoPagina: number): Observable<Noticia[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Noticia[]>(`${this.baseURL}/noticias/paginado`, {params});
  }

  findById(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.baseURL}/noticias/${id}`);
  }

  save(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(`${this.baseURL}/noticias`, noticia);
  }

  update(noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.baseURL}/noticias/${noticia.id}`, noticia);
  }

  delete(noticia: Noticia): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/noticias/${noticia.id}`);
  }

  findByTitulo(titulo: string, pagina: number, tamanhoPagina: number): Observable<Noticia[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Noticia[]>(`${this.baseURL}/noticias/search/${titulo}`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/noticias/count`);
  }

  countByTitulo(titulo: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/noticias/search/${titulo}/count`);
  }
}
