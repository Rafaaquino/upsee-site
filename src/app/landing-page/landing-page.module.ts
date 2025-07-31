import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class LandingPageModule {}
