import { Fabricante } from "./fabricante.model";

export class Plataforma {

  id!: number;
  nome!: string;
  descricao!: string;
  anoLancamento!: Date;
  fabricante!: Fabricante;
}
