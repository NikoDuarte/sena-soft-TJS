import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { HomeComponent } from './home/home.component';
import { UnirseSalaComponent } from './unirse-sala/unirse-sala.component';
import { AppRoutingModule } from '../app-routing.module';
import { SalaEsperaComponent } from './sala-espera/sala-espera.component';
import { TableroComponent } from './tablero/tablero.component';
import { AnimacionComponent } from './animacion/animacion.component';
import { GanadoresComponent } from './ganadores/ganadores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    UnirseSalaComponent,
    SalaEsperaComponent,
    TableroComponent,
    AnimacionComponent,
    GanadoresComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
