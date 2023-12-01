import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DoctorComponent } from "../components/doctor/doctor.component";
import { MainPageComponent } from "../components/main-page/main-page.component";

const routes: Routes = [
  { path: "", component: MainPageComponent},
  { path: "home", component: MainPageComponent },
  { path: "doctors", component: DoctorComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
