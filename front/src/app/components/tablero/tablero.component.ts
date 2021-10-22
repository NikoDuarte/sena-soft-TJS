import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  public obj_quest: any
  public cards_player: any[] = JSON.parse(localStorage.getItem('cards-player') || '')
  public lists: any[] = JSON.parse(localStorage.getItem('list-cards-player') || '')
  public list: any = []
  public code: string = localStorage.getItem('code-game') || ''
  public cards: any

  linea1: boolean = false;
  linea2: boolean = false;
  linea3: boolean = false;

  mensajes: any[] = [];

  ocultar: boolean = false;

  constructor( 
    private apiservice: ApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.list = {
      quien: this.lists.filter((x: any) => x.id_card.type === 'quien'),
      modulo: this.lists.filter((x: any) => x.id_card.type === 'modulo'),
      error: this.lists.filter((x: any) => x.id_card.type === 'error')
    }
    this.ocultarComponente();
    setInterval(() => {
      if (localStorage.getItem('winner')) {
        const data = JSON.parse(localStorage.getItem('winner') || '')
        this.router.navigateByUrl(`/ganador?code=${this.code}`)
      }
    }, 25000)
  }

  mostrarNombre(name: string, id: string) {
    this.obj_quest = {
      ...this.obj_quest,
      quien: {name, id}
    }
    this.linea1 = true;
  }

  mostrarModulo(name: string, id: string) {
    this.obj_quest = {
      ...this.obj_quest,
      modulo: {name, id}
    }
    this.linea2 = true;
  }

  mostrarError(name: string, id: string) {
    this.obj_quest = {
      ...this.obj_quest,
      error: {name, id}
    }
    this.linea3 = true;
  }

  preguntar() {
    const body = {
      question: {
        quien: this.obj_quest.quien.id,
        modulo: this.obj_quest.modulo.id,
        error: this.obj_quest.error.id
      }
    }    
    this.apiservice.questionGlobal(body).subscribe(
      ({data, msg}: any) => {        
        localStorage.setItem('list-cards-player', JSON.stringify(data.list))
        this.lists = JSON.parse(localStorage.getItem('list-cards-player') || '')
        this.list = {
          quien: this.lists.filter((x: any) => x.id_card.type === 'quien'),
          modulo: this.lists.filter((x: any) => x.id_card.type === 'modulo'),
          error: this.lists.filter((x: any) => x.id_card.type === 'error')
        }
        Swal.fire('Exito', msg, 'success')
      }
    )
  }

  acusar() {
    const body = {
      accusation: {
        quien: this.obj_quest.quien.id,
        modulo: this.obj_quest.modulo.id,
        error: this.obj_quest.error.id
      }
    }
    this.apiservice.acussationGlobal(body).subscribe(
      ({data, msg}: any) => {
        localStorage.setItem('winner', JSON.stringify(data))
        Swal.fire('Exito', msg, 'success')
        if (data.winner_or_accusation.correct_accusation.id_user_win) {
          this.code
          this.router.navigateByUrl(`/ganador?code=${this.code}`)
        }
      }
    )
  }

  mostrarMensaje(mensaje: string) {
    this.mensajes.push(mensaje);
  }

  ocultarComponente() {
    setTimeout(() => {
      this.ocultar = true;
    }, 6000);
  }
}