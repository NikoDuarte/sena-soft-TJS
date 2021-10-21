import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SalaGuardsGuard implements CanActivate {

  constructor(
    private api_service : ApiService,
    private router : Router
  ){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.api_service.renewToken().pipe(
        tap( isAuth => {
          if(!isAuth) this.router.navigateByUrl('/home')
        } )
      )
  }
  
}
