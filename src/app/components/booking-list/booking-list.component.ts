import { Component, OnInit, ViewChild} from '@angular/core';
import { BookingService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/model/Booking';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: MatTableDataSource<Booking> = new MatTableDataSource<Booking>([]);;
  displayedTableColumns: string[] = ['guestId', 'guestName', 'location', 'date'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly _bookingsService: BookingService) { }


  ngOnInit(): void{
    this._bookingsService.getBookings().subscribe((response) => { 
      this.bookings = new MatTableDataSource<Booking>(response);
      this.bookings.paginator = this.paginator;
      this.bookings.sort = this.sort
    });
  }

}
