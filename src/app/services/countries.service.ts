import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  baseURL = "http://localhost:7100/countries"

  constructor(private readonly _http: HttpClient) { }

  getCountries(): Observable<any> {
    return this._http.get<any>(this.baseURL)
  }
}
