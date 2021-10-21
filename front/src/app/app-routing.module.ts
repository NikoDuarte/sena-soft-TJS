import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimacionComponent } from './components/animacion/animacion.component';
import { HomeComponent } from './components/home/home.component';
import { UnirseSalaComponent } from './components/unirse-sala/unirse-sala.component';
import { PagesRoutingModule } from './pages/pages.routes';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'unirse', component: UnirseSalaComponent },
  { path: 'barajando', component: AnimacionComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
