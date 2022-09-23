import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  countries: any;
  error: any;

  constructor(private _countriesService: CountriesService) { }

  ngOnInit(): void {
    this._countriesService.getCountries().subscribe({
      next: ((value: any) => {this.countries = value}),
      error: ((error: any) => console.warn(error)),
    }) 
    // depreciated
    // this._countriesService.getCountries().subscribe(
    //   (response) => this.countries = response,
    //   (error) => console.warn(error)
    // )
  }

}
