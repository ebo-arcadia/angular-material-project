import { Component, OnInit, ViewChild} from '@angular/core';
import { BookingService } from 'src/app/services/bookings.service';
import { Booking } from 'src/app/model/Booking';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: MatTableDataSource<Booking> = new MatTableDataSource<Booking>([]);;
  displayedTableColumns: string[] = ['guestId', 'guestName', 'location', 'date'];
  bookingData: Booking[] = [];
  isLoadingBookingListCompleted: Boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadingBookingStatus: string = "Loading...";
  hasError: boolean = false;
  formGroup: FormGroup

  constructor(private readonly _bookingsService: BookingService) { 
    this.formGroup = new FormGroup({
      search: new FormControl(null)
    })
  }

  ngOnInit(): void{
    this._bookingsService.getBookings().subscribe((response) => { 
      this.bookings = new MatTableDataSource<Booking>(response);
      this.bookings.paginator = this.paginator;
      this.bookings.sort = this.sort;
      this.bookingData = response;
      this.isLoadingBookingListCompleted = true;
    },
    (error) => {
      console.log(error);
      this.loadingBookingStatus = "Error fetching booking data";
      this.hasError = true;
    });
  }

  filterBookings(): void {
    if (this.formGroup.value.search !== null && this.bookingData) {
      this.bookings.filter = this.formGroup.value.search.trim()
    }
  }

  clearFilter(): void {
    this.formGroup.patchValue({search: ""});
    this.filterBookings();
  }

}
