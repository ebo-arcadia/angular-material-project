import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/model/Booking';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: MatTableDataSource<Booking> = new MatTableDataSource<Booking>([]);;
  displayedTableColumns: string[] = ['guestId', 'guestName', 'location', 'date'];

  constructor(private readonly _bookingsService: BookingService) { }


  ngOnInit(): void{
    this._bookingsService.getBookings().subscribe((response) => { 
      this.bookings = new MatTableDataSource<Booking>(response)
    });
  }

}
