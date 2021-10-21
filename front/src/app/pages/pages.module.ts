import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule
  ]
})
export class PagesModule { }
