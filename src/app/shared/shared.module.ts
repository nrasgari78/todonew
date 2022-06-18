import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule

  ]
})
export class SharedModule { }
