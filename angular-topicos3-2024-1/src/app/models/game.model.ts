import { Developer } from "./developer.model";
import { Genero } from "./genero.model";
import { Plataforma } from "./plataforma.model";

export class Game {

  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  nomeImagem!: string;
  nomeImagem1!: string;
  nomeImagem2!: string;
  nomeImagem3!: string;
  anoLancamento!: Date;
  developer!: Developer;
  generos!: Genero[];
  plataformas!: Plataforma[];
}
