import { AdminLayoutComponent } from './shared/layouts/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { Route } from '@angular/router';
import { AlertService } from './shared/components/alert/alert.service';

export default [
  {
    path: '',
    component: AdminLayoutComponent,
    providers: [AlertService, AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product/:id/edit',
        component: EditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
] as Route[];
