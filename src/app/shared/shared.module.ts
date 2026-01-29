import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

const COMPONENTS = [LoaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [BrowserModule, CommonModule]
})
export class SharedModule { }
