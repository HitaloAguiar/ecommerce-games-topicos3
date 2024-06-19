import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private baseURL: string =  'http://localhost:7036/api/Cidade';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.baseURL}`);
  }

  findById(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.baseURL}/${id}`);
  }

  save(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(`${this.baseURL}`, cidade);
  }

  update(cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.baseURL}/${cidade.id}`, cidade);
  }

  delete(cidade: Cidade): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${cidade.id}`);
  }

//  count(): Observable<number> {
//    return this.http.get<number>(`${this.baseURL}/cidades/count`);
//  }

//  countByNome(nome: string): Observable<number> {
//    return this.http.get<number>(`${this.baseURL}/cidades/search/${nome}/count`);
//  }
}
