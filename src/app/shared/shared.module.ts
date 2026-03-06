import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { PipesModule } from '../pipes/pipes.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const COMPONENTS = [
  LoaderComponent,
  FormComponent,
  HeaderComponent,
  FooterComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [BrowserModule, CommonModule, PipesModule]
})
export class SharedModule {}
