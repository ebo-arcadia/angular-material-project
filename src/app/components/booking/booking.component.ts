import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/helper/custom-error-state-matcher';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/model/City';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  countries: any;
  error: any;
  formGroup: FormGroup
  customErrorStateMatcher: CustomErrorStateMatcher = new CustomErrorStateMatcher()
  cities: City[] = [];
  
  constructor(
    private _countriesService: CountriesService,
    private _citiesService: CitiesService
    ) {
    this.formGroup = new FormGroup({
      place: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      guestName: new FormControl('', [Validators.maxLength(20), Validators.pattern('[A-Za-z.]*$'), Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this._countriesService.getCountries().subscribe({
      next: ((value: any) => {this.countries = value}),
      error: ((error: any) => console.warn(error)),
    });
    this._citiesService.getCities().subscribe({
      next: ((value: City[]) => this.cities = value),
      error: ((error: string) => console.warn(error))
    })
  }

  // implement rendering error messages
  getFormControl(controlName: string):FormControl { return this.formGroup.get(controlName) as FormControl};

  getErrorMessage(controlName: string, validatorType: string):string {
    switch(controlName) {
      case "place":
        {if (validatorType === "required") return "<strong>Place</strong> name must be provided";
        else if (validatorType === "maxlength") return "<strong>Place</strong> name can not have more than 20 characters";
        else return "";
        }
      case "guestName":
        {if (validatorType === "maxlength") return "<strong>guest name</strong> can not have more than 20 characters";
        else if (validatorType === "pattern") return "<strong>guest name</strong> can contain alpha letters only";
        else if (validatorType === "required") return "<strong>guest name</strong> is required";
        else return "";
        }
      case "country":
        {if (validatorType === "required") return "<strong>county</strong> name must be provided";
        else return "";
        }
      case "city":
        {if (validatorType === "required") return "<strong>city</strong> name must be provided";
        else return "";
        }
      default: return "";
    }
  }
}
