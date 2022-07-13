import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";


const routes :Routes = [
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},

];

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class AuthRoutingModule{}