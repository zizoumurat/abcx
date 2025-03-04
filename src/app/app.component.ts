import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutModule } from './presentation/layout/app.layout.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet, 
    AppLayoutModule,
    ConfirmDialogModule,  
  ],
})
export class AppComponent {
  title = 'test';
}
