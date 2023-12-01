import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorComponent } from "./components/doctor/doctor.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ModifyFormComponent } from './components/modify-form/modify-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { AddFormComponent } from './components/add-form/add-form.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    NavbarComponent,
    MainPageComponent,
    ConfirmationDialogComponent,
    ModifyFormComponent,
    AddFormComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [CommunicationService],
  entryComponents: [ModifyFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
