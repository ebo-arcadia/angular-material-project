import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/model/Booking';
import { map } from 'rxjs';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Booking[] = [];
  constructor(private _bookingsService: BookingService) { }

  ngOnInit(): void {
    this._bookingsService.getBookings().subscribe(
      {
      next: (bookings: Booking[]) => {bookings.forEach(booking => this.bookings.push(booking))},
      error: (err: Error) => {console.info(err)}
    });
  }

}
