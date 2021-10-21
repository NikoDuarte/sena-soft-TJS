import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// Componentes
import { HomeComponent } from './home/home.component';
import { UnirseSalaComponent } from './unirse-sala/unirse-sala.component';
import { AppRoutingModule } from '../app-routing.module';
import { SalaEsperaComponent } from './sala-espera/sala-espera.component';
<<<<<<< HEAD
import { TableroComponent } from './tablero/tablero.component';

=======
import { AnimacionComponent } from './animacion/animacion.component';
>>>>>>> 73cc3fa6cfe2b59a94ad7dcaef185030587316db


@NgModule({
  declarations: [
    HomeComponent,
    UnirseSalaComponent,
    SalaEsperaComponent,
<<<<<<< HEAD
    TableroComponent
=======
    AnimacionComponent
>>>>>>> 73cc3fa6cfe2b59a94ad7dcaef185030587316db
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule
  ]
})
export class ComponentsModule { }
