import { AgGridModule } from '@ag-grid-community/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrintListComponent } from './print-list/print-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
