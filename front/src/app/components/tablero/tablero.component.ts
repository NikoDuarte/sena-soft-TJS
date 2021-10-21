import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  nombre = '';
  modulo = '';
  error = '';

  linea1: boolean = false;
  linea2: boolean = false;
  linea3: boolean = false;

  mensajes: any[] = [];

  ocultar: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.ocultarComponente();
  }

  mostrarNombre(){
    this.nombre = 'HOLA'
    this.linea1 = true;
  }

  mostrarModulo(){
    this.modulo = 'MUNDO'
    this.linea2 = true;
  }

  mostrarError(){
    this.error = 'XD'
    this.linea3 = true;
  }

  preguntarAcusar(){
    if(this.nombre !== '' && this.modulo !== '' && this.error !== ''){
      alert('Pregunta enviada');
    } else{
      alert('Debes seleccionar las cartas antes de preguntar o acusar');
    }
  }

  mostrarMensaje( mensaje: string ){
    this.mensajes.push(mensaje);
  }

  ocultarComponente(){
    setTimeout(() => {
      this.ocultar = true;
    }, 6000);
  }
}