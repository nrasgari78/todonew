import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import { TableComponent } from './table/table.component';

import {MouseoverDirective} from "../directive/mouseover.directive";

@NgModule({
  declarations: [
    TableComponent,
    MouseoverDirective
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule

  ]
})
export class SharedModule { }
