import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage-service';
import { ItemCarrinho } from '../models/item-carrinho.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private baseURL: string =  'http://localhost:8080';

  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient) {
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

  adicionar(game: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;

    const itemExistente = carrinhoAtual.find(item => item.id === game.id);

    if (itemExistente) {
      itemExistente.quantidade += game.quantidade || 1;
    } else {
      carrinhoAtual.push({ ...game });
    }

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.map((itemCarrinho) => {
      if (itemCarrinho === item) {
        return { ...itemCarrinho, quantidade: itemCarrinho.quantidade - 1 };
      }
      return itemCarrinho;
    });

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  aumentarQuantidade(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.map((itemCarrinho) => {
      if (itemCarrinho === item) {
        return { ...itemCarrinho, quantidade: itemCarrinho.quantidade + 1 };
      }
      return itemCarrinho;
    });

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  removerTudo(): void {
    this.localStorageService.removeItem('carrinho');
    window.location.reload(); // reload na página
  }

  remover(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter(itemCarrinho => itemCarrinho !== item);

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  obter(): ItemCarrinho[] {
    return this.carrinhoSubject.value;

  }

  private atualizarArmazenamentoLocal(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinhoSubject.value));
  }


}
