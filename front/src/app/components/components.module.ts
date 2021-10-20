import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { HomeComponent } from './home/home.component';
import { UnirseSalaComponent } from './unirse-sala/unirse-sala.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    UnirseSalaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
