import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageRoutes } from './page.routing';
import { DoctorsComponent } from './doctors/doctors.component';
import { LoginComponent } from './login/login.component';
import { PetsComponent } from './pets/pets.component';
import { ParentsComponent } from './parents/parents.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { CreateParentsComponent } from './parents/create/create.parents.component';
import { CreatePetsComponent } from './pets/create/create.pets.component';
import { CreateDiagnosisComponent } from './diagnosis/create/create.diagnosis.component';
import { CreateSymptomsComponent } from './symptoms/create/create.symptoms.component';
import { CreateDoctorsComponent } from './doctors/create/create.doctors.component';
import { EditSymptomsComponent } from './symptoms/edit/edit.symptoms.component';
import { EditParentsComponent } from './parents/edit/edit.parents.component';
import { EditPetsComponent } from './pets/edit/edit.pets.component';
import { EditDoctorsComponent } from './doctors/edit/edit.doctors.component';
import { CreateAppointmentComponent } from './appointment/create/create.appointment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditAppointmentComponent } from './appointment/edit/edit.appointment.component';
import { EditDiagnosisComponent } from './diagnosis/edit/edit.diagnosis.component';
import { ProductComponent } from './products/product.component';
import { CreateProductComponent } from './products/create/create.product.component';
import { EditProductComponent } from './products/edit/edit.product.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { CreateVaccineComponent } from './vaccine/create/create.vaccine.component';
import { EditVaccineComponent } from './vaccine/edit/edit.vaccine.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { CreateAdoptionComponent } from './adoption/create/create.adoption.component';
import { EditAdoptionComponent } from './adoption/edit/edit.adoption.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatDatepickerModule
  ],
  providers: [],
  declarations: [
    DoctorsComponent,
    LoginComponent,
    PetsComponent,
    ParentsComponent,
    AppointmentComponent,
    ProductComponent,
    DiagnosisComponent,
    SymptomsComponent,
    VaccineComponent,
    AdoptionComponent,
    CreateParentsComponent,
    CreatePetsComponent,
    CreateDiagnosisComponent,
    CreateSymptomsComponent,
    CreateDoctorsComponent,
    CreateProductComponent,
    CreateAppointmentComponent,
    CreateVaccineComponent,
    CreateAdoptionComponent,
    EditSymptomsComponent,
    EditParentsComponent,
    EditProductComponent,
    EditPetsComponent,
    EditDoctorsComponent,
    EditAppointmentComponent,
    EditDiagnosisComponent,
    EditVaccineComponent,
    EditAdoptionComponent

  ]
})
export class PageComponentsModule {}
