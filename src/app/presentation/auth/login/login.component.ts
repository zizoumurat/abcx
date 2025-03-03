import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../infrastructure/api/auth-service';
import { LoginRequest } from '../../../core/models/login-request';
import { LayoutService } from '../../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { IAuthService } from '../../../core/services/auth-service';
import { AUTH_SERVICE } from '../../../core/services/auth-token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RippleModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private layoutService = Inject(LayoutService);
  private authService = inject<IAuthService>(AUTH_SERVICE);

  errorMessage: string | null = null;

  loginForm: FormGroup = this.fb.group({
    emailOrUserName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  get dark(): boolean {
    return this.layoutService.config().colorScheme !== 'light';
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    const request: LoginRequest = this.loginForm.value;

    try {
      await this.authService.login(request);
      this.router.navigate(['']); 
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Login failed!';
    }
  }
}
