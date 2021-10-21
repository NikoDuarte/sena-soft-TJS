import { Injectable } from '@angular/core';
import { Cartas } from '../models/cartas';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

const url_base: string = environment.url_conect

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private carta: Cartas = { _id: "", name_card: "", img: "", type: "" }
  //private urlApiCartas = "/cards/";

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('gub-token') || ''
  }

  get headers() {
    return {
      headers: {
        'gub-tok': this.token
      }
    }
  }

  public getCarta(): Observable<Cartas>{
    const api: string = `${url_base}/cards/`
    return this.http.get<Cartas>(api);
  }

  createSala(body: any) {
    const api: string = `${url_base}/sala`
      return this.http.post(api, body)
  }

  renewToken() {
    const api: string = `${url_base}/sala/renew-token`
      return this.http.get(api, this.headers).pipe(
        map(
          (x: any) => {
            localStorage.removeItem('gub-token')
            localStorage.setItem('gub-token', x)
            return true
          }
        ), catchError( err => {
          return of(false)
        })
      )
  }








  // Api Sala

  // public getData(): Observable<Cartas>{
  //   return this.http.get<Cartas>(this.data);
  // }
}
