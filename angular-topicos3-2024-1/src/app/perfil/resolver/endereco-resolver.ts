import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Endereco } from "src/app/models/endereco.model";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";

export const enderecoResolver: ResolveFn<Endereco> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    return inject(UsuarioService).getEndereco(route.paramMap.get('id')!)
  }
