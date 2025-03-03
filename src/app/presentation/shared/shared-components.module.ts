import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToolbarModule
  ],
  exports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    ToolbarModule
  ]
})
export class SharedComponentModule {}
