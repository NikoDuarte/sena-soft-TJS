import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// Componentes
import { HomeComponent } from './home/home.component';
import { UnirseSalaComponent } from './unirse-sala/unirse-sala.component';
import { AppRoutingModule } from '../app-routing.module';
import { SalaEsperaComponent } from './sala-espera/sala-espera.component';
import { TableroComponent } from './tablero/tablero.component';
import { AnimacionComponent } from './animacion/animacion.component';



@NgModule({
  declarations: [
    HomeComponent,
    UnirseSalaComponent,
    SalaEsperaComponent,
    TableroComponent,
    AnimacionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule
  ]
})
export class ComponentsModule { }
