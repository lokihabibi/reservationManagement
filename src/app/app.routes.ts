import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { terrainSectionComponent } from './components/terrain-section/terrain-section.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminEquipementsComponent } from './components/admin/admin-equipements/admin-equipements.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { ManagerEquipementsComponent } from './components/manager/manager-equipements/manager-equipements.component';
import { ManagerHomeComponent } from './components/manager/manager-home/manager-home.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'terrain',
    component: terrainSectionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'equipment',
    component: EquipmentComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'users', component: AdminUsersComponent },
      { path: 'equipements', component: AdminEquipementsComponent }
    ]
  },
  {
    path: 'manager',
    component: ManagerDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ManagerHomeComponent },
      { path: 'equipements', component: ManagerEquipementsComponent }
    ]
  }
];
