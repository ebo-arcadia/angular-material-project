import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  countries: any;
  error: any;
  formGroup: FormGroup

  constructor(private _countriesService: CountriesService) {
    this.formGroup = new FormGroup({
      place: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      guestName: new FormControl('', [Validators.maxLength(20), Validators.pattern('[A-Za-z.]*$')]),
      country: new FormControl('', [Validators.required])
    });
  }

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

  // implement rendering error messages
  getFormContorl(controlName: string):FormControl { return this.formGroup.get(controlName) as FormControl};

  getErrorMessage(controlName: string, errorType: string):string {
    switch(controlName) {
      case "place":
        {if (errorType === "required") return "<strong>Place</strong> name must be provided";
        else if (errorType === "maxLength") return "<strong>Place</strong> name can not have more than 20 characters";
        else return "";
        }
      case "guestName":
        {if (errorType === "maxLength") return "<strong>guest name</strong> can not have more than 20 characters";
        else if (errorType === "pattern") return "<strong>guest name</strong> can contain alpha letters only";
        else return "";
        }
      case "countries":
        {if (errorType === "required") return "<strong>county</strong> name must be provided";
        else return "";
        }
      default: return "";
    }
  }
}
