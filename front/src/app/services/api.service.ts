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
    return String(localStorage.getItem('gub-token'))
  }

  get headers() {
    return {
      headers: {
        'gub-tok': this.token
      }
    }
  }

  //? -_ metodo que cargara las cartas de la api
  public getCarta(): Observable<Cartas>{
    const api: string = `${url_base}/cards/`
    return this.http.get<Cartas>(api);
  }

  //? -_ Metodo que creara la sala
  createSala(body: any) {
    const api: string = `${url_base}/sala`
      return this.http.post(api, body)
  }

  //? -_ Metodo que unira a una sala
  joinSala(body: any){
    // https://sena-nexus-back.herokuapp.com/soft/v1/api/sala/join
    const api: string = `${url_base}/sala/join`
      return this.http.post(api, body)
  }

  //? -_ Metodo que renovara el token
  renewToken() {
    const api: string = `${url_base}/sala/renew-token`
      return this.http.get(api, this.headers).pipe(
        map(
          ({data}: any) => {            
            localStorage.removeItem('gub-token')
            localStorage.setItem('gub-token', data)
            return true
          }
        ), catchError( err => {
          return of(false)
        })
      )
  }

  //? -_ Metodo que mostrara los jugadores conectados
  loadPlayersGame(code_game: string){
    //https://sena-nexus-back.herokuapp.com/soft/v1/api/sala/okd55
    const api: string = `${url_base}/sala/${code_game}`
      return this.http.get(api, this.headers)
  }

  //? -_ Metodo que realizara la pregunta
  questionGlobal(body_quest: any) {
    // https://sena-nexus-back.herokuapp.com/soft/v1/api/sala
    const api: string = `${url_base}/sala`
      return this.http.patch(api, body_quest, this.headers)
  }

  //? -_ Metodo que realizara una acusacion
  acussationGlobal(body: any) {
    // https://sena-nexus-back.herokuapp.com/soft/v1/api/sala/accusation
    const api: string = `${url_base}/sala/accusation`
      return this.http.patch(api, body, this.headers)
  }

  //? -_ Metodo que eliminara la sala
  exitSala(code: string){
    // https://sena-nexus-back.herokuapp.com/soft/v1/api/sala/6172cae4845cb911688780dc
    const api: string = `${url_base}/sala/${code}`
      return this.http.delete(api)
  }
}
