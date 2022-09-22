import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path:'',
    loadChildren:(()=>import('./components/home/home.module').then(m=>m.HomeModule)),
    component: HomeComponent

  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
