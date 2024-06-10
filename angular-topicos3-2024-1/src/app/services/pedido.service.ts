import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';
import { ItemCarrinho } from '../models/item-carrinho.interface';
import { Endereco } from '../models/endereco.model';
import { CartaoCredito } from '../models/cartao-credito.model';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  save(carrinho: ItemCarrinho[], endereco: Endereco | undefined, pagamento: number, cartaoCredito: CartaoCredito): Observable<any> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idGame: item.id
    }));

    const enderecoDTO = {

      logradouro: endereco?.logradouro,
      bairro: endereco?.bairro,
      numero: endereco?.numero,
      complemento: endereco?.complemento,
      cep: endereco?.cep,
      cidade: endereco?.cidade.id
    }

    let cartaoCreditoDTO = null;

    console.log(cartaoCredito);

    if (cartaoCredito != null) {

      cartaoCreditoDTO = {

        numeroCartao: cartaoCredito.numeroCartao,
        nomeImpressoCartao: cartaoCredito.nomeImpressoCartao,
        dataValidade: cartaoCredito.dataValidade,
        codigoSeguranca: cartaoCredito.codigoSeguranca,
        bandeiraCartao: cartaoCredito.bandeiraCartao
      }
    }

    const params = {
      enderecoDTO: enderecoDTO,
      pagamento: pagamento,
      cartaoCreditoDTO: cartaoCreditoDTO,
      itens: itens
    };

    return this.http.post<any>(`${this.baseURL}/pedidos`, params);
  }

  findAll(login: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/pedidos/${login}`);
}
}
