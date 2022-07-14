import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


import { PagesComponent } from './pages.component';
import { ChildRoutesModule } from './child-routes.module';
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
      ChildRoutesModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatButtonModule
    ],
    providers: [],
    exports:[
        PagesComponent,
        DashboardComponent
        
    ]
   
  })

  export class PageModule { }