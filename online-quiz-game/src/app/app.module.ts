import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './user/pages/home/home.component';
import { NavBarComponent } from './user/components/nav-bar/nav-bar.component';
import { RoomComponent } from './user/pages/room/room.component';
import { HeroComponent } from './user/components/hero/hero.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RoomComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   // NgbModule,
   // NgbModule
   MatButtonModule,
   MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
