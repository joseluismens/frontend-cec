
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";

import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";

const routes :Routes = [
    { 
        path:'dashboard', 
        component:PagesComponent,
        canActivate:[AuthGuard],
        loadChildren: ()=>import('./child-routes.module').then(m=>m.ChildRoutesModule)
    }
];

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class PagesRoutingModule{}