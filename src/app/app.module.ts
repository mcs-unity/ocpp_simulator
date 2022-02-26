import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { MainComponent } from './components/main/main.component';
import { DateTime } from './pipes/datetime.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TerminalComponent } from './components/shared/terminal/terminal.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OcppComponent } from './components/shared/ocpp/ocpp.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    MainComponent,
    DateTime,
    TerminalComponent,
    OcppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxJsonViewerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
