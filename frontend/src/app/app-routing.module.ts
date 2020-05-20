import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCasesComponent } from './cases/all-cases/all-cases.component';
import { FormCasesComponent } from './cases/form-cases/form-cases.component';
import { AllBusinessesComponent } from './businesses/all-businesses/all-businesses.component';
import { FormBusinessesComponent } from './businesses/form-businesses/form-businesses.component';
import { AllLocationsComponent } from './locations/all-locations/all-locations.component';
import { FormLocationsComponent } from './locations/form-locations/form-locations.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "login"},
  {path: "login", component: LoginComponent},
  {path: "cases", component: AllCasesComponent , canActivate: [AuthGuard] },
  {path: "cases/add", component: FormCasesComponent , canActivate: [AuthGuard] },
  {path: "cases/edit/:id", component: FormCasesComponent , canActivate: [AuthGuard] },
  {path: "businesses", component: AllBusinessesComponent , canActivate: [AuthGuard] },
  {path: "businesses/add", component: FormBusinessesComponent , canActivate: [AuthGuard] },
  {path: "businesses/edit/:id", component: FormBusinessesComponent , canActivate: [AuthGuard] },
  {path: "locations", component: AllLocationsComponent , canActivate: [AuthGuard] },
  {path: "locations/add", component: FormLocationsComponent , canActivate: [AuthGuard] },
  {path: "locations/edit/:id", component: FormLocationsComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
