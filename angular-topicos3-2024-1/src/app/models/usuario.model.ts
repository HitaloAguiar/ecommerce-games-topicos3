import { CartaoCredito } from "./cartao-credito.model";
import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";

export class Usuario {

  id!: number;
  nome!: string;
  cpf!: string;
  email!: string;
  login!: string;
  senha!: string;
  perfil!: string;
  telefones!: Telefone[];
  endereco!: Endereco;
  nomeImagem!: string;
  cartao!: CartaoCredito;
}
