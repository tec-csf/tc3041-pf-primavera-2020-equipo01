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
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { environment } from 'src/environments/environment';
import { MapComponent } from './map/map.component';
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';
import { HomeComponent } from './home/home.component';
// QR code
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';  
import { QRCodeModule } from "angularx-qrcode";
import { QrComponent } from './qr/qr.component';

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
    LoginComponent,
    MapComponent,
    QrComponent,
    ChartsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgQRCodeReaderModule, 
    QRCodeModule,
    ToastrModule.forRoot(),
    // JWT set the JWT module with the local storage token
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        }
      }
    }),
    //Google mpas
    AgmCoreModule.forRoot({
      apiKey: environment.maps
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
