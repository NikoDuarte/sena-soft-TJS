import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UnirseSalaComponent } from "./components/unirse-sala/unirse-sala.component";

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'unirse', component: UnirseSalaComponent }
];

export const app_routing = RouterModule.forRoot(ROUTES);