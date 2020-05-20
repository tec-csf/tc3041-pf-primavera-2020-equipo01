import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCasesComponent } from './cases/all-cases/all-cases.component';
import { FormCasesComponent } from './cases/form-cases/form-cases.component';
import { AllBusinessesComponent } from './businesses/all-businesses/all-businesses.component';
import { FormBusinessesComponent } from './businesses/form-businesses/form-businesses.component';
import { AllLocationsComponent } from './locations/all-locations/all-locations.component';
import { FormLocationsComponent } from './locations/form-locations/form-locations.component';


const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "cases"},
  {path: "cases", component: AllCasesComponent},
  {path: "cases/add", component: FormCasesComponent},
  {path: "cases/edit/:id", component: FormCasesComponent},
  {path: "businesses", component: AllBusinessesComponent},
  {path: "businesses/add", component: FormBusinessesComponent},
  {path: "businesses/edit/:id", component: FormBusinessesComponent},
  {path: "locations", component: AllLocationsComponent},
  {path: "locations/add", component: FormLocationsComponent},
  {path: "locations/edit/:id", component: FormLocationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
