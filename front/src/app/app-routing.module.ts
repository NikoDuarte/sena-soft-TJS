import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GanadoresComponent } from './components/ganadores/ganadores.component';
import { HomeComponent } from './components/home/home.component';
import { SalaEsperaComponent } from './components/sala-espera/sala-espera.component';
import { UnirseSalaComponent } from './components/unirse-sala/unirse-sala.component';
import { SalaGuardsGuard } from './guards/sala-guards.guard';
import { PagesRoutingModule } from './pages/pages.routes';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'unirse', component: UnirseSalaComponent },
  { path: 'sala', component: SalaEsperaComponent, canActivate: [SalaGuardsGuard] },
  { path: 'ganador', component: GanadoresComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
