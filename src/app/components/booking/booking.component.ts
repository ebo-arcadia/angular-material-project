import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/helper/custom-error-state-matcher';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/model/City';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  countries: any;
  error: any;
  formGroup: FormGroup;
  customErrorStateMatcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
  cities: City[] = [];
  isCitiesLoading: boolean = false;
  hobbies: any[] = [
    {id: 1, hobbyName: "Music"},
    {id: 2, hobbyName: "Literature"},
    {id: 3, hobbyName: "Outdoor"},
    {id: 4, hobbyName: "travel"},
    {id: 5, hobbyName: "Sport"},
    {id: 6, hobbyName: "Movie"},
  ];
  
  constructor(
    private _countriesService: CountriesService,
    private _citiesService: CitiesService
    ) {
    this.formGroup = new FormGroup({
      place: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      guestName: new FormControl('', [Validators.maxLength(20), Validators.pattern('[A-Za-z.]*$'), Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      receivePromotionNewsletters: new FormControl(false, [Validators.required]),
      hobbies: new FormArray([]),
      allHobbies: new FormControl(false)
    });

    this.hobbies.forEach(()=> {
      (this.formGroup.get("hobbies") as FormArray).push(new FormControl(false));
    });
  }

  get hobbiesFormArray(): FormArray {
    return this.formGroup.get("hobbies") as FormArray;
  }

  onChangeAllHobbiesChecked() {
    this.hobbiesFormArray.controls.forEach((hobby, index) => {
      console.info(hobby)
      this.hobbiesFormArray.at(index).patchValue(this.formGroup.value.allHobbies)
    });
  }

  allHobbiesSelected() {
    return this.hobbiesFormArray.value.every((value: any) => value === true)
  }

  noHobbySelected() {
    return this.hobbiesFormArray.value.every((value: any) => value === false)
  }

  onHobbyChange(hobby_index: number) {
    console.info(hobby_index)
    if (this.allHobbiesSelected()) this.formGroup.patchValue({ allHobbies: true});
    else this.formGroup.patchValue({ allHobbies: false});
  }

  ngOnInit(): void {
    this._countriesService.getCountries().subscribe({
      next: ((value: any) => {this.countries = value}),
      error: ((error: any) => console.warn(error)),
    });
    this.getFormControl('city').valueChanges.pipe(
      debounceTime(500),
      tap(() => {this.cities = []; this.isCitiesLoading = true}),
      switchMap((value) => {return this._citiesService.getCities(value)})
    ).subscribe({
      next: ((value: City[]) => this.cities = value),
      error: ((error: string) => console.warn(error)),
      complete: () => this.isCitiesLoading = false
    });
  }


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
      case "receivePromotionNewsletters":
        {if (validatorType === "required") return "Please select yes or no";
        else return "";
        }
        
      default: return "";
    }
  }

}
