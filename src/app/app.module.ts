import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TaskComponent } from './com/task/task.component';
import { DetailComponent } from './com/detail/detail.component';
import {SharedModule} from "./shared/shared.module";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {HeaderComponent} from "./com/header/header.component";
import { AboutComponent } from './com/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    DetailComponent,
    HeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
