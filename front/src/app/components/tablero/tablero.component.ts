import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  nombre = '';
  modulo = '';
  error = '';

  public cards: any

  linea1: boolean = false;
  linea2: boolean = false;
  linea3: boolean = false;

  mensajes: any[] = [];

  ocultar: boolean = false;

  constructor( private apiservice: ApiService ) { }

  ngOnInit(): void {

    this.apiservice.getCarta()
                  .subscribe( ({data}: any) => {
                    const new_data = {
                      quien: data.filter((x: any) => x.type === 'quien'),
                      modulo: data.filter((x: any) => x.type === 'modulo'),
                      error: data.filter((x: any) => x.type === 'error')
                    }                    
                    this.cards = new_data
                  } )

    this.ocultarComponente();
  }

  mostrarNombre() {
    this.nombre = 'HOLA'
    this.linea1 = true;
  }

  mostrarModulo() {
    this.modulo = 'MUNDO'
    this.linea2 = true;
  }

  mostrarError() {
    this.error = 'XD'
    this.linea3 = true;
  }

  preguntarAcusar() {
    if (this.nombre !== '' && this.modulo !== '' && this.error !== '') {
      alert('Pregunta enviada');
      this.nombre = '';
      this.modulo = '';
      this.error = '';
      this.linea1 = false;
      this.linea2 = false;
      this.linea3 = false;
    } else {
      alert('Debes seleccionar las cartas antes de preguntar o acusar');
    }
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