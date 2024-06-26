import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private baseURL: string =  'https://localhost:7036/api/Estado';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseURL}`);
  }

//  findAllPaginado(pagina: number, tamanhoPagina: number): Observable<Estado[]> {
//    const params = {
//      page: pagina.toString(),
//      pageSize: tamanhoPagina.toString()
//    }
//    return this.http.get<Estado[]>(`${this.baseURL}/estados/paginado`, {params});
//  }

  findById(id: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.baseURL}/${id}`);
  }

  save(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(`${this.baseURL}`, estado);
  }

  update(estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.baseURL}/${estado.id}`, estado);
  }

  delete(estado: Estado): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${estado.id}`);
  }

//  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Estado[]> {
//    const params = {
//      page: pagina.toString(),
//      pageSize: tamanhoPagina.toString()
//    }
//    return this.http.get<Estado[]>(`${this.baseURL}/estados/search/${nome}`, {params});
//  }

//  count(): Observable<number> {
//    return this.http.get<number>(`${this.baseURL}/estados/count`);
//  }

//  countByNome(nome: string): Observable<number> {
//    return this.http.get<number>(`${this.baseURL}/estados/search/${nome}/count`);
//  }
}
