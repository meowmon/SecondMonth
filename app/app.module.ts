import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { FooterComponent } from './templates/footer/footer.component';
import { UserComponent } from './views/user/user.component';
import { FormComponent } from './views/form/form.component';
import { HttpClientModule} from '@angular/common/http';
import { UserService } from './user.service';
import {NgxPaginationModule} from 'ngx-pagination'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserPipe } from '/home/hieutx/SecondMonth/src/app/pipes/userPipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
    FormComponent,
    UserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
