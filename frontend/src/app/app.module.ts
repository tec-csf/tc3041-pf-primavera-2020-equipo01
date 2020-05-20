import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AllCasesComponent } from './cases/all-cases/all-cases.component';
import { FormCasesComponent } from './cases/form-cases/form-cases.component';
import { AllBusinessesComponent } from './businesses/all-businesses/all-businesses.component';
import { FormBusinessesComponent } from './businesses/form-businesses/form-businesses.component';
import { FormLocationsComponent } from './locations/form-locations/form-locations.component';
import { AllLocationsComponent } from './locations/all-locations/all-locations.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllCasesComponent,
    FormCasesComponent,
    AllBusinessesComponent,
    FormBusinessesComponent,
    FormLocationsComponent,
    AllLocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
