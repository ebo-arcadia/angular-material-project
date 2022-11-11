import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './components/booking/booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SelectAppliancesComponent } from './components/select-appliances/select-appliances.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { ToolbarHotelHomeComponent } from './components/toolbar-hotel-home/toolbar-hotel-home.component';

@NgModule({
  declarations: [AppComponent, BookingComponent, SelectAppliancesComponent, BookingListComponent, ToolbarHotelHomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
