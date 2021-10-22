import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { UnirseSalaComponent } from '../components/unirse-sala/unirse-sala.component';
import { TableroComponent } from '../components/tablero/tablero.component';
import { SalaGuardsGuard } from '../guards/sala-guards.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'unirse', component: UnirseSalaComponent },
    { path: 'tablero', component:  TableroComponent, canActivate: [SalaGuardsGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
