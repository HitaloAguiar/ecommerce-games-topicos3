import { CartaoCredito } from "./cartao-credito.model";
import { Endereco } from "./endereco.model";

export class Usuario {

  id!: number;
  nome!: string;
  cpf!: string;
  email!: string;
  login!: string;
  senha!: string;
  perfil!: string;
  telefone!: string;
  endereco!: Endereco;
  nomeImagem!: string;
}
