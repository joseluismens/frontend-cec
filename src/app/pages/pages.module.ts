import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";


import { PagesComponent } from './pages.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChildRoutesModule } from './child-routes.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
     
      PagesComponent,
      DashboardComponent
    ],
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule,
      FormsModule,
      ChildRoutesModule
    ],
    providers: [],
    exports:[
        PagesComponent,
        DashboardComponent
        
    ]
   
  })

  export class PageModule { }