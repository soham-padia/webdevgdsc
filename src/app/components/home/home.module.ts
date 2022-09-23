import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule
  ]
})
export class HomeModule { }
