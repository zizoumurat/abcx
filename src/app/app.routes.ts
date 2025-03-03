import { Routes } from '@angular/router';
import { AppLayoutComponent } from './presentation/layout/app.layout.component';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./presentation/home/home.routes').then(
            (m) => m.HomeRoutes
          ),
        canActivate: [AuthGuard]
      },
    ],
  },
  { path: 'login', loadChildren: () => import('./presentation/auth/login/login.routes').then(m => m.loginRoutes) },
];
