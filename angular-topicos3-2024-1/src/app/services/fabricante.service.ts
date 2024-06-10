import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from '../models/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes`);
  }

  findAllPaginado(pagina: number, tamanhoPagina: number): Observable<Fabricante[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes/paginado`, {params});
  }

  findById(id: string): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.baseURL}/fabricantes/${id}`);
  }

  save(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.baseURL}/fabricantes`, fabricante);
  }

  update(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.put<Fabricante>(`${this.baseURL}/fabricantes/${fabricante.id}`, fabricante);
  }

  delete(fabricante: Fabricante): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/fabricantes/${fabricante.id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Fabricante[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes/search/${nome}`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/fabricantes/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/fabricantes/search/${nome}/count`);
  }
}
