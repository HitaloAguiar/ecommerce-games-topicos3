import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Plataforma } from "src/app/models/plataforma.model";
import { PlataformaService } from "src/app/services/plataforma.service";

export const plataformaResolver: ResolveFn<Plataforma> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    return inject(PlataformaService).findById(route.paramMap.get('id')!)
  }
