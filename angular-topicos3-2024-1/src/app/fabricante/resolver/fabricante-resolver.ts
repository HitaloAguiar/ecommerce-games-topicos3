import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Fabricante } from "src/app/models/fabricante.model";
import { FabricanteService } from "src/app/services/fabricante.service";

export const fabricanteResolver: ResolveFn<Fabricante> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    return inject(FabricanteService).findById(route.paramMap.get('id')!)
  }
