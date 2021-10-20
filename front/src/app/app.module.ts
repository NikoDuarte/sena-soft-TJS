import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Rutas
import { app_routing } from './app.routes';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { UnirseSalaComponent } from './components/unirse-sala/unirse-sala.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UnirseSalaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
