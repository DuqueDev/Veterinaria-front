import { Routes } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { LoginComponent } from './login/login.component';
import { ParentsComponent } from './parents/parents.component';
import { PetsComponent } from './pets/pets.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { ProductComponent } from './products/product.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { AdoptionComponent } from './adoption/adoption.component';


export const PageRoutes: Routes = [
  {
    path: 'doctors',
    component: DoctorsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pet',
    component: PetsComponent
  },
  {
    path: 'parents',
    component: ParentsComponent
  },

  {
    path: 'appointment',
    component: AppointmentComponent
  },

  {
    path: 'diagnosis',
    component: DiagnosisComponent
  },

  {
    path: 'symptoms',
    component: SymptomsComponent
  },

  {
    path: 'product',
    component: ProductComponent
  },

  {
    path: 'vaccine',
    component: VaccineComponent
  },

  {
    path: 'adoption',
    component: AdoptionComponent
  },
];
