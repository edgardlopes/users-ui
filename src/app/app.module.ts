import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { MapComponent } from './map/map.component';
import { UserService } from './user-list/user.service';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { UFService } from './util/uf.service';
import { InputComponent } from './commons/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    MapComponent,
    UserFormComponent,
    InputComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, UFService],
  bootstrap: [AppComponent]
})
export class AppModule { }
