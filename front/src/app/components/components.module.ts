import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { HomeComponent } from './home/home.component';
import { UnirseSalaComponent } from './unirse-sala/unirse-sala.component';
import { AppRoutingModule } from '../app-routing.module';
import { SalaEsperaComponent } from './sala-espera/sala-espera.component';


@NgModule({
  declarations: [
    HomeComponent,
    UnirseSalaComponent,
    SalaEsperaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
