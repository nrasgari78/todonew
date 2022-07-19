import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskComponent} from "./com/task/task.component";
import {HeaderComponent} from "./com/header/header.component";
import {AboutComponent} from "./com/about/about.component";

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: TaskComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'task',
        component: TaskComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
