import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

const routes: Routes = [
  {path: "", redirectTo: '/bookings-list', pathMatch: "full"},
  {path: 'booking', component: BookingComponent},
  {path: 'bookings-list', component: BookingListComponent},
  {path: '**', redirectTo: '/bookings-list', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
