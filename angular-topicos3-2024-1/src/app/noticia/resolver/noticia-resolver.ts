import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Noticia } from "src/app/models/noticia.model";
import { NoticiaService } from "src/app/services/noticia.service";

export const noticiaResolver: ResolveFn<Noticia> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    return inject(NoticiaService).findById(route.paramMap.get('id')!)
  }
