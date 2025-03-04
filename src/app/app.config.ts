import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './infrastructure/api/auth-service';
import { AUTH_SERVICE } from './core/services/auth-token';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { CONTACT_SERVICE } from './core/services/contact-service';
import { ContactService } from './infrastructure/api/contact-service';
import { deleteInterceptor } from './core/interceptors/delete.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, deleteInterceptor])),
    provideAnimations(),
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: CONTACT_SERVICE, useClass: ContactService },
    ConfirmationService,
    MessageService
  ]
};
